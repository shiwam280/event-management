import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import CreateEvent from "./pages/CreateEvent";
import { UserContextProvider } from "./context/UserContext";
import EditEvent from "./pages/EditEvent";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/create-event",
          element: <CreateEvent />,
        },
        {
          path: "/edit/:id",
          element: <EditEvent />,
        },
      ],
    },
  ]);
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
