import { BrowserRouter } from "react-router-dom";
import FilterProvider from "./context/Filter";
import DashboardProvider from "./context/Dashboard";
import Routes from "./routes";
import AuthenticationProvider from "./context/Authentication";
import { Toaster } from "./components/ui/toaster";
// import { ping } from "./services/api";
// import HeaderFilters from "./components/HeaderFilters";


const backendIsAlive = true

// const backendIsAlive = await ping()
//   .then(() => {
//     return true;
//   })
//   .catch(() => false);

function App() {
  if (!backendIsAlive) {
    return (
      <div className="flex items-center h-screen justify-center w-full">
        <h1>Backend is not available</h1>
      </div>
    );
  }

  return (
    <DashboardProvider>
      <BrowserRouter>
        {/* <AuthenticationProvider> */}
          <FilterProvider>
            <Routes />
            <Toaster />
          </FilterProvider>
        {/* </AuthenticationProvider> */}
      </BrowserRouter>
    </DashboardProvider>
  );
}

export default App;
