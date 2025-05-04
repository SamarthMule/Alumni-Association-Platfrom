import { Grid, Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../Admin/AdminNavbar"
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <Grid templateRows="auto 1fr" minH="100vh">
      <AdminNavbar />
      <Flex justifyContent={"center"}>
      {/* <Flex> */}
        {/* <AdminSidebar /> */}
        <Box flex="2" p={6}>
          <Outlet />
        </Box>
      </Flex>
    </Grid>
  );
};

export default AdminLayout;
