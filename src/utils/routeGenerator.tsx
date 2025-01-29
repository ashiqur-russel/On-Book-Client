import { RouteObject } from "react-router-dom";

/**
 * Generates routes dynamically based on provided paths.
 * @param paths - Array of route configurations.
 */
export const routeGenerator = (paths: RouteObject[]): RouteObject[] => {
  return paths.map((route) => ({
    path: route.path,
    element: route.element,
    children: route.children ? routeGenerator(route.children) : undefined,
  }));
};
