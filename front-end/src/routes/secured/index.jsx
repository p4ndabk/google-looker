import { AuthenticationGuard } from "@/guards/AuthenticationGuard";
import { Wrapper } from "@/layouts/Wrapper";
import { EnergySources } from "@/pages/EnergySources";
import { Navigate } from "react-router-dom";

export default [
  {
    path: "",
    element: (
      <AuthenticationGuard>
        <Wrapper />
     </AuthenticationGuard>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="energy-sources" replace />,
      },
      {
        path: "energy-sources",
        element: <EnergySources />,
      },
      { path: "world", element: <span className="text-white">world</span> },
      { path: "projections", element: <span className="text-white">projections</span> },
      {
        path: "*",
        element: <Navigate to="energy-sources" replace />,
      },
    ],
  },
];
