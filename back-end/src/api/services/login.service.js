import { LookerNodeSDK } from "@looker/sdk-node";
import DefaultResponses from "../utils/responses";
import jwt from "jsonwebtoken";
import { getUserFromDBByEmail, verifyPassword } from "../utils/db";

export const CheckCredentials = async (req) => {
  try {
    const { email, password } = req.body;

    const userFromDB = await getUserFromDBByEmail(email);
    
    if (!userFromDB) {
      return DefaultResponses.USER_NOT_FOUND;
    }

    const isPasswordMatch = await verifyPassword(password, userFromDB.password);

    if (email === userFromDB.email && isPasswordMatch) {
      const { id } = await userExistInLookerByEmail({ email });
      if (!id) {
        return DefaultResponses.NOT_EXIST_IN_LOOKER;
      }
      // Informações do usuário a serem incluídas no token
      const user = {
        email,
        id,
      };

      // Gerar o token
      const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

      return {
        ...DefaultResponses.OK,
        token: accessToken,
      };
    } else {
      return DefaultResponses.NOT_AUTHORIZED;
    }
  } catch (error) {
    console.error(error);
    return DefaultResponses.NOT_OK;
  }
};

export async function userExistInLookerByEmail({ email }) {
  try {
    const sdk = LookerNodeSDK.init40();

    const emails = await sdk.ok(
      sdk.search_credentials_email({
        fields: "user_id, is_disabled",
        email,
      })
    );
    const [{ is_disabled, user_id } = {}] = emails;

    if (emails.length && is_disabled) {
      return DefaultResponses.USER_DISABLED_IN_LOOKER;
    }

    return {
      ...DefaultResponses.OK,
      id: user_id,
    };
  } catch (error) {
    console.log(error, "error");
    return DefaultResponses.LOOKER_LOGIN_ERROR;
  }
}
