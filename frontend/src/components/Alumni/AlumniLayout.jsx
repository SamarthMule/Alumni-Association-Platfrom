import AluminiNavbar from "./AlumniNavbar";
import { Outlet } from "react-router";
import { Toaster } from "../../components/ui/toaster";
import Footer from "../common/Footer";

const AluminiLayout = () => {
  return (
    <>
      <Toaster />
      <AluminiNavbar />
      <Outlet />
      <Footer />
    </>
  );
};
export default AluminiLayout;
