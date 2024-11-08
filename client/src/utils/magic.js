const paths = {
  //Guest Routes
  guest: { name: "guest", url: "/", isWrapper: true },
  homepage: { name: "Homepage", url: "/" },
  login: {
    name: "Login",
    url: "/login",
  },
  logout: {
    name: "Logout",
    url: "/logout",
  },
  register: {
    name: "Register",
    url: "/register",
  },
  verify: {
    name: "Verify Email",
    url: "/verify/:verificationCode",
  },
  forgotPassword: {
    name: "Forgot Password",
    url: "/forgot-password",
  },
  menu: {
    name: "Browse Menu",
    url: "/menu",
  },
  dishDetail: {
    name: "Dish Detail",
    url: "/menu/:id",
  },
  restaurants: {
    name: "Restaurants",
    url: "/restaurants",
  },
  restaurantDetail: {
    name: "Restaurant Detail",
    url: "/restaurants/:id",
  },

  //Admin Routes
  admin: { name: "Admin", url: "/admin", isWrapper: true },
  adminDashboard: { name: "Dashboard", url: "dashboard" },
  adminSetting: { name: "Setting", url: "setting" },
  adminUserList: { name: "User List", url: "users" },
  adminUserDetail: { name: "User Detail", url: "users/:id" },
  adminMenu: { name: "Menu List", url: "users/:id/dishes" },
  adminDishDetail: { name: "Menu Detail", url: "users/:id/dishes/:dishId" },
  adminOrderList: { name: "Order List", url: "orders" },
  adminOrderDetail: { name: "Order Detail", url: "orders/:id" },

  //Customer Routes
  customer: { name: "Customer", url: "/customer", isWrapper: true },
  customerDashboard: { name: "Dashboard", url: "dashboard" },
  customerOrderList: { name: "Orders", url: "orders" },
  customerOrderDetail: { name: "Order Detail", url: "orders/:id" },
  customerSetting: { name: "Setting", url: "setting" },

  //Restaurant Routes
  restaurant: { name: "Restaurant", url: "/restaurant", isWrapper: true },
  restaurantDashboard: { name: "Dashboard", url: "dashboard" },
  restaurantMenu: { name: "Menu", url: "dishes" },
  restaurantDishDetail: { name: "Dish Detail", url: "dishes/:id" },
  restaurantOrderList: { name: "Orders", url: "orders" },
  restaurantOrderDetail: { name: "Order Detail", url: "orders/:id" },
  restaurantSetting: { name: "Setting", url: "setting" },

  //Others
  notFound: { name: "Not Found", url: "/*" },
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export { paths, emailRegex };
