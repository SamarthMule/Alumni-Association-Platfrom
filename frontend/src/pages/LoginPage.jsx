import {
  Box,
  Flex,
  Image,
  Heading,
  VStack,
  Button,
  Input,
  Text,
  Link,
} from "@chakra-ui/react";
import { PasswordInput } from "../components/ui/password-input";
import Navbar from "../components/common/Navbar";
// import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login");
  };

  return (
    <>
    <Navbar />
    <Flex bg="purple.50" justify="center" align="center"
      direction={{ base: "column", md: "row" }} gap={{base: '4' , md: '0'}} p={4} h="90vh" >
      <Box
        flex="1"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        margin={{ base: "0", md: "4" }}
        display={{ base: "none", md: "flex" }}
      >
        <Heading color="purple.500" mb={6}>
          Walchand Institute Of Technology
        </Heading>
        <Image
          src="/Logo.png"
          alt="Alumni Association Platform"
          boxSize="300px"
          shadowColor={"purple.500"}
          shadow={"lg"}
          rounded="full"
        />
      </Box>
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="purple.50"
      >
        <Box
          as="form"
          onSubmit={handleLogin}
          bg="white"
          p={8}
          borderRadius="md"
          boxShadow="lg"
          w={{ base: "100%", md: "400px" }}
          gap={4}
        >
          <Heading
            as="h2"
            size="xl"
            mb={4}
            textAlign="center"
            color="orange.500"
          >
            Login
          </Heading>

          <VStack spacing={6} gap={4}>
            <Input
              type="email"
              placeholder="Email"
              focusBorderColor="purple.500"
              borderColor="purple.300"
            />
            <PasswordInput 
              placeholder="Password"
              focusBorderColor="purple.500"
              borderColor="purple.300"
            />

            <Button type="submit" variant="solid" w="full" colorScheme="{purple}">
              Login
            </Button>

            <Text fontSize="sm" textAlign="center">
              Not Having Account?{" "}
              <Link
                color="purple.500"
                fontWeight="semibold"
                href="/register"
              >
                Register
              </Link>
            </Text>
          </VStack>
        </Box>
      </Box>
    </Flex>
    </>
  );
};

export default LoginPage;
