
import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Button,
} from "@chakra-ui/react";
import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from "../ui/menu";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="purple.50" px={4} boxShadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Left Section: Logo and College Name */}
        <Flex alignItems="center">
          <Image
            src="/Logo.png"
            alt="WIT Logo"
            boxSize="50px"
            objectFit="contain"
            mr={2}
          />
          <Box>
            <Heading size="md" color="pink.500">
              Walchand Institute of Technology
            </Heading>
            <Heading size="sm" color="gray.600" fontWeight="normal">
              Alumni Association Platform
            </Heading>
          </Box>
        </Flex>

        {/* Desktop Navigation Links */}
        <Stack
          direction="row"
          spacing={7}
          display={{ base: "none", md: "flex" }}
        >
          <Link as={RouterLink} to="/" color="blue.500" fontWeight="semibold">
            Home
          </Link>
          <Link
            as={RouterLink}
            to="/login"
            color="blue.500"
            fontWeight="semibold"
          >
            Login
          </Link>
          <Link
            as={RouterLink}
            to="/register"
            color="blue.500"
            fontWeight="semibold"
          >
            Register
          </Link>
        </Stack>

        {/* Mobile Menu */}
        <Box display={{ base: "block", md: "none" }}>
          <MenuRoot>
          <MenuTrigger asChild>
            <Button colorScheme="Purple" c>Menu</Button>
          </MenuTrigger>
            <MenuContent>
              <MenuItem > Home </MenuItem>
              <MenuItem > Login </MenuItem>
              <MenuItem > Register </MenuItem>
            </MenuContent>
          </MenuRoot>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;