import { useAuthentication } from "@/context/Authentication";
import Authentication from "@/services/api/login";
import { useNavigate } from "react-router-dom";

const useAuthenticate = () => {
  const AuthAPI = new Authentication();
  const { onLoginSuccess } = useAuthentication();
  const navigate = useNavigate();

  async function login(data) {
    try {
      const res = await AuthAPI.login(data);
      setTimeout(() => {
        onLoginSuccess(res.data.token);
        navigate("/", { replace: true });
      }, 1000);
    } catch (error) {
      throw new Error(
        error?.response?.data?.message || error?.message || "Something went wrong"
      );
    }
  }
  return {
    login,
  };
};

export default useAuthenticate;
