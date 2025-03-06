import AluminiNavbar from "./AlumniNavbar";
import { Outlet } from "react-router";

import Footer from "../common/Footer";
import { Grid } from "@chakra-ui/react";

const AluminiLayout = () => {
  return (
    <>
     
      <Grid templateRows="auto 1fr auto" minH="100vh">
        <AluminiNavbar />
        <Outlet />
        <Footer />
      </Grid>
    </>
  );
};
export default AluminiLayout;
