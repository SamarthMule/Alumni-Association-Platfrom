import {
  Card,
  Flex,
  Badge,
  Box,
  Button,
  HStack,
  Image,
  Text,
  Heading,
} from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "../ui/dialog";
import Lorem from "react-lorem-ipsum"

const MyJobs = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      p="4"
      w="100%"
      bg="purple.100"
    >
      <Card.Root
        flexDirection="row"
        overflow="hidden"
        maxW="100%"
        w="100%"
        bg="white"
        boxShadow="md"
        borderRadius="md"
      >
        <Image
          objectFit="contain"
          maxW="200px"
          src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
          alt="Google"
        />
        <Box>
          <Card.Body>
            <Card.Title mb="2">
              <Heading size="2xl" color="orange.600">
                {" "}
                <b>Software Developer</b>, Google
              </Heading>
              <Heading size="md" color="purple.500">
                Bangalore, Karnataka, India (Remote) - Full Time
              </Heading>
            <HStack mt="4">
            <Text color="purple.900" fontWeight="bold">Skills:</Text>
              <Badge>Python</Badge>
              <Badge>GitHub</Badge>
            </HStack>
            </Card.Title>
            <Card.Description>
              Good communication skills (must) Experience of complex crawling
              like captcha,recaptcha and bypassing proxy,etc Experience with web
              crawler projects is a plus. Experience in productionizing machine
              learning models
            </Card.Description>
          </Card.Body>
          <Card.Footer>
            <DialogRoot
              size="xl"
              placement="center"
              motionPreset="slide-in-bottom"
            >
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Open Dialog
                </Button>
              </DialogTrigger>
              <DialogContent>
                    <DialogCloseTrigger color="orange.600" bg="purple.100" p="2" m="2"> Cancle </DialogCloseTrigger>
                <DialogBody>
                  <Card.Body>
                    <Card.Title mb="2" p="2">
                      <Heading size="2xl" color="orange.600">
                        {" "}
                        <b>Software Developer</b>, Google
                      </Heading>
                      <Heading size="md" color="purple.500">
                        Bangalore, Karnataka, India (Remote) - Full Time
                      </Heading>
                    <HStack mt="4">
                    <Text color="purple.900" fontWeight="bold">Skills:</Text>
                      <Badge>Python</Badge>
                      <Badge>GitHub</Badge>
                    </HStack>
                    </Card.Title>
                    <Card.Description>
                      <Box scrollBehavior="inside" overflow="auto" maxH="300px">
                        <Lorem p={10} />
                      </Box>
                    </Card.Description>
                  <Card.Footer p="2" justifyItems="center" justifyContent="end"> 
                    <Button color="orange.600" bg="purple.100" p="2"> Save </Button>
                  </Card.Footer>
                  </Card.Body>
                </DialogBody>
              </DialogContent>
            </DialogRoot>
          </Card.Footer>
        </Box>
      </Card.Root>
    </Flex>
  );
};

export default MyJobs;
