import React, { useState } from "react";
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
import InputField from "../../components/chat-components/InputField";
import useRegister from "../../../hooks/useRegister";
import { toaster } from "../../components/ui/toaster";

const RegisterPage = () => {
  const [prn, setPrn] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const { register, loading, error } = useRegister();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toaster({
        title: "Passwords do not match",
        type: "error",
      });
      return;
    }
    const response = register(
      prn,
      name,
      gender,
      mobileNo,
      email,
      password,
      graduationYear,
      currentStatus
    );
    if (response && !error) {
      toaster({
        title: "Registration Successful",
        type: "success",
      });
    } else {
      toaster({
        title: "Registration Failed",
        type: error ? error : "Something went wrong",
      });
    }
  };

  return (
    <>
      <Flex
        bg="purple.50"
        justify="center"
        align="center"
        direction={{ base: "column", md: "row" }}
        gap="5"
        p={4}
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

            <InputField
              label="PRN"
              placeholder="Enter your PRN Number"
              value={prn}
              onChange={(e) => setPrn(e.target.value)}
              isRequired={true}
              isInvalid={true}
              errorText={error}
            />
            <InputField
              label="Name"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isRequired={true}
              isInvalid={true}
              errorText={error}
            />
            <InputField
              label="Gender"
              placeholder="Enter your Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              isRequired={true}
              isInvalid={true}
              errorText={error}
            />
            <InputField
              label="Mobile Number"
              placeholder="Enter your Mobile Number"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              isRequired={true}
              isInvalid={true}
              errorText={error}
            />
            <InputField
              label="Email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRequired={true}
              isInvalid={true}
              errorText={error}
            />
            <InputField
              type="password"
              label="Password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isRequired={true}
              isInvalid={true}
              errorText={error}
            />
            <InputField
              type="password"
              label="Confirm Password"
              placeholder="Re-enter your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isRequired={true}
              isInvalid={true}
              errorText={error}
            />
            <InputField
              label="Graduation Year"
              placeholder="Enter your Graduation Year"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              isRequired={true}
              isInvalid={true}
              errorText={error}
            />
            <InputField
              label="Current Status"
              placeholder="Enter your Current Status"
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value)}
              isRequired={true}
              isInvalid={true}
              errorText={error}
            />

            <Button variant="subtle" w="full" colorPalette={"purple"}>
              Generate OTP
            </Button>
            <Field label="Enter OTP">
              <PinInput color="purple.500" colorPalette={"purple"} count={6} />
            </Field>

            <Button
              type="submit"
              w="full"
              colorPalette={"purple"}
              onClick={handleRegister}
            >
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
