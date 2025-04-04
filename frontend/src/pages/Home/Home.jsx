import { Box, Heading, Button, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion"; 
import { Link as RouterLink } from "react-router-dom";
import Navbar from "../../components/Home/Navbar";
import image from "../../assets/wit.jpg"; 

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const Home = () => {
  return (
    <>
      <Navbar />

      {/* ✅ Hero Section */}
      <MotionBox 
        id="home"
        position="relative"
        minH={{ base: "80vh", md: "100vh" }}
        bgImage={`url(${image})`} 
        bgSize="cover"
        bgPos="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        px={{ base: 4, md: 8 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Box position="absolute" top={0} left={0} w="100%" h="100%" bg="blackAlpha.300" />
        <MotionBox 
          bg="rgba(255, 255, 255, 0.2)"
          p={{ base: 6, md: 8 }} 
          borderRadius="lg" 
          backdropFilter="blur(25px)" 
          boxShadow="2xl"
          border="1px solid rgba(255, 255, 255, 0.3)"
          zIndex={1}
          maxW={{ base: "70%", md: "lg" }}
          textAlign="center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <MotionHeading color="purple.800" fontSize={{ base: "xl", md: "4xl" }} fontWeight="bold">
            Welcome to Our Alumni Association
          </MotionHeading>
          <MotionText color="pink.700" mt={3} fontSize={{ base: "sm", md: "lg" }}>
            Stay connected, share experiences, and grow with our alumni community.
          </MotionText>
          <MotionButton 
            as={RouterLink} 
            to="/register" 
            mt={5} 
            bg="teal.500" 
            color="white"
            size={{ base: "sm", md: "lg" }}
            px={{ base: 6, md: 8 }}
            _hover={{ bg: "teal.400", transform: "scale(1.1)" }}
          >
            Join Now
          </MotionButton>
        </MotionBox>
      </MotionBox>

      {/* 🎯 Why Join Section */}
      <Box py={{ base: 12, md: 20 }}  textAlign="center">
        <Heading fontSize={{ base: "2xl", md: "3xl" }} mb={5} color="gray.700">
          Why Join Alumni Association Platform?
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} px={{ base: 6, md: 10 }}>
          {[
            { title: "🎓 Networking", desc: "Connect with fellow alumni and industry experts.", color: "teal.500" },
            { title: "🚀 Career Growth", desc: "Get mentorship, job opportunities, and professional advice.", color: "purple.500" },
            { title: "🌍 Give Back", desc: "Support your alma mater and future students.", color: "orange.500" },
          ].map((item, index) => (
            <MotionBox
              key={index}
              
              p={6}
              borderRadius="md"
              boxShadow="lg"
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ duration: 0.3 }}
              _hover={{ bg: item.color, color: "white", transform: "scale(1.05)" }}
              textAlign="center"
            >
              <Heading fontSize="xl" fontWeight="bold">
                {item.title}
              </Heading>
              <Text mt={2} fontSize="md">
                {item.desc}
              </Text>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Box>

      {/* 📖 About Section */}
      <Box 
  id="about" 
  py={{ base: 12, md: 20 }} 
  px={{ base: 6, md: 10 }} 
   
  textAlign="center"
  as={motion.div} 
  initial={{ opacity: 0, y: 30 }} 
  whileInView={{ opacity: 1, y: 0 }} 
  viewport={{ once: true }} 
  transition={{ duration: 1.2 }}
>
  <MotionBox
    
    p={{ base: 8, md: 10 }} 
    borderRadius="lg"
    boxShadow="2xl"
    maxW="4xl"
    mx="auto"
    whileHover={{ scale: 1.05, boxShadow: "lg" }}
    transition="0.4s ease-in-out"
    _hover={{ bg: "gray.50", backdropFilter: "blur(5px)" }}
  >
    <Heading fontSize={{ base: "2xl", md: "3xl" }} mb={5} color="blue.700">
      About Our Alumni Association
    </Heading>
    <Text 
      fontSize={{ base: "md", md: "lg" }} 
      color="gray.600"
      textShadow="1px 1px 8px rgba(0, 0, 0, 0.2)"
      transition="0.3s"
      _hover={{ color: "black" }}
    >
      Our alumni association is a vibrant community of past students who stay connected, 
      support one another, and contribute to the growth of our alma mater. Whether through 
      networking events, mentorship programs, or philanthropic efforts, our alumni play a vital role 
      in fostering success for future generations.
    </Text>
  </MotionBox>
</Box>

    </>
  );
};

export default Home;
