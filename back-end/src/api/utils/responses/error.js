export const ErrorDefaultResponse = {
  NOT_AUTHORIZED: {
    status: 401,
    message: "Wrong email or password",
    success: false,
  },
  NOT_AUTHENTICATED: {
    status: 401,
    message: "Not authenticated",
    success: false,
  },
  NOT_OK: {
    status: 500,
    message: "Internal Server Error",
    success: false,
  },
  LOOKER_LOGIN_ERROR: {
    status: 500,
    message: "Looker login error",
    success: false,
  },
  QUERY_ERROR: {
    status: 500,
    message: "Query error",
    success: false,
  },
  NOT_EXIST_IN_LOOKER: {
    status: 404,
    message: "User not exist in looker",
    success: false,
  },
  USER_NOT_FOUND: {
    status: 404,
    message: "User not found",
    success: false,
  },
  USER_DISABLED_IN_LOOKER: {
    status: 403,
    message: "User is disabled in Looker",
    success: false,
  },
  USER_LOGIN_ERROR: {
    status: 500,
    message: "User login error",
    success: false,
  },
  MISSING_REQUIRED_FIELDS: {
    status: 400,
    message: "Missing required fields",
    success: false,
  },
  WITHOUT_PERMISSION: {
    status: 403,
    message: "Problably without permission to access this resource",
    success: false,
  },
};
