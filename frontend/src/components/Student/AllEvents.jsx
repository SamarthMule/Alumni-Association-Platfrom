import {
  Badge,
  Box,
  Button,
  HStack,
  Image,
  Text,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogRoot,
} from "../ui/dialog";

const AllEvents = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      event_name: "TechFest 202",
      event_date: "25-5-2025",
      location: "Bangalore, Karnataka, India (Remote) - Full Time",
      skills: ["Python", "GitHub"],
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_techfest.jpg",
      description:
        "Good communication skills (must). Experience of complex crawling like captcha, recaptcha, and bypassing proxy.",
    },
    {
        id: 2,
        event_name: "TechFest 203",
        event_date: "20-7-2025",
        location: "Menlo Park, California, United States (Remote) - Full Time",
        skills: ["React", "JavaScript"],
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_techfest.jpg",
        description:
            "Experience with React and JavaScript. Strong problem-solving skills.",
    },
  ]);

  const [editingJobId, setEditingJobId] = useState(null);
  const [editedJob, setEditedJob] = useState(null);
  const [preview, setPreview] = useState(null);
  const [skillInput, setSkillInput] = useState("");
  const [viewingJob, setViewingJob] = useState(null);
  

  const fileInputRef = useRef(null);

  const handleViewDetails = (job) => {
    setViewingJob(job);
    setEditingJobId(null);
  };


  return (
    <Box p={6} bg="gray.100">
      <Heading size="lg" mb={4} color="blue.700">
        My Events
      </Heading>
      {events.map((job) => (
        <Box key={job.id} p={6} mb={4} boxShadow="lg" borderRadius="md" bg="white">
          <Stack direction={{ base: "column", md: "row" }} align={{ base: "center", md: "flex-start" }} spacing={4}>
            <Image
              src={job.logo}
              alt="Company Logo"
              boxSize={{ base: "80px", md: "50px" }}
              objectFit="contain"
              borderRadius="md"
            />
            <Box flex="1" textAlign={{ base: "center", md: "left" }}>
              <Text fontSize="lg" fontWeight="bold" color="blue.800">
                {job.event_name}
              </Text>
              <Text fontSize="md" color="gray.600">
                {job.event_date}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {job.location}
              </Text>
              <HStack mt={2} justify={{ base: "center", md: "flex-start" }} wrap="wrap">
                {job.skills.map((skill, index) => (
                  <Badge key={index} colorScheme="purple">
                    {skill}
                  </Badge>
                ))}
              </HStack>
            </Box>

            <HStack spacing={2}>

              <DialogRoot>
                <DialogTrigger asChild>
                  <Button colorScheme="teal" onClick={() => handleViewDetails(job)}>
                    View Details
                  </Button>
                </DialogTrigger>
                {viewingJob?.id === job.id && (
                  <DialogContent>
                    <DialogCloseTrigger />
                    <DialogHeader>
                      <DialogTitle>{viewingJob.event_name}</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                      <Text fontSize="md">{viewingJob.event_date}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {viewingJob.location}
                      </Text>
                      <Image src={viewingJob.logo} alt="Company Logo" boxSize="100px" borderRadius="md" mt={2} />
                      <Text mt={2}>{viewingJob.description}</Text>
                    </DialogBody>
                    <DialogFooter>
                      <DialogCloseTrigger asChild>
                        <Button colorScheme="red">Close</Button>
                      </DialogCloseTrigger>
                    </DialogFooter>
                  </DialogContent>
                )}
              </DialogRoot>
            </HStack>
          </Stack>

      
        </Box>
      ))}
    </Box>
  );
};

export default AllEvents;