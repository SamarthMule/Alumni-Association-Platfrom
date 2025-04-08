// AllEvents.jsx (Search, Filtering & View Details)
import React, { useState, useEffect } from "react";
import { Box, Button, Text, HStack, Badge, Stack, Image, Input, Card } from "@chakra-ui/react";
import axios from "axios";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ location: "", date: "" });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const user = JSON.parse(localStorage.getItem("user")); // Parse user object
  const userId = user?._id; // Extract user ID

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/v1/events", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setEvents(response.data.events || []);
    } catch (error) {
      console.error("Error fetching events", error);
    } finally {
      setLoading(false);
    }
  };

  const handleParticipate = async (eventId) => {
    try {
      await axios.post(`/api/v1/events/${eventId}/participate`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      fetchEvents(); // Refresh events to update participant count
    } catch (error) {
      if (error.response?.data?.message === "User already registered") {
        alert("You have already participated in this event.");
      } else {
        console.error("Error participating in event", error.response?.data || error.message);
      }
    }
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
  };

  // **Filtering Logic**
  const filteredEvents = events.filter((event) => {
    const eventTitle = event.title ? event.title.toLowerCase() : "";
    const eventLocation = event.location ? event.location.toLowerCase() : "";
    const eventDate = event.date ? event.date : "";

    return (
      eventTitle.includes(searchTerm.toLowerCase()) &&
      (!filters.location || eventLocation.includes(filters.location.toLowerCase())) &&
      (!filters.date || eventDate === filters.date)
    );
  });

  return (
    <Box p={6} >
      <Text fontSize="2xl" fontWeight="bold" mb={4} color="pink.700">All Events</Text>
      
      {/* Search and Filter Inputs */}
      <HStack mb={4} spacing={4}>
        <Input placeholder="Search events..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Input placeholder="Filter by Location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
        <Input type="date" placeholder="Filter by Date" value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })} />
      </HStack>
      
      {loading ? (
        <Text>Loading events...</Text>
      ) : (
        filteredEvents.map((event) => (
          <Card.Root key={event._id} p={4}  mb={3} borderRadius="md" shadow="md">
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Image src={event.banner} alt={event.title} width="100px" objectFit='contain' />
              <Box flex="1">
                <Text fontSize="lg" fontWeight="bold" color="pink.800">{event.title}</Text>
                <Text fontSize="sm" color="gray.500">
                  {new Date(event.date).toLocaleDateString("en-GB")} | {event.time} | {event.location}
                </Text>
                <Text fontSize="md">{event.description}</Text>
                <HStack>
                  <Badge colorScheme="green">Participants: {event.participants?.length || 0}</Badge>
                </HStack>
              </Box>
              <Button colorScheme="blue" onClick={() => handleParticipate(event._id)}
                isDisabled={event.participants?.some(participant => participant.toString() === userId)}>
                {event.participants?.some(participant => participant.toString() === userId) ? "Participated" : "Participate"}
              </Button>
              <Button colorScheme="gray" onClick={() => handleViewDetails(event)}>View Details</Button>
            </Stack>
          </Card.Root>
        ))
      )}
      
      {/* Centered Box for Event Details */}
      {selectedEvent && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          bg="white"
          p={6}
          borderRadius="md"
          boxShadow="lg"
          width={{ base: "90%", md: "50%" }}
          zIndex={1000}
        >
          <Text fontSize="xl" fontWeight="bold" mb={2}>{selectedEvent.title}</Text>
          <Text><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString("en-GB")}</Text>
          <Text><strong>Time:</strong> {selectedEvent.time}</Text>
          <Text><strong>Location:</strong> {selectedEvent.location}</Text>
          <Text><strong>Description:</strong> {selectedEvent.description}</Text>
          <Text><strong>Participants:</strong> {selectedEvent.participants.length}</Text>
          <Button mt={4} colorScheme="blue" onClick={() => setSelectedEvent(null)}>Close</Button>
        </Box>
      )}
    </Box>
  );
};

export default AllEvents;