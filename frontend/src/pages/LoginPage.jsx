import {
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

const LoginPage = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login");
  };

  return (
    <Flex bgImg={"url('/background.avif')"} bgPos="center" direction="column" p={{base : "0", md: "6"}} h="100vh"> 
      <Navbar />
    <Flex direction="row" align="center" justify="center" gap="5" p="4" h="90vh" bg="purple.50">
    {/* <Flex direction="row" align="center" justify="center" gap="5" p="4" h="90vh" bg="transparent" backdropFilter="blur(5px)"> */}
      
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          display={{ base: "none", md: "flex" }}
        >
          <Heading
            color="orange.500"
            m="10"
            textAlign="center"
            fontSize="4xl"
            fontWeight="4xl"
            fontFamily={"sans-serif"}
            lineHeight="shorter"
          >
            Walchand Institute Of Technology
          </Heading>
          <Image
            src="/Logo.png"
            alt="Alumni Association Platform"
            width="400px"
            rounded="full"
            // filter="drop-shadow(0 0 0.25rem orange)"
            shadow="lg"
          />
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          minW={{ base: "100%", md: "50%" }}
        >
          <Fieldset.Root
            size="lg"
            maxW="400px"
            mx="auto"
            p={8}
            bg="white"
            borderRadius="md"
            boxShadow="lg"
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

            <Fieldset.Content onSubmit={handleLogin}>
              <Field color="purple.700" label="Email">
                <Input
                  color="purple.500"
                  type="email"
                  placeholder="Email"
                  focusBorderColor="purple.500"
                  borderColor="purple.300"
                />
              </Field>

              <Field color="purple.700" label="Password">
                <PasswordInput
                  color="purple.500"
                  placeholder="Password"
                  focusBorderColor="purple.500"
                  borderColor="purple.300"
                />
              </Field>
            </Fieldset.Content>

            <Button
              type="submit"
              variant="subtle"
              w="full"
              colorPalette={"purple"}
            >
              Login
            </Button>

            <Text fontSize="sm" textAlign="center" color="black">
              Not Having Account?{" "}
              <Link color="purple.500" fontWeight="semibold" href="/register">
                Register
              </Link>
            </Text>
          </Fieldset.Root>
        </Flex>
      </Flex>
      </Flex>
  );
};

export default LoginPage;
