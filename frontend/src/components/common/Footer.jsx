import { Box, Container, SimpleGrid, Stack, Text, Link, Image } from "@chakra-ui/react";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import logo from "/Logo.png"; // Adjust the logo path

const Footer = () => {
  return (
    <Box bg="blackAlpha.700" color="gray.400" py={8}>
      <Container maxW="6xl">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} alignItems="start">
          {/* Left Section - Logo and Address */}
          <Stack spacing={3} align="center">
            <Image src={logo} alt="Alumni Association Logo" boxSize="80px" />
            <Text fontSize="sm" textAlign="center">Walchand Institute of Technology, Solapur</Text>
            <Text fontSize="sm" textAlign="center">Solapur, India</Text>
          </Stack>

          {/* Middle Section - Quick Links */}
          <Stack spacing={2} align="start">
            <Text fontWeight="bold" color="orange.300">Quick Links</Text>
            {["/events", "/jobs", "/mentorship"].map((link, index) => (
              <Link 
                key={index} 
                href={link} 
                color="purple.300" 
                transition="0.3s ease-in-out"
                _hover={{ color: "white", transform: "translateX(5px)" }}
              >
                {link.replace("/", "").toUpperCase()}
              </Link>
            ))}
          </Stack>

          {/* Right Section - Resources */}
          <Stack spacing={2} align="start">
            <Text fontWeight="bold" color="orange.300">Resources</Text>
            {["/about", "/contact", "/faq", "/privacy-policy"].map((link, index) => (
              <Link 
                key={index} 
                href={link} 
                color="purple.300" 
                transition="0.3s ease-in-out"
                _hover={{ color: "white", transform: "translateX(5px)" }}
              >
                {link.replace("/", "").replace("-", " ").toUpperCase()}
              </Link>
            ))}
          </Stack>
        </SimpleGrid>

        {/* Bottom Section */}
        <Box mt={6} textAlign="center" fontSize="sm">
          <Text>© 2025 Walchand Institute of Technology Alumni Association</Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
