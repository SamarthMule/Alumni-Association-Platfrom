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
  Card,
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

import useColorTheme from "../../../hooks/useColorTheme";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [prn, setPrn] = useState("");

  const [graduationYear, setGraduationYear] = useState(
    new Date().getFullYear()
  );
  const [role, setRole] = useState("");
  const [otp, setOtp] = useState("");
  const { register, loading, error, sendOtp, checkAccess } = useRegister();
  const { homeBG } = useColorTheme();

  const handleCheckAccess = async () => {

    if (!email && !prn) {
      toaster.create({
        title: "Please enter either email or PRN",
        type: "error",
      });
      return;
    }

    
    const response = await checkAccess(email,prn);
    console.log('=== response RegisterPage.jsx [67] ===', response);
    if (response.data && !error) {
      toaster.create({
        title: "Access Granted",
        type: "success",
      });
      setName(response.data.student_name);
      setGender(response.data.gender);
      setMobileNo(response.data.mobile_no);
      setGraduationYear(new Date(response.data.graduation_year).getFullYear());
      console.log('=== graduationYear RegisterPage.jsx [77] ===', graduationYear);
      setRole(response.data.role);
    } else {
      toaster.create({
        title: "Access Denied",
        type: "error",
      });
    }
  };

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
        justify="center"
        align="center"
        direction={{ base: "column", md: "row" }}
        gap="5"
        p={4}
        bg={homeBG}
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
        <Card.Root w="400px">
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
              borderRadius="md"
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
              <HStack gap={3} alignItems="flex-end">
                <Field label="Email" required={true} invalid={true}>
                  <Input
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    borderColor="pink.500"
                  />
                </Field>
                <Button onClick={() => handleCheckAccess()}>
                  Check Access
                </Button>
              </HStack>
              <Heading
                as="h2"
                size="lg"
                textAlign="center"
                color="orange.500"
                fontSize="2xl"
                fontWeight="bold"
              >
                OR
              </Heading>
              <HStack gap={3} alignItems="flex-end">
                <Field label="PRN No" required={true} invalid={true}>
                  <Input
                    placeholder="Enter your PRN No"
                    value={prn}
                    onChange={(e) => setPrn(e.target.value)}
                    borderColor="pink.500"
                  />
                </Field>
                <Button onClick={() => handleCheckAccess()}>
                  Check Access
                </Button>
              </HStack>
              <Field label="Name" required={true}>
                <Input
                  placeholder="Enter your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  borderColor="pink.500"
                  disabled
                />
              </Field>
              <Field label="Gender" required={true}>
                <HStack spacing={4} w="100%">
                  <Button
                    colorPalette={gender === "male" ? "blue" : "gray"}
                    variant={gender === "male" ? "solid" : "outline"}
                    onClick={() => setGender("male")}
                    disabled
                    flex={1}
                  >
                    Male
                  </Button>
                  <Button
                    colorPalette={gender === "female" ? "pink" : "gray"}
                    variant={gender === "female" ? "solid" : "outline"}
                    onClick={() => setGender("female")}
                    flex={1}
                    disabled
                  >
                    Female
                  </Button>
                  <Button
                    colorPalette={gender === "other" ? "purple" : "gray"}
                    variant={gender === "other" ? "solid" : "outline"}
                    onClick={() => setGender("other")}
                    flex={1}
                    disabled
                  >
                    Other
                  </Button>
                </HStack>
              </Field>
              <Field label="Mobile Number" required={true}>
                <NumberInputRoot
                  min={1000000000}
                  max={9999999999}
                  w="100%"
                  disabled
                >
                  <NumberInputField
                    w="100%"
                    placeholder="Enter your Phone Number"

                    defaultValue={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                  />
                </NumberInputRoot>
              </Field>
              <Field label="Graduation Year" required={true}>
                <NumberInputRoot min={1900} max={2100} w="100%" disabled>
                  <NumberInputField
                    w="100%"
                    placeholder="Enter your Graduation Year"
                    defaultValue={graduationYear}
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                  />
                </NumberInputRoot>
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
        </Card.Root>
      </Flex>
    </>
  );
};

export default RegisterPage;
