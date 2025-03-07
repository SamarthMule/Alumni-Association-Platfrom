import { Box, VStack, Button, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiHome, FiUsers, FiBriefcase, FiCalendar, FiFileText } from "react-icons/fi";

const AdminSidebar = () => {
  return (
    <Box bg="gray.300" color="white" w="260px" h="100vh" p={5} position="fixed" boxShadow="lg">
      <VStack spacing={5} align="stretch">
        <Button as={Link} to="/admin/dashboard" leftIcon={<Icon as={FiHome} />} colorScheme="teal" variant="solid"  bg="purple.500" >Dashboard</Button>
        <Button as={Link} to="/admin/users" leftIcon={<Icon as={FiUsers} />} colorScheme="blue" variant="solid" bg="purple.500">Manage Users</Button>
        <Button as={Link} to="/admin/jobs" leftIcon={<Icon as={FiBriefcase} />} colorScheme="green" variant="solid" bg="purple.500">Manage Jobs</Button>
        <Button as={Link} to="/admin/events" leftIcon={<Icon as={FiCalendar} />} colorScheme="orange" variant="solid" bg="purple.500">Manage Events</Button>
       
      </VStack>
    </Box>
  );
};

export default AdminSidebar;
