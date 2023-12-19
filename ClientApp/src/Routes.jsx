import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppRoutes , routesForAuthenticatedOnly, routesForNotAuthenticatedOnly} from './AppRoutes';

const Routesl = () => {
  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...AppRoutes,
    ...routesForNotAuthenticatedOnly,
    ...routesForAuthenticatedOnly,
  ]);
  
  // const router = createBrowserRouter([
  //   ...AppRoutes,
  //   ...(!token ? routesForNotAuthenticatedOnly : []),
  //   ...routesForAuthenticatedOnly,
  // ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
// return(
//     <>
//     {router.map((route, index) => {
//         const { element, ...rest } = route;
//         return <Route key={index} {...rest} element={element} />;
//       })}
//       </>
// );
};

export default Routesl;