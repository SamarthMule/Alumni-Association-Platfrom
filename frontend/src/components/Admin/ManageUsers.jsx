import { useState, useEffect } from "react";
import { Box, Text, VStack, Spinner, Center, Button, Flex, Grid } from "@chakra-ui/react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios.get("/api/v1/admin/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch users");
        setLoading(false);
      });
  }, []);

  const handleViewProfile = (user) => {
    setSelectedUser(user);
  };

  if (loading) return <Center h="100vh"><Spinner size="xl" /></Center>;
  if (error) return <Center h="100vh"><Text color="red.500">{error}</Text></Center>;

  return (
    <Center h="100vh">
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8} w={{ base: "90%", md: "80%" }}>
        {/* Users List */}
        <Box p={6} bg="gray.50" borderRadius="lg" boxShadow="lg" overflowY="auto" maxH="80vh">
          <Text fontSize="3xl" fontWeight="bold" mb={6} textAlign="center" color="blue.600">Manage Users</Text>
          <VStack spacing={4} align="stretch">
            {users.length === 0 ? (
              <Text textAlign="center" fontSize="lg" color="gray.500">No users found.</Text>
            ) : (
              users.map(user => (
                <Flex key={user._id} p={4} borderWidth="1px" borderRadius="lg" w="100%" justifyContent="space-between" alignItems="center" bgGradient="linear(to-r, purple.50, blue.50)" _hover={{ bgGradient: "linear(to-r, purple.100, blue.100)" }}>
                  <Box>
                    <Text fontSize="lg" fontWeight="bold" color="purple.700">{user.name}</Text>
                    <Text fontSize="sm" color="gray.700">{user.email}</Text>
                  </Box>
                  <Button colorScheme="blue" onClick={() => handleViewProfile(user)}>
                    View Profile
                  </Button>
                </Flex>
              ))
            )}
          </VStack>
        </Box>
        
        {/* Centered Profile Box */}
        <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="white" maxW="500px" w="100%" display={selectedUser ? "block" : "none"}>
          {selectedUser ? (
            <>
              <Text fontSize="2xl" fontWeight="bold" mb={4} color="purple.700" textAlign="center">User Profile</Text>
              <Text fontSize="lg"><strong>Name:</strong> {selectedUser.name}</Text>
              <Text fontSize="lg"><strong>Email:</strong> {selectedUser.email}</Text>
              <Text fontSize="lg"><strong>Role:</strong> {selectedUser.role}</Text>
              <Text fontSize="lg"><strong>Status:</strong> {selectedUser.blocked ? "Blocked" : "Active"}</Text>
            </>
          ) : (
            <Text fontSize="lg" color="gray.500" textAlign="center">Select a user to view their profile</Text>
          )}
        </Box>
      </Grid>
    </Center>
  );
};

export default ManageUsers;