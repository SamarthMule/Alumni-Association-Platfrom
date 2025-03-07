import { useEffect, useState } from "react";
import { createListCollection } from "@chakra-ui/react";
import {
  Flex,
  Heading,
  Image,
  Input,
  Button,
  Text,
  Link,
  Fieldset,
  HStack,
} from "@chakra-ui/react";
import { Field } from "../../../components/ui/field";

import { PinInput } from "../../../components/ui/pin-input";

import useRegister from "../../../hooks/useRegister";
import { toaster } from "../../../components/ui/toaster";

import {
  NumberInputField,
  NumberInputRoot,
} from "../../../components/ui/number-input";

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../../components/ui/select";
import { use } from "react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [graduationYear, setGraduationYear] = useState(
    new Date().getFullYear()
  );
  const [role, setRole] = useState("");
  const [otp, setOtp] = useState("");
  const { register, loading, error, sendOtp } = useRegister();

  const genders = createListCollection({
    items: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    // Strict form validation
    if (
      !name ||
      !gender ||
      !mobileNo ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      toaster.create({
        title: "All fields are required",
        type: "error",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toaster.create({
        title: "Invalid email format",
        type: "error",
      });
      return;
    }

    if (password.length < 8) {
      toaster.create({
        title: "Password must be at least 8 characters long",
        type: "error",
      });
      return;
    }

    if (password !== confirmPassword) {
      toaster.create({
        title: "Passwords do not match",
        type: "error",
      });
      return;
    }

    const response = await register(
      name,
      gender,
      mobileNo,
      email,
      password,
      graduationYear,
      otp
    );

    if (response && !error) {
      toaster.create({
        title: "Registration Successful",
        type: "success",
      });
    } else {
      toaster.create({
        title: "Registration Failed",
        type: "error",
      });
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const response = await sendOtp(email);
    if (response && !error) {
      toaster.create({
        title: "OTP Sent Successfully",
        type: "success",
      });
    } else {
      toaster.create({
        title: "OTP Failed",
        type: "error",
      });
    }
  };

  // useEffect(() => {
  //   console.table({
  //     name,
  //     gender,
  //     mobileNo,
  //     email,
  //     password,
  //     confirmPassword,
  //     graduationYear,
  //     role,
  //     otp,
  //   });
  // });

  useEffect(() => {
    if (error) {
      toaster.create({
        title: error,
        type: "error",
      });
    }
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
      >
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          display={{ base: "none", md: "flex" }}
        >
          <Heading
            color="purple.500"
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

            <Field label="Name" required={true}>
              <Input
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                borderColor="pink.500"
              />
            </Field>
            <Field label="Gender" required={true}>
              <HStack spacing={4} w="100%">
                <Button
                  colorPalette={gender === "male" ? "blue" : "gray"}
                  variant={gender === "male" ? "solid" : "outline"}
                  onClick={() => setGender("male")}
                  flex={1}
                >
                  Male
                </Button>
                <Button
                  colorPalette={gender === "female" ? "pink" : "gray"}
                  variant={gender === "female" ? "solid" : "outline"}
                  onClick={() => setGender("female")}
                  flex={1}
                >
                  Female
                </Button>
                <Button
                  colorPalette={gender === "other" ? "purple" : "gray"}
                  variant={gender === "other" ? "solid" : "outline"}
                  onClick={() => setGender("other")}
                  flex={1}
                >
                  Other
                </Button>
              </HStack>
            </Field>
            <Field label="Mobile Number" required={true}>
              <NumberInputRoot min={1000000000} max={9999999999} w="100%">
                <NumberInputField
                  w="100%"
                  placeholder="Enter your Phone Number"
                  defaultValue={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                />
              </NumberInputRoot>
            </Field>
            <Field label="Graduation Year" required={true}>
              <NumberInputRoot min={1900} max={2100} w="100%">
                <NumberInputField
                  w="100%"
                  placeholder="Enter your Graduation Year"
                  defaultValue={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                />
              </NumberInputRoot>
            </Field>

            <Field label="Email" required={true} invalid={true}>
              <Input
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                borderColor="pink.500"
              />
            </Field>
            <Field label="Password" required={true} invalid={true}>
              <Input
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                borderColor="pink.500"
              />
            </Field>
            <Field
              label="Confirm Password"
              required={true}
              errorText={
                confirmPassword && password !== confirmPassword
                  ? "Passwords do not match"
                  : ""
              }
              invalid={true}
            >
              <Input
                type="password"
                placeholder="Re-enter your Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                borderColor="pink.500"
              />
            </Field>

            <Button
              variant="subtle"
              w="full"
              colorPalette={"purple"}
              onClick={handleSendOtp}
              disabled={
                !name ||
                !mobileNo ||
                !email ||
                !password ||
                !confirmPassword ||
                !graduationYear ||
                confirmPassword !== password
              }
            >
              Generate OTP
            </Button>
            <Field label="Enter OTP">
              <PinInput
                color="purple.500"
                colorPalette={"purple"}
                count={6}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Field>

            <Button
              type="submit"
              w="full"
              colorPalette={"purple"}
              onClick={handleRegister}
              disabled={
                !name ||
                !mobileNo ||
                !email ||
                !password ||
                !confirmPassword ||
                !graduationYear ||
                confirmPassword !== password ||
                !otp
              }
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
