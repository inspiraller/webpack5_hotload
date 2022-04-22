import React, { FC, useEffect } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router
} from "react-router-dom";


import { Home } from "./Pages";
import { Example } from "./Pages/Example";
import { TElement } from "./types";

export interface ConfigRoutes {
  [key: string]: {
    title: string,
    path: string,
    component: TElement
  }
}
export const configRoutes: ConfigRoutes = {
  home: {
    title: "Home",
    path: `/`,
    component: <Home />,
  },
  Example: {
    title: "Example",
    path: `/Example`,
    component: <Example />,
  },

};

export interface Props {

}
const App:FC<Props> = () => {
  const routes = configRoutes
  // const location = useLocation()
  const location = document.location;
  const { pathname } = location;
  useEffect(() => {
    if (pathname) {
      const keyRoute = Object.keys(routes).find(
        (item) => routes[item].path === pathname
      );
      if (keyRoute) {
        const title = routes[keyRoute].title;
        window.document.title = title;
      }
    }
  }, [pathname]);

  console.log('Router', {routes})
  return (
    <Router>
      <Routes>
        {Object.keys(routes).map((key) => (
          <Route
            path={routes[key].path}
            element={routes[key].component}
            key={`route-${key}`}
          />
        ))}
      </Routes>
    </Router>
  );
};
export default App