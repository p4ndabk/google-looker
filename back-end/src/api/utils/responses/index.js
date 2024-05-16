import { ErrorDefaultResponse } from "../responses/error";
import { SuccessDefaultResponse } from "../responses/sucess";

const DefaultResponses = {
  ...SuccessDefaultResponse,
  ...ErrorDefaultResponse,
};

export default DefaultResponses;
