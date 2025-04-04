import { Grid } from "@chakra-ui/react";
import StudentNavbar from "./StudentNavbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "../../components/ui/toaster";
import Footer from "../common/Footer";
import { Box } from "@chakra-ui/react";
import useColorTheme from "../../hooks/useColorTheme";

const StudentLayout = () => {
  const { homeBG } = useColorTheme();
  return (
    <>
      {/* <Toaster /> */}
      <Grid templateRows="auto 1fr auto" minH="100vh">
        <StudentNavbar />
        <Box bg={homeBG}><Outlet /></Box>
        <Footer />
      </Grid>
    </>
  );
};

export default StudentLayout;
