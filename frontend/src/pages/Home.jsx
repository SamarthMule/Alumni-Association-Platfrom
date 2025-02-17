import { Flex, Heading, Image } from "@chakra-ui/react";
import Navbar from "../components/common/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Flex
        bg="purple.50"
        p={4}
        h="90vh"
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
      >
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Heading
            color="orange.500"
            m="10"
            textAlign="center"
            fontSize="4xl"
            fontWeight="bold"
            lineHeight="shorter"
            // filter="drop-shadow(0 0 0.25rem orange)"
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
      </Flex>
    </>
  );
};

export default Home;
