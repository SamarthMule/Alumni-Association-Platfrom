import { useState, useEffect } from "react";
import { 
  Box, Flex, Text, Button, Wrap, WrapItem, Spinner, Center, Grid, GridItem, VStack
} from "@chakra-ui/react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/api/v1/admin/stats")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch statistics");
        setLoading(false);
      });
  }, []);

  const statsItems = [
    { heading: "Total Users", subHeading: stats?.totalUsers || "N/A" },
    { heading: "Active Jobs", subHeading: stats?.activeJobs || "N/A" },
    { heading: "Events Organized", subHeading: stats?.eventsOrganized || "N/A" },
  ];

  if (loading) {
    return <Center h="100vh"><Spinner size="xl" /></Center>;
  }

  if (error) {
    return <Center h="100vh"><Text color="red.500" fontSize="xl" fontWeight="bold">{error}</Text></Center>;
  }

  return (
    <Box borderRadius="lg" p={6} my={6} boxShadow="lg" bgGradient="linear(to-r, purple.50, blue.50)">
      <Flex justify="space-between" align="center" mb={4} flexWrap="wrap">
        <Text fontSize="xl" fontWeight="bold" color="purple.700">
          Admin Dashboard
        </Text>
        <Button
          size="md"
          colorScheme="purple"
          variant="solid"
          borderRadius="md"
          _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
        >
          Refresh Data
        </Button>
      </Flex>
      <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={6}>
        {/* Statistics Cards */}
        <GridItem>
          <Wrap spacing={6} justify="center">
            {statsItems.map((item, index) => (
              <WrapItem key={index} flexBasis={{ base: "100%", sm: "48%", md: "30%" }} minWidth="250px">
                <Box
                  bg="purple.600"
                  color="white"
                  p={5}
                  borderRadius="lg"
                  textAlign="center"
                  boxShadow="md"
                  w="full"
                  transition="transform 0.3s ease"
                  _hover={{ transform: "scale(1.05)" }}
                >
                  <Text fontSize="lg" fontWeight="bold">{item.heading}</Text>
                  <Text fontSize="sm" opacity={0.9}>{item.subHeading}</Text>
                </Box>
              </WrapItem>
            ))}
          </Wrap>
        </GridItem>
        
        {/* Recent Activities */}
        {/* <GridItem>
          <VStack spacing={4} align="stretch" p={4}  borderRadius="lg" boxShadow="md">
            <Text fontSize="lg" fontWeight="bold" color="purple.700">Recent Activities</Text>
            <Text fontSize="md" color="gray.700">- 5 new job postings added today</Text>
            <Text fontSize="md" color="gray.700">- 10 new users registered this week</Text>
            <Text fontSize="md" color="gray.700">- 2 events scheduled for next month</Text>
          </VStack>
        </GridItem> */}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;