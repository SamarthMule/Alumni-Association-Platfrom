import { Grid } from "@chakra-ui/react";
import StudentNavbar from "./StudentNavbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "../../components/ui/toaster";
import Footer from "../common/Footer";

const StudentLayout = () => {
  return (
    <>
      <Toaster />
      <Grid templateRows="auto 1fr auto" minH="100vh">
        <StudentNavbar />
        <Outlet />
        <Footer />
      </Grid>
    </>
  );
};

export default StudentLayout;
