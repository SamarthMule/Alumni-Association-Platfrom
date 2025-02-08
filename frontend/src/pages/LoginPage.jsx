import {
  Box,
  Flex,
  Image,
  Heading,
  Button,
  Input,
  Text,
  Link,
  Fieldset,
} from "@chakra-ui/react";
import { PasswordInput } from "../components/ui/password-input";
import Navbar from "../components/common/Navbar";
import { Field } from "../components/ui/field";
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
          direction={{ base: "column", md: "row" }} gap="5" p={4} h="90vh" >
          <Box
            flex="1"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            display={{ base: "none", md: "flex" }}
          >
            <Heading color="purple" m="10" textAlign="center" fontSize="4xl"
                    fontWeight="bold" lineHeight="shorter" 
                    filter="drop-shadow(0 0 0.25rem orange)"
            >
              Walchand Institute Of Technology
            </Heading>
            <Image
              src="/Logo.png"
              alt="Alumni Association Platform"
              boxSize="400px"
              width="500px"
              rounded="full"
              filter="drop-shadow(0 0 0.25rem orange)"
            />
          </Box>
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="purple.50"
      >
        <Fieldset.Root size='lg' maxW='400px' mx='auto' p={8} bg='white' borderRadius='md' boxShadow='lg'>
          <Heading
            as="h2"
            size="xl"
            mb={4}
            textAlign="center"
            color="orange.500"
          >
            Login
          </Heading>

          <Fieldset.Content onSubmit={handleLogin}>
            <Field label="Email">
              <Input type="email" placeholder="Email" focusBorderColor="purple.500" borderColor="purple.300" />
            </Field>

            <Field label="Password">
              <PasswordInput placeholder="Password" focusBorderColor="purple.500" borderColor="purple.300"/>
            </Field>
          </Fieldset.Content>

          <Button type="submit" variant="subtle" w="full" colorPalette={"purple"}>
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
        </Fieldset.Root>
      </Box>
    </Flex>
    </>
  );
};

export default LoginPage;
