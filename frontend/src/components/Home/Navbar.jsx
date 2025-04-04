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

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <Box
      
      px={4}
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
    alt="WIT Logo"
    boxSize="60px"
    mr={3}
    transition="transform 0.3s ease"
    _hover={{ transform: "scale(1.1)" }} // Hover effect
  />
  <Box>
  <Heading
  size={{ base: "md", md: "lg" }} // Smaller font size on mobile
  bgGradient="linear(to-r, blue.500, blue.800)"
  bgClip="text"
  fontWeight="extrabold"
  textShadow="2px 2px 4px rgba(0, 0, 0, 0.2)"
  letterSpacing={{ base: "tight", md: "wide" }} // Less spacing on mobile
  textTransform="uppercase"
  color="purple.700"
  textAlign={{ base: "center", md: "left" }} // Centered on mobile
>
  Alumni Association Platform
</Heading>
<Text
  fontSize={{ base: "sm", md: "md" }} // Smaller text for mobile
  color="gray.600"
  fontWeight="medium"
  mt={{ base: 0, md: -1 }} // Adjust margin for mobile
  textShadow="0px 1px 1px rgba(0, 0, 0, 0.1)"
  textAlign={{ base: "center", md: "left" }} // Centered on mobile
>
  Connecting the Future with the Past
</Text>
  </Box>
</Flex>
<Flex gap={3} display={{ base: "none", md: "flex" }}>
  {["Home", "About"].map((item) => (
    <Button
      key={item}
      variant="ghost"
      fontSize="lg"
      fontWeight="medium"
      color="gray.700"
      _hover={{
        color: "blue.500",
        transform: "scale(1.05)",
      }}
      onClick={() => scrollToSection(item.toLowerCase())}
    >
      {item}
    </Button>
  ))}
  <Button
    as={RouterLink}
    to="/login"
    colorScheme="blue"
    variant="outline"
    border="2px solid"
    borderColor="blue.500"
    transition="0.3s"
    _hover={{
      bg: "blue.500",
      color: "white",
      boxShadow: "0px 0px 10px rgba(0, 0, 255, 0.5)",
    }}
  >
    Login
  </Button>
  <Button
    as={RouterLink}
    to="/register"
    colorScheme="blue"
    fontWeight="bold"
    transition="0.3s"
    _hover={{
      transform: "translateY(-2px)",
      boxShadow: "lg",
    }}
  >
    Signup
  </Button>
</Flex>

        {/* Mobile Menu */}
        <MenuRoot open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <MenuTrigger asChild>
            {/* Mobile Menu Button (3-line Hamburger Icon) */}
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

         {/* Menu Content */}
{isMenuOpen && (
  <MenuContent
    position="absolute"
    top="60px"
    right="20px"
    
    boxShadow="2xl"
    borderRadius="lg"
    p={5}
    w="240px"
    border="2px solid"
    borderColor="blue.300"
    background="linear-gradient(to bottom, white, blue.50)"
  >
    <Flex justifyContent="flex-end">
      {/* Stylish "X" Close Button */}
      <Text
        fontSize="2xl"
        fontWeight="bold"
        color="red.500"
        cursor="pointer"
        transition="0.3s"
        _hover={{
          color: "red.700",
          transform: "scale(1.2)",
        }}
        onClick={toggleMenu}
      >
        ✖
      </Text>
    </Flex>

    <VStack spacing={4} mt={3} align="stretch">
      {["Home", "About"].map((item) => (
        <MenuItem
          key={item}
          fontSize="lg"
          fontWeight="bold"
          borderRadius="md"
          px={4}
          py={2}
          textAlign="center"
          
          transition="0.3s"
          _hover={{
            bg: "blue.500",
            color: "white",
            transform: "scale(1.05)",
          }}
          onClick={() => scrollToSection(item.toLowerCase())}
        >
          {item}
        </MenuItem>
      ))}
      <MenuItem
        as={RouterLink}
        to="/login"
        fontSize="lg"
        fontWeight="bold"
        borderRadius="md"
        px={2}
        py={2}
        textAlign="center"
        bg="blue.100"
        transition="0.3s"
        _hover={{
          bg: "blue.600",
          color: "white",
          transform: "scale(1.05)",
        }}
      >
        Login
      </MenuItem>
      <MenuItem
        as={RouterLink}
        to="/register"
        fontSize="lg"
        fontWeight="bold"
        borderRadius="md"
        px={2}
        py={2}
        textAlign="center"
        bg="blue.300"
        transition="0.3s"
        _hover={{
          bg: "blue.700",
          color: "white",
          transform: "scale(1.05)",
        }}
      >
        Signup
      </MenuItem>
    </VStack>
  </MenuContent>

          )}
        </MenuRoot>
      </Flex>
    </Box>
  );
};

export default Navbar;
