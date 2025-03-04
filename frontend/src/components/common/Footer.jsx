import { Box, Text, Link, Stack } from "@chakra-ui/react";

const Footer = () => {
    return (
        <Box bg="gray.800" color="white" py={4}>
            <Stack direction="row" spacing={4} justify="center">
                <Link href="#" color="teal.200">Home</Link>
                <Link href="#" color="teal.200">About</Link>
                <Link href="#" color="teal.200">Contact</Link>
            </Stack>
            <Text textAlign="center" mt={2}>
                © {new Date().getFullYear()} Alumni Association. All rights reserved.
            </Text>
        </Box>
    );
};

export default Footer;