import {
    Badge,
    Box,
    Button,
    HStack,
    Image,
    Text,
    Heading,
    Input,
    Textarea,
    VStack,
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

const MyEvents = () => {
    const [events, setEvents] = useState([
        {
            id: 1,
            event_name: "TechFest 202",
            event_date: "25-5-2025",
            location: "Bangalore, Karnataka, India (Remote)",
            skills: ["Python", "GitHub"],
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_techfest.jpg",
            description:
                "Good communication skills (must). Experience of complex crawling like captcha, recaptcha, and bypassing proxy.",
        },
        {
            id: 2,
            event_name: "TechFest 203",
            event_date: "20-7-2025",
            location: "Menlo Park, California, United States (Remote)",
            skills: ["React", "JavaScript"],
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_techfest.jpg",
            description: "Experience with React and JavaScript. Strong problem-solving skills.",
        },
    ]);

    const [editingEventId, setEditingEventId] = useState(null);
    const [editedEvent, setEditedEvent] = useState(null);
    const [preview, setPreview] = useState(null);
    const [skillInput, setSkillInput] = useState("");
    const [viewingEvent, setViewingEvent] = useState(null);

    const fileInputRef = useRef(null);

    const handleEditEvent = (event) => {
        setEditingEventId(event.id);
        setEditedEvent({ ...event });
        setPreview(event.logo);
        setViewingEvent(null);
    };

    const handleViewEventDetails = (event) => {
        setViewingEvent(event);
        setEditingEventId(null);
    };

    const handleAddSkill = () => {
        if (skillInput.trim() && !editedEvent.skills.includes(skillInput.trim())) {
            setEditedEvent({ ...editedEvent, skills: [...editedEvent.skills, skillInput.trim()] });
            setSkillInput("");
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setEditedEvent({
            ...editedEvent,
            skills: editedEvent.skills.filter((skill) => skill !== skillToRemove),
        });
    };

    const handleInputChange = (e) => {
        setEditedEvent({ ...editedEvent, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        setEvents(events.map((evt) => (evt.id === editingEventId ? editedEvent : evt)));
        setEditingEventId(null);
        setEditedEvent(null);
        setPreview(null);
    };

    return (
        <Box p={6} bg="gray.100">
            <Heading size="lg" mb={4} color="pink.700">
                My Events
            </Heading>
            {events.map((event) => (
                <Box key={event.id} p={6} mb={4} boxShadow="lg" borderRadius="md" bg="white">
                    <Stack direction={{ base: "column", md: "row" }} align={{ base: "center", md: "flex-start" }} spacing={4}>
                        <Image
                            src={event.logo}
                            alt="Event Logo"
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
                            <Button colorScheme="blue" onClick={() => handleEditEvent(event)}>
                                Edit
                            </Button>

                            <DialogRoot>
                                <DialogTrigger asChild>
                                    <Button colorScheme="teal" onClick={() => handleViewEventDetails(event)}>
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
                                            <Image src={viewingEvent.logo} alt="Event Logo" boxSize="100px" borderRadius="md" mt={2} />
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

                    {editingEventId === event.id && (
                        <Box mt={4} p={4} border="1px solid gray" borderRadius="md" bg="gray.50">
                            <Heading size="md">Edit Event</Heading>
                            <VStack spacing={3} mt={3} align="stretch">
                                <Input
                                    name="event_name"
                                    placeholder="Event Name"
                                    value={editedEvent.event_name}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    name="event_date"
                                    placeholder="Event Date"
                                    value={editedEvent.event_date}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    name="location"
                                    placeholder="Event Location"
                                    value={editedEvent.location}
                                    onChange={handleInputChange}
                                />
                                <Textarea
                                    name="description"
                                    placeholder="Event Description"
                                    value={editedEvent.description}
                                    onChange={handleInputChange}
                                />
                                <Input type="file" onChange={handleFileChange} mb={2} />
                                <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} hidden />

                                <Button width="100%" colorScheme="blue" onClick={() => fileInputRef.current.click()}>
                                    Change Logo
                                </Button>

                                {preview && (
                                    <Image
                                        src={preview}
                                        alt="Event Logo"
                                        boxSize="100px"
                                        objectFit="contain"
                                        borderRadius="md"
                                        mt={2}
                                    />
                                )}

                                <HStack>
                                    <Input
                                        placeholder="Add Skill"
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                                    />
                                    <Button size="sm" colorScheme="blue" onClick={handleAddSkill}>
                                        Add
                                    </Button>
                                </HStack>
                                <HStack wrap="wrap">
                                    {editedEvent.skills.map((skill, index) => (
                                        <Badge
                                            key={index}
                                            colorScheme="purple"
                                            cursor="pointer"
                                            onClick={() => handleRemoveSkill(skill)}
                                        >
                                            {skill} ❌
                                        </Badge>
                                    ))}
                                </HStack>

                                <HStack spacing={2}>
                                    <Button colorScheme="green" onClick={handleSave}>
                                        Save
                                    </Button>
                                    <Button colorScheme="red" onClick={() => setEditingEventId(null)}>
                                        Cancel
                                    </Button>
                                </HStack>
                            </VStack>
                        </Box>
                    )}
                </Box>
            ))}
        </Box>
    );
};

export default MyEvents;
