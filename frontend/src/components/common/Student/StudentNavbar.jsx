import { Flex, Text, Button, HStack, Menu } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const StudentNavbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Network", path: "/network" },
    { name: "Jobs", path: "/jobs" },
    { name: "Events", path: "/events" },
    { name: "Mentorship", path: "/mentorship" },
  ];

  return (
    <Flex
      as="nav"
      bgGradient="linear(to-r, purple.600, pink.500)" // Modern gradient
      color="purple"
      px={8}
      py={3}
      justify="space-between"
      align="center"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      width="100%"
      height="65px"
      boxShadow="lg"
    >
      {/* Logo + Title */}
      <HStack spacing={4}>
        <Text fontSize="xl" fontWeight="bold" letterSpacing="wide">
          Student Dashboard
        </Text>
      </HStack>

      {/* Navigation Links */}
      <HStack spacing={6} fontSize="md" fontWeight="medium">
        {navItems.map((item) => (
          <Button
            as={Link}
            to={item.path}
            colorScheme="whiteAlpha"
            variant="ghost"
            _hover={{ bg: "whiteAlpha.400", transform: "scale(1.1)", transition: "0.3s ease-in-out" }}
            _active={{ bg: "whiteAlpha.500" }}
            borderBottom={location.pathname === item.path ? "3px solid white" : "none"}
            borderRadius="full" // More modern touch
            px={4}
            py={2}
            key={item.path}
          >
            {item.name}
          </Button>
        ))}
      </HStack>

      {/* Profile Menu (Modernized) */}
      <Menu.Root>
        <Menu.Trigger>
          <Button
            variant="ghost"
            colorScheme="whiteAlpha"
            _hover={{ bg: "whiteAlpha.300", transform: "scale(1.1)", transition: "0.3s ease-in-out" }}
            borderRadius="full"
            p={2}
          >
            <FaUserCircle size={26} />
          </Button>
        </Menu.Trigger>
        <Menu.Content
          bg="purple.700"
          color="white"
          borderRadius="md"
          boxShadow="lg"
          mt="40px"
          _hover={{ transform: "translateY(2px)", transition: "0.3s ease-in-out" }}
        >
          <Menu.Item _hover={{ bg: "purple.600" }}>Profile</Menu.Item>
          <Menu.Item _hover={{ bg: "purple.600" }}>Settings</Menu.Item>
          <Menu.Item _hover={{ bg: "purple.600" }}>Logout</Menu.Item>
        </Menu.Content>
      </Menu.Root>
    </Flex>
  );
};

export default StudentNavbar;
