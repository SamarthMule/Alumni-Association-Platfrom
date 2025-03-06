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
import { useState } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogRoot,
} from "../ui/dialog";
// import useEvents from "../../hooks/useEvents";
import { toaster } from "../ui/toaster";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";

const AllEvents = () => {
  const [viewingEvent, setViewingEvent] = useState(null);
  // const { events, getEventById, error, loading, fetchEvents } = useEvents();
  const [eventsLoading, setEventsLoading] = useState(false);
  const [isEventDetailsLoading, setIsEventDetailsLoading] = useState(false);
  const events = [
    {
      _id: "1",
      title: "Annual Alumni Meet",
      location: "New York",
      date: "2023-12-25",
      time: "18:00",
      banner: "https://via.placeholder.com/150",
      description: "Join us for the annual alumni meet.",
      speakers: [{ _id: "s1", name: "John Doe" }],
      participants: [{ _id: "p1", name: "Jane Smith" }],
    },
    {
      _id: "2",
      title: "Tech Conference",
      location: "San Francisco",
      date: "2023-11-15",
      time: "09:00",
      banner: "https://via.placeholder.com/150",
      description: "A conference on the latest in tech.",
      speakers: [{ _id: "s2", name: "Alice Johnson" }],
      participants: [{ _id: "p2", name: "Bob Brown" }],
    },
    {
      _id: "3",
      title: "Networking Event",
      location: "Chicago",
      date: "2023-10-10",
      time: "17:00",
      banner: "https://via.placeholder.com/150",
      description: "An event to network with fellow alumni.",
      speakers: [{ _id: "s3", name: "Charlie Davis" }],
      participants: [{ _id: "p3", name: "Diana Green" }],
    },
    {
      _id: "4",
      title: "Career Fair",
      location: "Los Angeles",
      date: "2023-09-20",
      time: "10:00",
      banner: "https://via.placeholder.com/150",
      description: "Explore career opportunities.",
      speakers: [{ _id: "s4", name: "Eve White" }],
      participants: [{ _id: "p4", name: "Frank Black" }],
    },
    {
      _id: "5",
      title: "Workshop on AI",
      location: "Boston",
      date: "2023-08-30",
      time: "14:00",
      banner: "https://via.placeholder.com/150",
      description: "A workshop on artificial intelligence.",
      speakers: [{ _id: "s5", name: "Grace Lee" }],
      participants: [{ _id: "p5", name: "Henry King" }],
    },
  ];

  const handleViewDetails = async (id) => {
    // viewingEvent && setViewingEvent(null);
    // const eventDetails = await getEventById(id);
    // eventDetails && setViewingEvent(eventDetails);
    setViewingEvent(events.find((event) => event._id === id));
  };

  useEffect(() => {
    // fetchEvents();
  }, []);

  // useEffect(() => {
  //   if (error.length > 0) {
  //     error.forEach((err) => {
  //       toaster.create({ type: "error", title: err.message });
  //     });
  //   }
  // }, [error]);

  // useEffect(() => {
  //   // Events
  //   if (loading.some((load) => load.id === "fetchEvents" && load.value)) {
  //     setEventsLoading(true);
  //   } else {
  //     setEventsLoading(false);
  //   }

  //   // Event Details
  //   if (loading.some((load) => load.id === "getEventById" && load.value)) {
  //     setIsEventDetailsLoading(true);
  //   } else {
  //     setIsEventDetailsLoading(false);
  //   }
  // }, [loading]);

  return (
    <Box p={6} bg="gray.100">
      <Heading size="lg" mb={4} color="pink.700">
        All Events
      </Heading>
      {!eventsLoading &&
        events &&
        events.length > 0 &&
        events.map((event) => (
          <Box
            key={event._id}
            p={6}
            mb={4}
            boxShadow="lg"
            borderRadius="md"
            bg="white"
          >
            <Stack
              direction={{ base: "column", md: "row" }}
              align={{ base: "center", md: "flex-start" }}
              spacing={4}
            >
              <Image
                src={event.banner}
                alt="Event Banner"
                boxSize={{ base: "80px", md: "50px" }}
                objectFit="contain"
                borderRadius="md"
              />
              <Box flex="1" textAlign={{ base: "center", md: "left" }}>
                <Text fontSize="lg" fontWeight="bold" color="pink.800">
                  {event.title}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Location: {event.location}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Date: {new Date(event.date).toLocaleDateString()} | Time:{" "}
                  {event.time}
                </Text>
                <HStack
                  mt={2}
                  justify={{ base: "center", md: "flex-start" }}
                  wrap="wrap"
                >
                  {event.speakers.map((speaker, index) => (
                    <Badge key={index} colorScheme="purple">
                      Speaker: {speaker.name}
                    </Badge>
                  ))}
                </HStack>
              </Box>

              <DialogRoot>
                <DialogTrigger asChild>
                  <Button
                    colorScheme="teal"
                    onClick={() => handleViewDetails(event._id)}
                  >
                    View Details
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  { viewingEvent ? (
                    <>
                      <DialogHeader>
                        <DialogCloseTrigger asChild>
                          <Button
                            colorPalette="red"
                            onClick={() => setViewingEvent(null)}
                          >
                            Close
                          </Button>
                        </DialogCloseTrigger>
                        <DialogTitle>{viewingEvent.title}</DialogTitle>
                      </DialogHeader>
                      <DialogBody>
                        <Text fontSize="md">{viewingEvent.description}</Text>
                        <Text fontSize="sm" color="gray.500">
                          Location: {viewingEvent.location}
                        </Text>
                        <Image
                          src={viewingEvent.banner}
                          alt="Event Banner"
                          boxSize="100px"
                          borderRadius="md"
                          mt={2}
                        />
                        <Text mt={2}>{viewingEvent.description}</Text>
                        <Text mt={2} fontWeight="bold">
                          Speakers:
                        </Text>
                        {viewingEvent.speakers.map((speaker) => (
                          <Text key={speaker._id}>{speaker.name}</Text>
                        ))}
                        <Text mt={2} fontWeight="bold">
                          Participants:
                        </Text>
                        {viewingEvent.participants.map((participant) => (
                          <Text key={participant._id}>{participant.name}</Text>
                        ))}
                      </DialogBody>
                    </>
                  ) : (
                    <DialogBody
                      display="grid"
                      placeItems="center"
                      height="300px"
                      gap={3}
                    >
                      <Skeleton height="20px" w="full" />
                      <Skeleton height="20px" w="full" />
                      <Skeleton height="20px" w="full" />
                      <Skeleton height="20px" w="full" />
                      <Skeleton height="20px" w="full" />
                    </DialogBody>
                  )}
                </DialogContent>
              </DialogRoot>
            </Stack>
          </Box>
        ))}
      {eventsLoading &&
        Array.from({ length: 5 }).map((_, index) => (
          <Box
            key={index}
            p={6}
            mb={4}
            boxShadow="lg"
            borderRadius="md"
            bg="white"
          >
            <Stack
              direction={{ base: "column", md: "row" }}
              align={{ base: "center", md: "flex-start" }}
              spacing={4}
            >
              <Skeleton height="80px" width="80px" />
              <Box flex="1">
                <Skeleton height="20px" width="100px" />
                <Skeleton height="20px" width="200px" />
                <Skeleton height="20px" width="150px" />
                <Skeleton height="20px" width="100px" />
              </Box>
            </Stack>
          </Box>
        ))}
    </Box>
  );
};

export default AllEvents;
