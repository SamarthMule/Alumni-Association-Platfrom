import { useState, useEffect } from "react";
import { Box, Text, VStack, Spinner, Center, Button, Flex } from "@chakra-ui/react";
import axios from "axios";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    axios.get("/api/v1/admin/events")
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch events");
        setLoading(false);
      });
  }, []);

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`/api/v1/admin/events/${id}`);
      setEvents(events.filter(event => event._id !== id));
    } catch (error) {
      console.error("Error deleting event", error);
    }
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
  };

  if (loading) return <Center h="100vh"><Spinner size="xl" /></Center>;
  if (error) return <Center h="100vh"><Text color="red.500">{error}</Text></Center>;

  return (
    <Flex p={6} ml={{ base: "0", md: "250px" }} gap={8} direction={{ base: "column", md: "row" }}>
      <Box flex={1} bg="gray.50" p={6} borderRadius="lg" boxShadow="lg">
        <Text fontSize="3xl" fontWeight="bold" mb={6} textAlign="center" color="blue.600">Manage Events</Text>
        <VStack spacing={4} align="stretch">
          {events.length === 0 ? (
            <Text textAlign="center" fontSize="lg" color="gray.500">No events found.</Text>
          ) : (
            events.map(event => (
              <Flex key={event._id} p={4} borderWidth="1px" borderRadius="lg" w="100%" justifyContent="space-between" alignItems="center" bgGradient="linear(to-r, blue.50, teal.50)" _hover={{ bgGradient: "linear(to-r, blue.100, teal.100)" }}>
                <Box>
                  <Text fontSize="lg" fontWeight="bold" color="blue.700">{event.title}</Text>
                  <Text fontSize="sm" color="gray.700">{event.location}</Text>
                  <Text fontSize="sm" color="gray.600">Total Participants: {event.participants?.length || "N/A"}</Text>
                </Box>
                <Flex gap={2}>
                  <Button colorScheme="blue" size="sm" onClick={() => handleViewDetails(event)}>
                    View Details
                  </Button>
                  <Button colorScheme="red" size="sm" onClick={() => handleDeleteEvent(event._id)}>
                    Delete
                  </Button>
                </Flex>
              </Flex>
            ))
          )}
        </VStack>
      </Box>
      
      {selectedEvent && (
        <Box flex={0.7} p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg" >
          <Text fontSize="2xl" fontWeight="bold" mb={4} color="blue.700" textAlign="center">Event Details</Text>
          <Text fontSize="lg"><strong>Title:</strong> {selectedEvent.title}</Text>
          <Text fontSize="lg"><strong>Location:</strong> {selectedEvent.location}</Text>
          <Text fontSize="lg"><strong>Date:</strong> {selectedEvent.date}</Text>
          <Text fontSize="lg"><strong>Description:</strong> {selectedEvent.description}</Text>
          <Text fontSize="lg"><strong>Total Participants:</strong> {selectedEvent.participants?.length || "N/A"}</Text>
        </Box>
      )}
    </Flex>
  );
};

export default ManageEvents;
