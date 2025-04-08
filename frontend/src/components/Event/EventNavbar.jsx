import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from "../ui/menu";
import { FaUserCircle, FaBars } from "react-icons/fa";
import LogoutButton from "../common/LogoutButton";
import useColorTheme from "../../hooks/useColorTheme";

const EventNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {chatBoxHeaderFooterBG} = useColorTheme()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    setTimeout(() => {
      navigate("/login");
    }, 100); // Small delay ensures state updates before redirect
  };
  

  const navItems = [
    { name: "Events", path: "/event/" },
    { name: "Create Events", path: "/event/create" },
  ];

  return (
    <Box
      
      px={6}
      py={4}
      boxShadow="lg"
      position="sticky"
      bgColor={chatBoxHeaderFooterBG}
      top={0}
      zIndex={1000}
    >
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        maxW="1200px"
        mx="auto"
      >
        {/* Logo */}
        <Flex alignItems="center" cursor="pointer" onClick={() => navigate("/alumnidashboard")}>
          <Image
            src="/Logo.png"
            alt="Event Manager Logo"
            boxSize="60px"
            mr={3}
            transition="transform 0.3s ease"
            _hover={{ transform: "scale(1.1)" }}
          />
          <Box>
            <Heading
              size={{ base: "md", md: "lg" }}
              bgGradient="linear(to-r, purple.500, pink.800)"
              bgClip="text"
              fontWeight="extrabold"
              textShadow="2px 2px 4px rgba(0, 0, 0, 0.2)"
              letterSpacing={{ base: "tight", md: "wide" }}
              textTransform="uppercase"
              color="purple.700"
            >
              Event Manager
            </Heading>
          </Box>
        </Flex>
        <Flex gap={3} display={{ base: "none", md: "flex" }}>
          {navItems.map((item) => (
            <Button
              key={item.name}
              as={RouterLink}
              to={item.path}
              variant="ghost"
              fontSize="lg"
              fontWeight="medium"
              color={location.pathname === item.path ? "purple.700" : "gray.700"}
              _hover={{ color: "purple.500", transform: "scale(1.05)" }}
            >
              {item.name}
            </Button>
          ))}
        </Flex>

        {/* Mobile Menu */}
        <MenuRoot>
  <MenuTrigger asChild>
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
  </MenuTrigger>
  <MenuContent
    position="absolute"
    top="60px"
    right="20px"
    
    boxShadow="2xl"
    borderRadius="lg"
    p={5}
    w="240px"
    border="2px solid"
    borderColor="purple.300"
  >
    <VStack spacing={4}>
      {navItems.map((item) => (
        <MenuItem key={item.name} as={RouterLink} to={item.path}>
          {item.name}
        </MenuItem>
      ))}
      <LogoutButton/>
    </VStack>
  </MenuContent>
</MenuRoot>
      </Flex>
    </Box>
  );
};

export default EventNavbar;