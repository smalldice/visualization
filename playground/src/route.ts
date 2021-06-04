import * as pages from "./pages";

export const routes = [
  {
    path: "/",
    exact: true,
    component: pages.IndexPage,
  },
  {
    path: "/gl",
    exact: true,
    component: pages.WebGL,
  },
];
