import { useRoutes } from "react-router-dom";
import SecuredRoutes from "./secured";
import PublicRoutes from "./public";

const Routes = () => useRoutes([...SecuredRoutes, ...PublicRoutes]);

export default Routes;
