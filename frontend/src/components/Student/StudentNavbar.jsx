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
import { Link as RouterLink } from "react-router-dom";
import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from "../ui/menu";

const navItems = [
  { name: "Profile", path: "/student/profile" },
  { name: "Dashboard", path: "/student/dashboard" },
  { name: "Network", path: "/student/network" },
  { name: "Mentor Connect", path: "/student/mentor-connect" },
  { name: "Jobs", path: "/student/jobs" },
  { name: "Events", path: "/student/events" },
];

const StudentNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
        <Flex alignItems="center">
          <Image
            src="/Logo.png"
            alt="Student Logo"
            boxSize="60px"
            mr={3}
            transition="transform 0.3s ease"
            _hover={{ transform: "scale(1.1)" }}
          />
          <Box>
            <Heading
              size={{ base: "md", md: "lg" }}
              bgGradient="linear(to-r, blue.500, blue.800)"
              bgClip="text"
              fontWeight="extrabold"
              textShadow="2px 2px 4px rgba(0, 0, 0, 0.2)"
              letterSpacing={{ base: "tight", md: "wide" }}
              textTransform="uppercase"
              color="purple.700"
            >
              Student Portal
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }} color="gray.600" fontWeight="medium">
              Empowering Students for the Future
            </Text>
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
              color="gray.700"
              _hover={{ color: "blue.500", transform: "scale(1.05)" }}
            >
              {item.name}
            </Button>
          ))}
          <Button
            as={RouterLink}
            to="/login"
            colorScheme="red"
            fontWeight="bold"
            transition="0.3s"
            _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
          >
            Logout
          </Button>
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
              borderColor="blue.300"
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