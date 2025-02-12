import {
    Flex,
    Heading,
    Button,
    Text,
    Link,
    Stack,
    Box,
    Image,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "../components/common/Navbar";
import { Field } from "../components/ui/field";
import { PinInput } from "../components/ui/pin-input";

const OtpVerificationPage = () => {
    const [otp, setOtp] = useState("");

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        console.log("Entered OTP:", otp);
    };

    const handleResendOtp = () => {
        console.log("Resending OTP...");
    };

    return (
        <>
            <Navbar />
            <Flex
                bg="purple.50"
                justify="center"
                align="center"
                h="100vh"
                px={4}
            >
                {/* Main Container */}
                <Flex
                    backgroundColor="purple.100"
                    mb="150px"
                    borderRadius="lg"
                    shadow="lg"
                    p={8}
                    w={{ base: "90%", md: "70%", lg: "50%" }} // Wider box
                    maxW="900px"
                    align="center"
                    justify="center"
                    gap={8}
                    direction={{ base: "column", md: "row" }} // Column on small screens
                >
                    {/* Left: Logo Section */}
                    <Box flex="1" textAlign="center">
                        <Image
                            src="/Logo.png" // Replace with your logo path
                            alt="Logo"
                            maxW="250px"
                            mx="auto"
                        />
                    </Box>

                    {/* Right: OTP Verification Section */}
                    <VStack flex="1" spacing={6} align="stretch">
                        <Box textAlign="center">
                            <Heading as="h2" size="lg" color="orange.500">
                                OTP Verification
                            </Heading>
                            <Text fontSize="md" color="gray.600" mt={2}>
                                Enter the OTP sent to your registered email.
                            </Text>
                        </Box>

                        <Box as="form" onSubmit={handleOtpSubmit}>
                            <Stack spacing={5}>
                                <Field label="Enter OTP">
                                    <PinInput />
                                </Field>

                                <Button type="submit" colorScheme="purple" w="full" size="lg">
                                    Verify OTP
                                </Button>
                            </Stack>
                        </Box>

                        <Box textAlign="center">
                            <Text fontSize="sm">
                                Didn't receive the OTP?{" "}
                                <Link
                                    color="purple.500"
                                    fontWeight="semibold"
                                    onClick={handleResendOtp}
                                >
                                    Resend OTP
                                </Link>
                            </Text>
                        </Box>
                    </VStack>
                </Flex>
            </Flex>
        </>
    );
};

export default OtpVerificationPage;
