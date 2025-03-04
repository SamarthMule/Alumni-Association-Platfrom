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
import { PasswordInput } from "../../../components/ui/password-input";
import Navbar from "../../../components/Home/Navbar";
import { Field } from "../../../components/ui/field";
import { PinInput } from "../../../components/ui/pin-input";

const LoginPage = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login");
  };

  return (
    <>
      <Navbar />
      <Flex
        bg="purple.50"
        justify="center"
        align="center"
        direction={{ base: "column", md: "row" }}
        gap="5"
        p={4}
        h="90vh"
      >
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          display={{ base: "none", md: "flex" }}
        >
          <Heading
            color="orange.500"
            m="10"
            textAlign="center"
            fontSize="4xl"
            fontWeight="bold"
            lineHeight="shorter"
          >
            Walchand Institute Of Technology
          </Heading>
          <Image
            src="/Logo.png"
            alt="Alumni Association Platform"
            width="400px"
            rounded="full"
            // filter="drop-shadow(0 0 0.25rem black)"
            shadow="lg"
          />
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          bg="purple.50"
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
              <Field label="Email">
                <Input
                  color="purple.500"
                  type="email"
                  placeholder="Email"
                  focusBorderColor="purple.500"
                  borderColor="purple.300"
                />
              </Field>

              <Field label="Password">
                <PasswordInput
                  color="purple.500"
                  placeholder="Password"
                  focusBorderColor="purple.500"
                  borderColor="purple.300"
                />
              </Field>
            </Fieldset.Content>

            <Button variant="subtle" w="full" colorPalette={"purple"}>
              Generate OTP
            </Button>
            <Field label="Enter OTP">
              <PinInput 
                  color="purple.500"
                  colorPalette={"purple"}
                  count={6}
                   />
            </Field>

            <Button type="submit" w="full" colorPalette={"purple"}>
              Verify OTP & Login
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
    </>
  );
};

export default LoginPage;
