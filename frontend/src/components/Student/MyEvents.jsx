// MyEvents.jsx (Fixed Participation Fetching + View Details Popup)
import React, { useState, useEffect } from "react";
import { Box, Text, Stack, Image, Badge, Button, Card } from "@chakra-ui/react";
import axios from "axios";

const MyEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const user = JSON.parse(localStorage.getItem("user")); // Ensure user data is parsed
    const userId = user?._id; // Extract user ID

    useEffect(() => {
        fetchMyEvents();
    }, []);

    const fetchMyEvents = async () => {
        try {
            console.log("Fetching participated events for user:", userId);
            const response = await axios.get("/api/v1/events/participated", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setEvents(response.data.events || []);
        } catch (error) {
            console.error("Error fetching participated events", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (event) => {
        setSelectedEvent(event);
    };

    return (
        <Box p={6} >
            <Text fontSize="2xl" fontWeight="bold" mb={4} color="pink.700">My Events</Text>
            {loading ? (
                <Text>Loading events...</Text>
            ) : (
                events.map((event) => (
                    <Card.Root key={event._id} p={4}  mb={3} borderRadius="md" shadow="md">
                        <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                            <Image src={event.banner} alt={event.title} boxSize="80px" />
                            <Box flex="1">
                                <Text fontSize="lg" fontWeight="bold" color="pink.800">{event.title}</Text>
                                <Text fontSize="sm" color="gray.500">
                                    {new Date(event.date).toLocaleDateString("en-GB")} | {event.time} | {event.location}
                                </Text>
                                <Text fontSize="md">{event.description}</Text>
                                <Badge colorScheme="green">Participants: {event.participants?.length || 0}</Badge>
                            </Box>
                            <Button colorScheme="blue" onClick={() => handleViewDetails(event)}>View Details</Button>
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

export default MyEvents;