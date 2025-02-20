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
import Lorem from "react-lorem-ipsum";

const allJobsData = [
  {
    company: "Google",
    position: "Software Developer",
    location: "Bangalore, Karnataka, India (Remote) - Full Time",
    skills: ["Python", "GitHub"],
    logo: "https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png",
    description:
      "Good communication skills (must) Experience of complex crawling like captcha, recaptcha and bypassing proxy, etc. Experience with web crawler projects is a plus. Experience in productionizing machine learning models",
  },
  {
    company: "Facebook",
    position: "Software Engineer",
    location: "Menlo Park, California, United States (Remote) - Full Time",
    skills: ["React", "JavaScript"],
    logo: "https://pngimg.com/d/facebook_logos_PNG19753.png",
    description:
      "Experience with React and JavaScript. Strong problem-solving skills. Ability to work in a fast-paced environment. Experience with version control systems like Git.",
  },
  {
    company: "Amazon",
    position: "Data Scientist",
    location: "Seattle, Washington, United States (Remote) - Full Time",
    skills: ["Python", "SQL"],
    logo: "https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/amazon-512.png",
    description:
      "Proficiency in Python and SQL. Experience with data analysis and machine learning. Strong analytical skills. Ability to work with large datasets.",
  },
];

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
      {allJobsData.map((job, index) => (
        <Card.Root
          key={index}
          flexDirection="row"
          overflow="hidden"
          maxW="100%"
          w="100%"
          bg="white"
          boxShadow="md"
          borderRadius="md"
          _hover={{ transform: "scale(1.02)", transition: "0.3s ease-in-out" }}
          mb="4"
        >
          <Box>
            <Card.Body>
              <Card.Title mb="2">
                <Flex
                  direction="row"
                  gap = "4"
                >
                  <Flex >
                    <Image
                      objectFit="contain"
                      maxW={{ md: "100px", base: "50px" }}
                      src={job.logo}
                      alt={job.company}
                      minW="100px"
                      minH="100px"
                    />
                    </Flex>
                    <Flex direction="column" align="flex-start">
                    <Heading size="2xl" color="purple.600">
                      <b>{job.position}</b>, {job.company}
                    </Heading>
                    <Heading size="md" color="orange.500">
                      {job.location}
                    </Heading>
                    <HStack mt="4">
                      <Text color="purple.800" fontWeight="bold">
                        Skills:
                      </Text>
                      {job.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex}>{skill}</Badge>
                      ))}
                    </HStack>
                  </Flex>
                </Flex>
                  
              </Card.Title>
              <Card.Description>{job.description}</Card.Description>
            </Card.Body>
            <Card.Footer>
              <DialogRoot
                size="xl"
                placement="center"
                motionPreset="slide-in-bottom"
              >
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" colorPalette="orange">
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogCloseTrigger
                    color="orange.600"
                    bg="purple.100"
                    p="2"
                    m="2"
                  >
                    Cancel
                  </DialogCloseTrigger>
                  <DialogBody>
                    <Card.Body>
                      <Card.Title mb="2" p="2">
                      <Flex
                  direction="row"
                  gap = "4"
                >
                  <Flex >
                    <Image
                      objectFit="contain"
                      maxW={{ md: "100px", base: "50px" }}
                      src={job.logo}
                      alt={job.company}
                      minW="100px"
                      minH="100px"
                    />
                    </Flex>
                    <Flex direction="column" align="flex-start">
                    <Heading size="2xl" color="purple.600">
                      <b>{job.position}</b>, {job.company}
                    </Heading>
                    <Heading size="md" color="orange.500">
                      {job.location}
                    </Heading>
                    <HStack mt="4">
                      <Text color="purple.800" fontWeight="bold">
                        Skills:
                      </Text>
                      {job.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex}>{skill}</Badge>
                      ))}
                    </HStack>
                  </Flex>
                </Flex>
                      </Card.Title>
                      <Card.Description>
                        <Box
                          scrollBehavior="inside"
                          overflow="auto"
                          maxH="300px"
                        >
                          <Lorem p={10} />
                        </Box>
                      </Card.Description>
                      <Card.Footer
                        p="2"
                        justifyItems="center"
                        justifyContent="end"
                      >
                        <Button color="orange.600" bg="purple.100" p="2">
                          Save
                        </Button>
                      </Card.Footer>
                    </Card.Body>
                  </DialogBody>
                </DialogContent>
              </DialogRoot>
            </Card.Footer>
          </Box>
        </Card.Root>
      ))}
    </Flex>
  );
};

export default MyJobs;
