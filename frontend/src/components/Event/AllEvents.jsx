// AllEvents.jsx (View Details in Centered Box)
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  HStack,
  Badge,
  Stack,
  Image,
  Dialog
} from "@chakra-ui/react";
import axios from "axios";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventData, setEventData] = useState(selectedEvent || {
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    banner: "",
  });
  


  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/v1/events");
      setEvents(response.data.events || []);
    } catch (error) {
      console.error("Error fetching events", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventDelete = async (eventId) => {
    try {
      await axios.delete(`/api/v1/events/${eventId}`);
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventId)
      );
    } catch (error) {
      console.error("Error deleting event", error);
    }
  };

  const handleEditEvent = async (eventId) => {
    try {
      const response = await axios.put(`/api/v1/events/${eventId}`, eventData);
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId ? response.data.event : event
        )
      );
      
      
    } catch (error) {
      console.error("Error updating event", error);
    }
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
  };

  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={4} color="pink.700">
        All Events
      </Text>
      {loading ? (
        <Text>Loading events...</Text>
      ) : (
        events.map((event) => (
          <Box key={event._id} p={4} mb={3} borderRadius="md" shadow="md">
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Image
                src={event.banner}
                alt={event.title}
                width="100px"
                objectFit="contain"
              />
              <Box flex="1">
                <Text fontSize="lg" fontWeight="bold" color="pink.800">
                  {event.title}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {new Date(event.date).toLocaleDateString("en-GB")} |{" "}
                  {event.time} | {event.location}
                </Text>
                <Text fontSize="md">{event.description}</Text>
                <HStack>
                  <Badge colorScheme="green">
                    Participants: {event.participants.length}
                  </Badge>
                </HStack>
              </Box>
              <Button
                colorScheme="blue"
                onClick={() => handleViewDetails(event)}
              >
                View Details
              </Button>
              <Dialog.Root>
                <Dialog.Trigger as={Button} colorPalette="teal" onClick={() => {
                  setEventData(event);
                  setSelectedEvent(event);
                }
                }>
                  Edit
                </Dialog.Trigger>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.CloseTrigger />
                    <Dialog.Header>
                      Edit Event
                    </Dialog.Header>
                    <Dialog.Body >
                      <Box as="form">
                        <Stack spacing={4}>
                          <Box>
                            <Text fontWeight="bold">Title</Text>
                            <input
                              type="text"
                              value={eventData.title}
                              onChange={(e) =>
                                setEventData({ ...eventData, title: e.target.value })
                              }
                              placeholder="Event Title"
                              style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
                            />
                          </Box>
                          <Box>
                            <Text fontWeight="bold">Date</Text>
                            <input
                              type="date"
                              value={eventData.date}
                              onChange={(e) =>
                                setEventData({ ...eventData, date: e.target.value })
                              }
                              style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
                            />
                          </Box>
                          <Box>
                            <Text fontWeight="bold">Time</Text>
                            <input
                              type="time"
                              value={eventData.time}
                              onChange={(e) =>
                                setEventData({ ...eventData, time: e.target.value })
                              }
                              style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
                            />
                          </Box>
                          <Box>
                            <Text fontWeight="bold">Location</Text>
                            <input
                              type="text"
                              value={eventData.location}
                              onChange={(e) =>
                                setEventData({ ...eventData, location: e.target.value })
                              }
                              placeholder="Event Location"
                              style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
                            />
                          </Box>
                          <Box>
                            <Text fontWeight="bold">Description</Text>
                            <textarea
                              value={eventData.description}
                              onChange={(e) =>
                                setEventData({ ...eventData, description: e.target.value })
                              }
                              placeholder="Event Description"
                              style={{
                                width: "100%",
                                padding: "8px",
                                borderRadius: "4px",
                                minHeight: "80px",
                              }}
                            />
                          </Box>
                          <Box>
                            <Text fontWeight="bold">Banner URL</Text>
                            <input
                              type="text"
                              value={eventData.banner}
                              onChange={(e) =>
                                setEventData({ ...eventData, banner: e.target.value })
                              }
                              placeholder="Banner Image URL"
                              style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
                            />
                          </Box>
                        </Stack>
                      </Box>
                    </Dialog.Body>
                    <Dialog.Footer >
                      <Button colorScheme="blue" mr={3} onClick={() => handleEditEvent(selectedEvent._id)}>
                        Save Changes
                      </Button>
                      <Button variant="ghost" onClick={() => setSelectedEvent(null)}>
                        Cancel
                      </Button>
                    </Dialog.Footer>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Dialog.Root>
              <Button
                colorScheme="red"
                onClick={() => handleEventDelete(event._id)}
                bg="red.700"
              >
                Delete Event
              </Button>
            </Stack>
          </Box>
        ))
      )}

      {/* Centered Box for Event Details */}
      {selectedEvent && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          bgColor="white"
          p={6}
          borderRadius="md"
          boxShadow="lg"
          width={{ base: "90%", md: "50%" }}
          zIndex={1000}
        >
          <HStack>
            <Box>
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                {selectedEvent.title}
              </Text>
              <Text>
                <strong>Date:</strong>{" "}
                {new Date(selectedEvent.date).toLocaleDateString("en-GB")}
              </Text>
              <Text>
                <strong>Time:</strong> {selectedEvent.time}
              </Text>
              <Text>
                <strong>Location:</strong> {selectedEvent.location}
              </Text>
              <Text>
                <strong>Description:</strong> {selectedEvent.description}
              </Text>
              <Text>
                <strong>Participants:</strong>{" "}
                {selectedEvent.participants.length}
              </Text>
            </Box>
            <Image
              src={selectedEvent.banner}
              alt={selectedEvent.title}
              w="200px"
              borderRadius="md"
              ml={4}
              objectFit="cover"
            />
          </HStack>
          <Button
            mt={4}
            colorScheme="blue"
            onClick={() => setSelectedEvent(null)}
          >
            Close
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AllEvents;
