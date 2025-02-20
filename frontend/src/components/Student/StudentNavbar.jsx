import {
  Flex,
  Text,
  Button,
  HStack,
  IconButton,
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

const StudentNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine if the current screen size is mobile
  const isMobile = useBreakpointValue({ base: true, md: false });

  const navItems = [
    { name: "Network", path: "/studentnetwork" },
    { name: "Jobs", path: "/jobs" },
    { name: "Events", path: "/events" },
    { name: "Mentorship", path: "/mentorship" },
  ];

  return (
    <Flex
      as="nav"
      color="white"
      px={6}
      py={3}
      justify="space-between"
      align="center"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      width="100%"
      height="70px"
      boxShadow="lg"
      bg="purple.50"
    >
      {/* Logo & Title */}
      <HStack spacing={4}>
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
        <Text
          fontSize="xl"
          fontWeight="bold"
          letterSpacing="wide"
          color="purple"
          onClick={() => navigate("/studentdashboard")}
        >
          Student Dashboard
        </Text>
      </HStack>

      {/* Navigation Links & Profile */}
      <HStack spacing={3}>
        {isMobile ? (
          // Mobile View: Hamburger Menu
          <MenuRoot>
            <MenuTrigger>
            <Button
                aria-label="Toggle Sidebar"
                onClick={() => setIsSidebarOpen(true)}
                position="fixed"
                top="10px"
                right="70px"
                zIndex="overlay"
                bg="transparent"
                color="black"
                fontSize="18px"
                fontWeight="bold"
                px="20px"
                py="10px"
                borderRadius="md"
                boxShadow="lg"
                _hover={{ bg: "purple.700", color: "white" }}
                _focus={{ outline: "none" }}
                display={{ base: "flex", md: "none" }} // Hide on full screen
            >
                <FaBars style={{ marginRight: "8px" }} /> 
            </Button>
            </MenuTrigger>
            <MenuContent bg="white" boxShadow="lg">
              {navItems.map((item) => (
                <MenuItem
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  _hover={{ bg: "purple.600", color: "white" }}
                >
                  {item.name}
                </MenuItem>
              ))}
            </MenuContent>
          </MenuRoot>
        ) : (
          // Desktop View: Full Navigation Links
          <HStack spacing={6} fontSize="md" fontWeight="medium">
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
        )}

        {/* Profile Icon (Visible on all screen sizes) */}
        <MenuRoot>
          <MenuTrigger>
            <Button
              variant="ghost"
              colorScheme="whiteAlpha"
              borderRadius="full"
              p={2}
            >
              <FaUserCircle size={26} />
            </Button>
          </MenuTrigger>
          <MenuContent bg="white" boxShadow="lg">
            <MenuItem
              onClick={() => navigate("/studentprofile")}
              _hover={{ bg: "purple.600", color: "white" }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => navigate("/settings")}
              _hover={{ bg: "purple.600", color: "white" }}
            >
              Settings
            </MenuItem>
            <MenuItem
              onClick={() => navigate("/logout")}
              _hover={{ bg: "purple.600", color: "white" }}
            >
              Logout
            </MenuItem>
          </MenuContent>
        </MenuRoot>
      </HStack>
    </Flex>
  );
};

export default StudentNavbar;
