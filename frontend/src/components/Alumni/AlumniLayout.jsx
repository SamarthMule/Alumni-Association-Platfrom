
import AluminiNavbar from "./AlumniNavbar";
import { Outlet } from "react-router";
import { Toaster } from "../../components/ui/toaster";

const AluminiLayout = () => {
  return (
    <>
      <Toaster />
      <AluminiNavbar />
      <Outlet />
    </>
  );
};
export default AluminiLayout;
