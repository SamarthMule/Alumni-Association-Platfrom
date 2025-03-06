import AluminiNavbar from "./AlumniNavbar";
import { Outlet } from "react-router";
import { Toaster } from "../../components/ui/toaster";
import Footer from "../common/Footer";
import { Grid } from "@chakra-ui/react";

const AluminiLayout = () => {
  return (
    <>
      <Toaster />
      <Grid templateRows="auto 1fr auto" minH="100vh">
        <AluminiNavbar />
        <Outlet />
        <Footer />
      </Grid>
    </>
  );
};
export default AluminiLayout;
