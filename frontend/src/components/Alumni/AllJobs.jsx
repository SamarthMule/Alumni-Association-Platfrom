import {
  Card,
  Flex,
  Badge,
  Box,
  Button,
  HStack,
  Image,
  Heading, 
} from "@chakra-ui/react";

const AllJobs = () => {
  return (
    <Flex direction="column" align="center" justify="center" p="4" w="100%" bg="purple.100">
      <Card.Root flexDirection="row" overflow="hidden" maxW="100%" w="100%" bg="white" boxShadow="md" borderRadius="md">
        <Image
          objectFit="cover"
          maxW="200px"
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />
        <Box>
          <Card.Body>
            <Card.Title mb="2">
            <Heading size="2xl">Software Developer</Heading>
            <Heading size="xl">Google</Heading>
            </Card.Title>
            <Card.Description>
            Good communication skills (must) Experience of complex crawling like captcha,recaptcha and bypassing proxy,etc Experience with web crawler projects is a plus. Experience in productionizing machine learning models
            </Card.Description>
            <HStack mt="4">
              <Badge>Python</Badge>
              <Badge>GitHub</Badge>
            </HStack>
          </Card.Body>
          <Card.Footer>
            <Button variant="subtle" colorPalette="purple">Edit</Button>
          </Card.Footer>
        </Box>
      </Card.Root>
    </Flex>
  );
};

export default AllJobs;
