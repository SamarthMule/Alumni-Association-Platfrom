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

const [editingEventId, setEditingEventId] = useState(null);
const [editedEvent, setEditedEvent] = useState(null);
const [preview, setPreview] = useState(null);
const [skillInput, setSkillInput] = useState("");
const [viewingEvent, setViewingEvent] = useState(null);

const fileInputRef = useRef(null);

const handleViewDetails = (evt) => {
    setViewingEvent(evt);
    setEditingEventId(null);
};

return (
    <Box p={6} bg="gray.100">
        <Heading size="lg" mb={4} color="pink.700">
            My Events
        </Heading>
        {events.map((event) => (
            <Box key={event.id} p={6} mb={4} boxShadow="lg" borderRadius="md" bg="white">
                <Stack
                    direction={{ base: "column", md: "row" }}
                    align={{ base: "center", md: "flex-start" }}
                    spacing={4}
                >
                    <Image
                        src={event.logo}
                        alt="Company Logo"
                        boxSize={{ base: "80px", md: "50px" }}
                        objectFit="contain"
                        borderRadius="md"
                    />
                    <Box flex="1" textAlign={{ base: "center", md: "left" }}>
                        <Text fontSize="lg" fontWeight="bold" color="pink.800">
                            {event.event_name}
                        </Text>
                        <Text fontSize="md" color="gray.600">
                            {event.event_date}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                            {event.location}
                        </Text>
                        <HStack mt={2} justify={{ base: "center", md: "flex-start" }} wrap="wrap">
                            {event.skills.map((skill, index) => (
                                <Badge key={index} colorScheme="purple">
                                    {skill}
                                </Badge>
                            ))}
                        </HStack>
                    </Box>
                    <HStack spacing={2}>
                        <DialogRoot>
                            <DialogTrigger asChild>
                                <Button colorScheme="teal" onClick={() => handleViewDetails(event)}>
                                    View Details
                                </Button>
                            </DialogTrigger>
                            {viewingEvent?.id === event.id && (
                                <DialogContent>
                                    <DialogCloseTrigger />
                                    <DialogHeader>
                                        <DialogTitle>{viewingEvent.event_name}</DialogTitle>
                                    </DialogHeader>
                                    <DialogBody>
                                        <Text fontSize="md">{viewingEvent.event_date}</Text>
                                        <Text fontSize="sm" color="gray.500">
                                            {viewingEvent.location}
                                        </Text>
                                        <Image
                                            src={viewingEvent.logo}
                                            alt="Company Logo"
                                            boxSize="100px"
                                            borderRadius="md"
                                            mt={2}
                                        />
                                        <Text mt={2}>{viewingEvent.description}</Text>
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