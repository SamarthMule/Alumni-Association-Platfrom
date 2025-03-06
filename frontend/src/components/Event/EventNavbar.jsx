import { Flex, Text, Button, HStack, Menu } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars } from "react-icons/fa";

const EventNavbar = () => {
  const location = useLocation();
  const navigator = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "/event/dashboard" },
    { name: "Events", path: "/event/all" },
    { name: "Create Events", path: "/event/create" },
    
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
      // position="fixed"
      
      zIndex="1000"
      width="100%"
      height="10svh"
      boxShadow="lg"
    >
      {/* Logo + Title */}
      <HStack spacing={4}>
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
          onClick={() => navigator("/alumnidashboard")}
        >
          Event Manager
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
              onClick={() => navigator(item.path)}
            >
              {item.name}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Root>

      <Menu.Root>
        <Menu.Trigger>
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
          >
            <FaUserCircle size={26} />
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
          <Menu.Item
            _hover={{ bg: "purple.600", color: "white" }}
            onClick={() => navigator("/alumniprofile")}
          >
            Profile
          </Menu.Item>

          <Menu.Item _hover={{ bg: "purple.600", color: "white" }}>
            Settings
          </Menu.Item>
          <Menu.Item _hover={{ bg: "purple.600", color: "white" }}>
            Logout
          </Menu.Item>
        </Menu.Content>
      </Menu.Root>
    </Flex>
  );
};

export default EventNavbar;
