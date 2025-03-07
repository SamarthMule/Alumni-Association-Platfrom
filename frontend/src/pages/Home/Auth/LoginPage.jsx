import {
  Flex,
  Image,
  Heading,
  Button,

  Text,
  Link,
  Fieldset,
} from "@chakra-ui/react";

import { Field } from "../../../components/ui/field";
import { PinInput } from "../../../components/ui/pin-input";
import InputField from "../../../components/chat-components/InputField";
import useLogin from "../../../hooks/useLogin";
import { useEffect, useState } from "react";
import { toaster } from "../../../components/ui/toaster";
import { useNavigate } from "react-router";
import useChatContext from "../../../hooks/useChatContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login,error,loading} = useLogin();
  const navigate = useNavigate();
  const {setUser,user} = useChatContext();

  const handleLogin = async(e) => {
    e.preventDefault();
    if (!email || !password) {
      toaster.create({
        title: "Please fill all the fields",
        type: "error",
      });
      return;
    }
  

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toaster.create({
        title: "Invalid Email",
        type: "error",
      })
      return;
    }

    const response = await login(email, password);
    if (response && !error) {
      toaster.create({
        title: "Login Successful",
        type: "success",
      });
      setUser(response);
    }
  };

  useEffect(() => {
    error && toaster.create({
      title: error,
      type: "error",
    });
  }, [error]);

  return (
    <>
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

            <Fieldset.Content>
              <InputField
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isRequired={true}
                // isInvalid={emailError}
                // errorText={emailError}
              />

              <InputField
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isRequired={true}
                // isInvalid={passwordError}
                // errorText={passwordError}
              />
            </Fieldset.Content>

            

            <Button type="submit" w="full" colorPalette={"purple"} onClick={handleLogin}>
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
    </>
  );
};

export default LoginPage;
