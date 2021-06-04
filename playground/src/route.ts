import * as pages from "./pages";

export const routes = [
  {
    path: "/",
    exact: true,
    component: pages.IndexPage,
  },
  {
    path: "/day1",
    exact: true,
    component: pages.Day1,
  },
];
