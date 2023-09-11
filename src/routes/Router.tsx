import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../pages/LoginPage/LoginPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import Navbar from "../components/Navbar/Navbar";
import BudgetPage from "../pages/BudgetPage/BudgetPage";
import { budgetPageLoader } from "../pages/BudgetPage/budgetPageLoader";
import ExpensesPage from "../pages/ExpensesPage/ExpensesPage";
import { expensePageLoader } from "../pages/ExpensesPage/expensePageLoader";

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
            loader: budgetPageLoader,
            element: <BudgetPage />,
          },
          {
            path: "expenses",
            loader: expensePageLoader,
            element: <ExpensesPage />,
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
