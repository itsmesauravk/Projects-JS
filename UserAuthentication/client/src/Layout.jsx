import { Outlet } from "react-router-dom";

import HomePage from "./pages/HomePage";

export default function Layout() {


  return (
    <>
      <HomePage />
      <Outlet />
    </>
  );
}
