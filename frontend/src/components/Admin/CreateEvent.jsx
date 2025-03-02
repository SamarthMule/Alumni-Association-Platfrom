import { Box, Button, Input, Textarea, VStack, Heading, Image, Badge, HStack } from "@chakra-ui/react";
import { useState, useRef } from "react";

const CreateEvent = ({ onClose }) => {
  const [eventDetails, setEventDetails] = useState({
    event_name: "",
    event_date: "",
    location: "",
    skills: [],
    description: "",
    logo: null,
  });

  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("Add Event Logo");
  const [skillInput, setSkillInput] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventDetails({ ...eventDetails, logo: file });
      setPreview(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !eventDetails.skills.includes(skillInput.trim())) {
      setEventDetails({
        ...eventDetails,
        skills: [...eventDetails.skills, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  const handleCreateEvent = () => {
    console.log("Event Created:", eventDetails);
    onClose();
  };

  return (
    <Box bg="white" p={6} mt={4} boxShadow="lg" borderRadius="md">
      <Heading size="md" mb={4} textAlign="center">
        Create an Event
      </Heading>
      <VStack spacing={4} align="stretch">
        <Input
          placeholder="Event Name"
          name="event_name"
          value={eventDetails.event_name}
          onChange={handleChange}
        />
        <Input
          placeholder="Event Date"
          name="event_date"
          value={eventDetails.event_date}
          onChange={handleChange}
        />
        <Input
          placeholder="Location"
          name="location"
          value={eventDetails.location}
          onChange={handleChange}
        />

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
          {eventDetails.skills.map((skill, index) => (
            <Badge key={index} colorScheme="purple">
              {skill}
            </Badge>
          ))}
        </HStack>

        <Textarea
          placeholder="Event Description"
          name="description"
          value={eventDetails.description}
          onChange={handleChange}
        />

        <Input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          hidden
        />
        <Button
          width="100%"
          colorScheme="blue"
          backgroundColor="gray.300"
          color="purple.700"
          onClick={() => fileInputRef.current.click()}
        >
          {fileName}
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

        <Button colorScheme="green" onClick={handleCreateEvent}>
          Submit Event
        </Button>
        <Button colorScheme="red" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateEvent;