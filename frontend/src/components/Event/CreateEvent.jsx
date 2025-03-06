import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  Heading,
  Image,
  HStack,
  // Flex,
  Badge
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { toaster } from "../ui/toaster";

const CreateEvent = () => {
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    banner: null, // Store banner image file
    speakers: [],
    participants: [],
    organized_by: [],
  });

  
  const [preview, setPreview] = useState(null); // Store preview image URL
  const [fileName, setFileName] = useState("Add Event Banner"); // Default text for button
  const [speakerInput, setSpeakerInput] = useState(""); // Temporary input for speakers
  const [participantInput, setParticipantInput] = useState(""); // Temporary input for participants
  const [organizerInput, setOrganizerInput] = useState(""); // Temporary input for organizers

  const fileInputRef = useRef(null); // Reference to file input

  useEffect(() => {
    // Handle any error logic here
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventDetails({ ...eventDetails, banner: file });

      // Generate image preview
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);

      // Update file name
      setFileName(file.name);
    }
  };

  // Handle adding speakers dynamically
  const handleAddSpeaker = () => {
    if (speakerInput.trim()) {
      setEventDetails({
        ...eventDetails,
        speakers: [...eventDetails.speakers, speakerInput.trim()],
      });
      setSpeakerInput("");
    }
  };

  // Handle adding participants dynamically
  const handleAddParticipant = () => {
    if (participantInput.trim()) {
      setEventDetails({
        ...eventDetails,
        participants: [...eventDetails.participants, participantInput.trim()],
      });
      setParticipantInput("");
    }
  };

  // Handle adding organizers dynamically
  const handleAddOrganizer = () => {
    if (organizerInput.trim()) {
      setEventDetails({
        ...eventDetails,
        organized_by: [...eventDetails.organized_by, organizerInput.trim()],
      });
      setOrganizerInput("");
    }
  };

  // Handle event submission
  const handleCreateEvent = () => {
    // You can integrate the createEvent function here (similar to createJob logic in the original code)

    // Mock response to simulate success
    const response = true;

    if (response) {
      toaster.create({
        type: "success",
        title: "Event Created Successfully",
      });
    }
  };

  return (
    <Box bg="white" p={6} mt={4} boxShadow="lg" borderRadius="md">
      <Heading size="md" mb={4} textAlign="center">
        Create an Event
      </Heading>
      <VStack spacing={4} align="stretch">
        <Input
          placeholder="Event Title"
          name="title"
          value={eventDetails.title}
          onChange={handleChange}
        />
        <Textarea
          placeholder="Event Description"
          name="description"
          value={eventDetails.description}
          onChange={handleChange}
        />
        <Input
          placeholder="Event Date"
          type="date"
          name="date"
          value={eventDetails.date}
          onChange={handleChange}
        />
        <Input
          placeholder="Event Time"
          type="time"
          name="time"
          value={eventDetails.time}
          onChange={handleChange}
        />
        <Input
          placeholder="Location"
          name="location"
          value={eventDetails.location}
          onChange={handleChange}
        />

        {/* Speakers Input */}
        <HStack>
          <Input
            placeholder="Add Speaker (User ID)"
            value={speakerInput}
            onChange={(e) => setSpeakerInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddSpeaker()}
          />
          <Button size="sm" colorScheme="blue" onClick={handleAddSpeaker}>
            Add Speaker
          </Button>
        </HStack>

        {/* Display Added Speakers */}
        <HStack wrap="wrap">
          {eventDetails.speakers.map((speaker, index) => (
            <Badge key={index} colorScheme="purple">
              {speaker}
            </Badge>
          ))}
        </HStack>

        {/* Participants Input */}
        <HStack>
          <Input
            placeholder="Add Participant (User ID)"
            value={participantInput}
            onChange={(e) => setParticipantInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddParticipant()}
          />
          <Button size="sm" colorScheme="blue" onClick={handleAddParticipant}>
            Add Participant
          </Button>
        </HStack>

        {/* Display Added Participants */}
        <HStack wrap="wrap">
          {eventDetails.participants.map((participant, index) => (
            <Badge key={index} colorScheme="green">
              {participant}
            </Badge>
          ))}
        </HStack>

        {/* Organizers Input */}
        <HStack>
          <Input
            placeholder="Add Organizer (User ID)"
            value={organizerInput}
            onChange={(e) => setOrganizerInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddOrganizer()}
          />
          <Button size="sm" colorScheme="blue" onClick={handleAddOrganizer}>
            Add Organizer
          </Button>
        </HStack>

        {/* Display Added Organizers */}
        <HStack wrap="wrap">
          {eventDetails.organized_by.map((organizer, index) => (
            <Badge key={index} colorScheme="red">
              {organizer}
            </Badge>
          ))}
        </HStack>

        {/* Hidden File Input for Banner */}
        <Input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          hidden
        />

        {/* Custom Button to Trigger File Input */}
        <Button
          width="100%"
          colorScheme="blue"
          backgroundColor="gray.300"
          color="purple.700"
          onClick={() => fileInputRef.current.click()}
        >
          {fileName}
        </Button>

        {/* Preview uploaded banner image */}
        {preview && (
          <Image
            src={preview}
            alt="Event Banner"
            boxSize="100px"
            objectFit="contain"
            borderRadius="md"
            mt={2}
          />
        )}

        <Button colorScheme="green" onClick={handleCreateEvent}>
          Submit Event
        </Button>
        <Button colorScheme="red" variant="outline">
          Cancel
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateEvent;
