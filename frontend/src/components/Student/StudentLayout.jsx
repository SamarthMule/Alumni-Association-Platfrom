import { Grid } from "@chakra-ui/react";
import StudentNavbar from "./StudentNavbar";
import { Outlet } from "react-router";
import { Toaster } from "../../components/ui/toaster";

const StudentLayout = () => {
  return (
    <>
      <Toaster />
      <Grid templateRows="auto 1fr" h="100vh">
        <StudentNavbar />
        <Outlet />
      </Grid>
    </>
  );
};

export default StudentLayout;
