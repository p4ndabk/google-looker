import { CheckCredentials } from "../services/login.service";

export const AuthenticateUser = async (req, res) => {
  const { status, ...rest } = await CheckCredentials(req, res);
  res.status(status).send(rest);
};
