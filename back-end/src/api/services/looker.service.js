import {
  SDKLoginAsOtherUser,
  SDKLogout,
  createFilteredQuery,
  formatToTabularResponse,
  getAllFiltersFromDashboardWithData,
  getDashboardItemTitle,
  getQueryDefinition,
  runQuery,
} from "../utils/looker";
import DefaultResponses from "../utils/responses";

export async function getQuery({ req }) {
  const { filters, slug } = req?.body || {};

  if (!slug) {
    return DefaultResponses.MISSING_REQUIRED_FIELDS;
  }

  try {
    const { sdk } = await SDKLoginAsOtherUser({ req });

    const query = await getQueryDefinition({ sdk, slug });
    let id = query.id;

    const hasFilters = filters && Object.keys(filters).length > 0;

    if (hasFilters) {
      id = await createFilteredQuery({ sdk, query, activeFilters: filters });
    }

    const queryData = await runQuery({ sdk, id });

    const { fields, number_format, data } = queryData || {};

    const formattedData = formatToTabularResponse(data);

    const { title } = await getDashboardItemTitle({ sdk, id: query?.id, req }) || {};

    SDKLogout({ sdk });
    const { vis_config } = query || {};
    const { value_format } = vis_config || {};

    return {
      ...DefaultResponses.OK,
      data: {
        fields,
        value_format,
        number_format,
        data: formattedData,
        ...(title && { title }),
      },
    };
  } catch (error) {
    console.error(error, "error getQuery");

    const withouPermission = error.message.includes("Looker Not Found (404)");

    if (withouPermission) {
      return {
        ...DefaultResponses.WITHOUT_PERMISSION,
        error,
      };
    }

    return {
      ...DefaultResponses.QUERY_ERROR,
      error,
    };
  }
}

export async function getDashboardFilters({ req }) {
  const { dashboardId } = req?.body || {};

  if (!dashboardId) {
    return DefaultResponses.MISSING_REQUIRED_FIELDS;
  }

  try {
    const { sdk } = await SDKLoginAsOtherUser({ req });

    const { filters } = await getAllFiltersFromDashboardWithData({
      sdk,
      id: dashboardId,
    });
    SDKLogout({ sdk });

    return {
      ...DefaultResponses.OK,
      filters,
    };
  } catch (error) {
    console.error(error.message, "error get dashboard filters");
    const withouPermission = error.message.includes("Looker Not Found (404)");

    if (withouPermission) {
      return {
        ...DefaultResponses.WITHOUT_PERMISSION,
        error,
      };
    }

    return {
      ...DefaultResponses.QUERY_ERROR,
      error,
    };
  }
}

// export async function getEmbedURL({ req }) {
//   const { sdk } = await SDKLoginAsOtherUser({ req });

//   const { url } = await sdk.ok(
//     sdk.create_embed_url_as_me({
//       target_url: `${process.env.LOOKER_URL}/embed/dashboards/26`,
//     })
//   );

//   SDKLogout({ sdk });

//   return {
//     ...DefaultResponses.OK,
//     url,
//   };
// }
