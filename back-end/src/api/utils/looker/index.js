import { LookerNodeSDK } from "@looker/sdk-node";
import { has } from "lodash";
import DefaultResponses from "../responses";

export async function getQueryDefinition({ sdk, slug }) {
  try {
    const query = await sdk.query(slug);
    return query?.value;
  } catch (error) {
    throw error;
  }
}

export function formatToTabularResponse(data = []) {
  return data.map((d) => {
    const dataEntries = Object.entries(d);
    return Object.fromEntries(
      dataEntries.map(([key, val]) => [
        key,
        has(val, "value")
          ? {
              value: val.value,
              rendered: val.rendered,
            }
          : val,
      ])
    );
  });
}

export async function runQuery({ sdk, id }) {
  try {
    const queryData = await sdk.run_query({
      query_id: id,
      result_format: "json_detail",
      apply_formatting: true,
      apply_vis: true,
    });
    return queryData.value;
  } catch (error) {
    console.error(error, "error");
    throw error;
  }
}

export async function createFilteredQuery({ sdk, query, activeFilters }) {
  const { client_id, ...rest } = query;
  if (!query?.filters) {
    query.filters = {};
  }
  try {
    const { filters } = query;
    Object.keys(activeFilters).forEach((filterKey) => {
      filters[filterKey] = activeFilters[filterKey].toString();
    });
    const newQuery = await sdk.ok(sdk.create_query(rest, "id"));
    return newQuery.id;
  } catch (error) {
    console.error(error, "error");
    throw error;
  }
}

export async function SDKLoginAsOtherUser({ req }) {
  try {
    const sdk = LookerNodeSDK.init40();
    const userFields = "id, first_name, last_name, display_name, email, id";

    // retrieve your user account to verify correct credentials
    const me = await sdk.ok(sdk.me(userFields));
    console.log({ me });

    // try {
    //   const dash1 = await sdk.ok(sdk.dashboard("26", "title"));
    //   console.log(dash1, "admin com acesso");
    // } catch (error) {
    //   console.error(error, "error 1");
    // }

    const { id } = req.user;
    const auth = sdk.authSession;
    await auth.login(id);

    const sudo = await sdk.ok(sdk.me(userFields));
    console.log({ sudo });
    if (!sudo) {
      console.log("Sudo failed");
      return DefaultResponses.LOOKER_LOGIN_ERROR;
    }

    // try {
    //   const dash2 = await sdk.ok(sdk.dashboard("26", "title"));

    //   console.log(dash2, "sudo sem acesso");
    // } catch (error) {
    //   console.error(error, "error");
    // }

    // await sdk.authSession.logout(); // logout of API session
    // if (!sdk.authSession.isAuthenticated()) {
    //   console.log("Logout successful");
    // }

    return {
      ...DefaultResponses.OK,
      sdk,
    };
  } catch (error) {
    console.error(error, "error");
    return DefaultResponses.LOOKER_LOGIN_ERROR;
  }
}

export function SDKLogout({ sdk }) {
  sdk.authSession.logout(); // logout of API session
  if (!sdk.authSession.isAuthenticated()) {
    console.log("Logout successful");
  }
}

export async function getDashboardItemTitle({ sdk, id, req }) {
  const { dashboardId } = req?.body || {};

  if (!dashboardId) {
    return DefaultResponses.MISSING_REQUIRED_FIELDS;
  }

  try {
    const dashboardElements = await sdk.ok(
      sdk.dashboard_dashboard_elements(dashboardId, "query_id, title")
    );

    const title =
      dashboardElements.find((element) => {
        return element.query_id === id.toString();
      })?.title || "";

    return {
      title,
    };
  } catch (error) {
    console.error(error, "error");
    throw error;
  }
}

export async function getAllFiltersFromDashboardWithData({ sdk, id }) {
  try {
    const dashboardElements = await sdk.ok(sdk.dashboard_dashboard_filters(id));

    const filters = await Promise.all(
      dashboardElements.map(async (element) => {
        const { title, field, model } = element || {};

        const { view, name } = field;

        const data = await sdk.ok(
          sdk.model_fieldname_suggestions({
            model_name: model,
            view_name: view,
            field_name: name,
          })
        );
        return {
          title,
          name,
          data: data?.suggestions,
        };
      })
    );

    return {
      filters,
    };
  } catch (error) {
    console.error(error, "error");
    throw error;
  }
}