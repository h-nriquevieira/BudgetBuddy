import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../pages/LoginPage/LoginPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import Navbar from "../components/Navbar/Navbar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <p>Page not found</p>,
  },
  {
    path: "/app",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <Navbar />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "budget",
            element: <p>Orçamento</p>,
          },
          {
            path: "expenses",
            element: <p>Despesas</p>,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
