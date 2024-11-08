import { lazy } from "react";
import { paths } from "../utils/magic";
import NotFound from "../pages/others/NotFound";
import { Navigate, useRoutes } from "react-router-dom";
import { DashboardLayout, HomeLayout } from "../layouts";

//Guest Pages
const Homepage = lazy(() => import("../pages/guest/Homepage"));
const Login = lazy(() => import("../pages/guest/Login"));
const Logout = lazy(() => import("../pages/guest/Logout"));
const Register = lazy(() => import("../pages/guest/Register"));
const VerifyEmail = lazy(() => import("../pages/guest/VerifyEmail"));
const ForgotPassword = lazy(() => import("../pages/guest/ForgotPassword"));
const Menu = lazy(() => import("../pages/guest/Menu"));
const DishDetail = lazy(() => import("../pages/guest/DishDetail"));
const Restaurants = lazy(() => import("../pages/guest/Restaurants"));
const RestaurantDetail = lazy(() => import("../pages/guest/RestaurantDetail"));

//Admin Pages
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
const AdminSetting = lazy(() => import("../pages/admin/Setting"));
const AdminUserList = lazy(() => import("../pages/admin/UserList"));
const AdminUserDetail = lazy(() => import("../pages/admin/UserDetail"));
const AdminMenu = lazy(() => import("../pages/admin/Menu"));
const AdminDishDetail = lazy(() => import("../pages/admin/DishDetail"));
const AdminOrderList = lazy(() => import("../pages/admin/OrderList"));
const AdminOrderDetail = lazy(() => import("../pages/admin/OrderDetail"));

//Customer Pages
const CustomerDashboard = lazy(() => import("../pages/customer/Dashboard"));
const CustomerSetting = lazy(() => import("../pages/customer/Setting"));
const CustomerOrderList = lazy(() => import("../pages/customer/OrderList"));
const CustomerOrderDetail = lazy(() => import("../pages/customer/OrderDetail"));
const CustomerCreateOrder = lazy(() => import("../pages/customer/CreateOrder"));

//Restaurant Pages
const RestaurantDashboard = lazy(() => import("../pages/restaurant/Dashboard"));
const RestaurantSetting = lazy(() => import("../pages/restaurant/Setting"));
const RestaurantMenu = lazy(() => import("../pages/restaurant/Menu"));
const RestaurantDishDetail = lazy(() =>
  import("../pages/restaurant/DishDetail")
);
const RestaurantOrderList = lazy(() => import("../pages/restaurant/OrderList"));
const RestaurantOrderDetail = lazy(() =>
  import("../pages/restaurant/OrderDetail")
);

export default function MainRoutes() {
  return useRoutes([
    //Guest Routes
    {
      path: paths.guest.url,
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <Homepage />,
        },
        {
          path: paths.login.url,
          element: <Login />,
        },
        {
          path: paths.logout.url,
          element: <Logout />,
        },
        {
          path: paths.register.url,
          element: <Register />,
        },
        {
          path: paths.verify.url,
          element: <VerifyEmail />,
        },
        {
          path: paths.forgotPassword.url,
          element: <ForgotPassword />,
        },
        {
          path: paths.menu.url,
          element: <Menu />,
        },
        {
          path: paths.dishDetail.url,
          element: <DishDetail />,
        },
        {
          path: paths.restaurants.url,
          element: <Restaurants />,
        },
        {
          path: paths.restaurantDetail.url,
          element: <RestaurantDetail />,
        },
      ],
    },

    //Admin Routes
    {
      path: paths.admin.url,
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <Navigate to={paths.adminDashboard.url} />,
        },
        {
          path: paths.adminDashboard.url,
          element: <AdminDashboard />,
        },
        {
          path: paths.adminSetting.url,
          element: <AdminSetting />,
        },
        {
          path: paths.adminUserList.url,
          element: <AdminUserList />,
        },
        {
          path: paths.adminUserDetail.url,
          element: <AdminUserDetail />,
        },
        {
          path: paths.adminMenu.url,
          element: <AdminMenu />,
        },
        {
          path: paths.adminDishDetail.url,
          element: <AdminDishDetail />,
        },
        {
          path: paths.adminOrderList.url,
          element: <AdminOrderList />,
        },
        {
          path: paths.adminOrderDetail.url,
          element: <AdminOrderDetail />,
        },
      ],
    },

    //Customer Routes
    {
      path: paths.customer.url,
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <Navigate to={paths.customerDashboard.url} />,
        },
        {
          path: paths.customerDashboard.url,
          element: <CustomerDashboard />,
        },
        {
          path: paths.customerSetting.url,
          element: <CustomerSetting />,
        },
        {
          path: paths.customerCreateOrder.url,
          element: <CustomerCreateOrder />,
        },
        {
          path: paths.customerOrderList.url,
          element: <CustomerOrderList />,
        },
        {
          path: paths.customerOrderDetail.url,
          element: <CustomerOrderDetail />,
        },
      ],
    },

    //Restaurant Routes
    {
      path: paths.restaurant.url,
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <Navigate to={paths.restaurantDashboard.url} />,
        },
        {
          path: paths.restaurantDashboard.url,
          element: <RestaurantDashboard />,
        },
        {
          path: paths.restaurantSetting.url,
          element: <RestaurantSetting />,
        },
        {
          path: paths.restaurantMenu.url,
          element: <RestaurantMenu />,
        },
        {
          path: paths.restaurantDishDetail.url,
          element: <RestaurantDishDetail />,
        },
        {
          path: paths.restaurantOrderList.url,
          element: <RestaurantOrderList />,
        },
        {
          path: paths.restaurantOrderDetail.url,
          element: <RestaurantOrderDetail />,
        },
      ],
    },

    //Others
    {
      path: paths.notFound.url,
      element: <NotFound />,
    },
  ]);
}
