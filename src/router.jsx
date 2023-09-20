import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import About from "./pages/about/About";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import ProtectedLayout from "./components/ProtectedLayout/ProtectedLayout";
import GuestLayout from "./components/GuestLayout/GuestLayout";
import Addproduct from "./pages/addproduct/Addproduct";
import Productlist from "./pages/productlist/Productlist";
import EditProduct from "./pages/editprduct/EditProduct";
import ViewProduct from "./pages/viewproduct/ViewProduct";
import AllProductList from "./pages/allproductList/AllProductList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <AllProductList />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/addproduct",
        element: <Addproduct />,
      },
      {
        path: "/productlist",
        element: <Productlist />,
      },
      {
        path: "/editproduct/:id/edit",
        element: <EditProduct />,
      },
      {
        path: "/view/:id/view",
        element: <ViewProduct />,
      },
    ],
  },
]);

export default router;
