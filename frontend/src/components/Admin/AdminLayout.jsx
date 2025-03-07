import { Grid, Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <Grid templateRows="auto 1fr" minH="100vh">
      <AdminNavbar />
      <Flex>
        <AdminSidebar />
        <Box flex="1" ml="250px" p={6}>
          <Outlet />
        </Box>
      </Flex>
    </Grid>
  );
};

export default AdminLayout;
