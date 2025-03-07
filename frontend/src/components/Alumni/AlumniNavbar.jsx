import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from "../ui/menu";
import { FaUserCircle, FaBars } from "react-icons/fa";

const StudentNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "Dashboard", path: "/alumni/dashboard" },
    { name: "Network", path: "/alumni/network" },
    { name: "Profile", path: "/alumni/profile" },
    { name: "Jobs", path: "/alumni/jobs" },
    { name: "Alumni Connect", path: "/alumni/mentor-connect" },
  ];

  return (
    <Box
      bg="white"
      px={6}
      py={4}
      boxShadow="lg"
      position="sticky"
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
            alt="Alumni Dashboard Logo"
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
              Alumni Dashboard
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
        <MenuRoot open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <MenuTrigger asChild>
            <Box
              display={{ base: "flex", md: "none" }}
              flexDirection="column"
              gap="5px"
              cursor="pointer"
              onClick={toggleMenu}
            >
              <Box w="26px" h="3px" bg="black" borderRadius="2px" />
              <Box w="26px" h="3px" bg="black" borderRadius="2px" />
              <Box w="26px" h="3px" bg="black" borderRadius="2px" />
            </Box>
          </MenuTrigger>
          {isMenuOpen && (
            <MenuContent
              position="absolute"
              top="60px"
              right="20px"
              bg="white"
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
                <MenuItem as={RouterLink} to="/login" color="red.500">Logout</MenuItem>
              </VStack>
            </MenuContent>
          )}
        </MenuRoot>
      </Flex>
    </Box>
  );
};

export default StudentNavbar;
