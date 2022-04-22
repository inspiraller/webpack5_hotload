import React from "react";
import { Link } from "react-router-dom";
import { configRoutes } from "src/App";

export const Home = () => {
  const arrRoutes = Object.keys(configRoutes);
  return (
    <ul>
      {arrRoutes.map((key) => (
        <li key={`route-list-item-${key}`}>
          <Link to={configRoutes[key].path}>{configRoutes[key].title}</Link>
        </li>
      ))}
    </ul>
  );
};
