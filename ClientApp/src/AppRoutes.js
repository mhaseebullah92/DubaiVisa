import Home from "./components/Pages/Home/Home";
import Track from "./components/Pages/Track/Track"
import Faq from "./components/Pages/Faq/Faqs"
import Contact from "./components/Pages/Contact/Contact"
import ProtectedRoute from "./components/Auth/ProtectedRoute"
import Login from "./components/Pages/Admin/Login";
import { Layoutt } from "./components/Layout/Layoutt";
import AdminHome from "./components/Pages/Admin/AdminHome";
import CountryPage from "./components/Pages/Admin/CountryPage";
import PackagePage from "./components/Pages/Admin/PackagePage";
import AddonsPage from "./components/Pages/Admin/AddonsPage";
import UsersApplications from "./components/Pages/Admin/UsersApplications/UsersApplications";
import UserPage from "./components/Pages/Admin/UsersApplications/UserPage";
import PaymentSucess from "./components/Pages/Home/Payment/PaymentSucess";
// import { Home } from "./components/Home";

const AppRoutes = [{
  path: "/",
  element: <Layoutt />, // Wrap the component in ProtectedRoute
  children: [
  {
    index: true,
    element:  <Home />
  },
  {
    path: '/track',
    element: <Track />,
    children:[{
      path:'/track/:id',
      element:<Track />
    }]
  },
  {
    path: '/paymentsucess?',
    element: <PaymentSucess />,
  },
  {
    path: '/faq',
    element: <Faq />
  },
  {
    path: '/contact',
    element: <Contact />
  }]}
];

const routesForAuthenticatedOnly = [
  {
    path: "/",
    element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
    children: [
      {
        path: "/dashboard",
        element: <AdminHome />,
      },
      // {
      //   path: "/profile",
      //   element: <div>User Profile</div>,
      // },
      {
        path: "/country",
        element: <CountryPage />,
      },
      {
        path: "/packages",
        element: <PackagePage />,
      },
      {
        path: "/addons",
        element: <AddonsPage />,
      },
      {
        path: "/users-applications",
        element: <UsersApplications />,
      },
      {
        path: "/user-application-detail",
        element: <UserPage />,
      },
      // {
      //   path: "/logout",
      //   element: <div>Logout</div>,
      // },
    ],
  },
];

// Define routes accessible only to non-authenticated users
const routesForNotAuthenticatedOnly = [
  // {
  //   path: "/",
  //   element: <div>Home Page</div>,
  // },
  {
    path: "/login",
    element: <Login />,
  },
];

// export default AppRoutes;
 export {AppRoutes,routesForAuthenticatedOnly, routesForNotAuthenticatedOnly};
