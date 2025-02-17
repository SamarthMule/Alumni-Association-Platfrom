import Navbar from "../../components/common/Navbar";
import {
  Flex,
  Heading,
  Image,
  Input,
  Button,
  Text,
  Link,
  Fieldset,
} from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import { PasswordInput } from "../../components/ui/password-input";
import { PinInput } from "../../components/ui/pin-input";
const RegisterPage = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Register");
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
              Register
            </Heading>

            <Fieldset.Content onSubmit={handleRegister}>
              {/* <Field label="Name">
                <Input
                  type="text"
                  placeholder="Name"
                  focusBorderColor="purple.500"
                  borderColor="purple.300"
                />
              </Field> */}

              <Field label="PRN Number">
                <Input
                  type="text"
                  placeholder="PRN Number"
                  focusBorderColor="purple.500"
                  borderColor="purple.300"
                />
              </Field>

              <Field label="Email">
                <Input
                  type="email"
                  placeholder="Email"
                  focusBorderColor="purple.500"
                  borderColor="purple.300"
                />
              </Field>

              <Field label="Password">
                <PasswordInput
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
              <PinInput color="purple.500" colorPalette={"purple"} count={6} />
            </Field>

            <Button type="submit" w="full" colorPalette={"purple"}>
              Verify OTP & Register
            </Button>

            <Text fontSize="sm" textAlign="center">
              Already Having Account?{" "}
              <Link color="purple.500" fontWeight="semibold" href="/login">
                Login
              </Link>
            </Text>
          </Fieldset.Root>
        </Flex>
      </Flex>
    </>
  );
};

export default RegisterPage;
