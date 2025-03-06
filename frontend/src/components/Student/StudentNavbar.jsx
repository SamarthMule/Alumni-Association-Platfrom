import {
  Flex,
  Text,
  Button,
  HStack,
  Menu,
} from "@chakra-ui/react";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutButton from "../common/LogoutButton";

const StudentNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Profile", path: "/student/profile" },
    { name: "Dashboard", path: "/student/dashboard" },
    { name: "Network", path: "/student/network" },
    { name: "Mentor Connect", path: "/student/mentor-connect" },
    { name: "Jobs", path: "/student/jobs" },
    { name: "Events", path: "/student/events" },
  ];

  return (
    <Flex
      as="nav"
      //   bgGradient="linear(to-r, purple.700, pink.500)" // Sleek gradient
      bg="purple.50"
      color="white"
      px={8}
      py={3}
      justify="space-between"
      align="center"
      height="10svh"     
      zIndex="1000"
      width="100%"

      boxShadow="lg"
    >
      {/* Logo + Title */}
      <HStack spacing={4} cursor="pointer" onClick={() => navigate("/studentdashboard")}>
        {/* Logo Box */}
        <Flex
          bg="white"
          borderRadius="md"
          boxSize="45px"
          align="center"
          justify="center"
          boxShadow="md"
        >
          <img
            src="/Logo.png"
            alt="Logo"
            style={{ width: "50px", height: "45px" }}
          />
        </Flex>

        {/* Heading */}
        <Text
          fontSize="xl"
          fontWeight="bold"
          letterSpacing="wide"
          color="purple"
        >
          Student Dashboard
        </Text>
      </HStack>

      {/* Navigation Links */}
      <HStack spacing={6} fontSize="md" fontWeight="medium" display={{ base: "none", md: "flex" }}>
        {navItems.map((item) => (
          <Button
            as={Link}
            to={item.path}
            colorScheme="whiteAlpha"
            variant="ghost"
            _hover={{
              bg: "whiteAlpha.400",
              transform: "scale(1.1)",
              transition: "0.3s ease-in-out",
            }}
            _active={{ bg: "whiteAlpha.500" }}
            borderBottom={
              location.pathname === item.path ? "3px solid white" : "none"
            }
            borderRadius="full"
            px={4}
            py={2}
            key={item.path}
          >
            {item.name}
          </Button>
        ))}
      </HStack>

      {/* Mobile View For Navigation */}
      <Menu.Root>
        <Menu.Trigger asChild >
          <Button
            variant="ghost"
            colorScheme="whiteAlpha"
            _hover={{
              bg: "whiteAlpha.300",
              transform: "scale(1.1)",
              transition: "0.3s ease-in-out",
            }}
            borderRadius="full"
            p={2}
            display={{ base: "block", md: "none" }}
          >
            <FaBars style={{ marginRight: "8px" }} /> 
          </Button>
        </Menu.Trigger>
        <Menu.Content
          bg="white.200"
          color="white"
          borderRadius="md"
          boxShadow="lg"
          mt="40px"
          _hover={{
            transform: "translateY(2px)",
            transition: "0.3s ease-in-out",
          }}
        >
          {navItems.map((item) => (
            <Menu.Item
              key={item.path}
              _hover={{ bg: "purple.600", color: "white" }}
              onClick={() => navigate(item.path)}
              top="10px"
              right="10px"
            >
              {item.name}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Root>

      <LogoutButton />
    </Flex>
  );
};

export default StudentNavbar;
