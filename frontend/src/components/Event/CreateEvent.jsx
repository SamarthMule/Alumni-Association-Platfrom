// CreateEvent.jsx (Without Speakers - Fixed Date Format)
import React, { useState } from "react";
import { Box, Button, Input, Textarea, VStack, Heading } from "@chakra-ui/react";
import axios from "axios";

const CreateEvent = () => {
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: ""
  });

  const handleChange = (e) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };

  const handleCreateEvent = async () => {
    try {
      const formattedDate = new Date(eventDetails.date).toISOString().split("T")[0]; // Format date properly
      const eventData = { ...eventDetails, date: formattedDate };

      await axios.post("/api/v1/events", eventData, {
        headers: { "Content-Type": "application/json" }
      });
      alert("Event created successfully!");
    } catch (error) {
      console.error("Error creating event", error.response?.data || error.message);
    }
  };

  return (
    <Box p={6} bg="white" borderRadius="md" boxShadow="md">
      <Heading size="md" mb={4}>Create Event</Heading>
      <VStack spacing={4} align="stretch">
        <Input placeholder="Event Title" name="title" value={eventDetails.title} onChange={handleChange} />
        <Textarea placeholder="Description" name="description" value={eventDetails.description} onChange={handleChange} />
        <Input type="date" name="date" value={eventDetails.date} onChange={handleChange} />
        <Input type="time" name="time" value={eventDetails.time} onChange={handleChange} />
        <Input placeholder="Location" name="location" value={eventDetails.location} onChange={handleChange} />
        <Button colorScheme="blue" onClick={handleCreateEvent}>Create Event</Button>
      </VStack>
    </Box>
  );
};

export default CreateEvent;
