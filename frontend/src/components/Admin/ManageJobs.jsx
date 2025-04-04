import { useState, useEffect } from "react";
import { Box, Text, Button, VStack, Flex } from "@chakra-ui/react";
import axios from "axios";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    axios.get("/api/v1/admin/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/api/v1/admin/jobs/${id}`);
    setJobs(jobs.filter(job => job._id !== id));
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job);
  };

  return (
    <Flex p={6} ml={{ base: "0", md: "250px" }} gap={8} direction={{ base: "column", md: "row" }}>
      <Box flex={1} bg="gray.50" p={6} borderRadius="lg" boxShadow="lg">
        <Text fontSize="3xl" fontWeight="bold" mb={6} textAlign="center" color="teal.600">Manage Jobs</Text>
        <VStack spacing={4} align="stretch">
          {jobs.length === 0 ? (
            <Text textAlign="center" fontSize="lg" color="gray.500">No jobs found.</Text>
          ) : (
            jobs.map(job => (
              <Flex key={job._id} p={4} borderWidth="1px" borderRadius="lg" w="100%" justifyContent="space-between" alignItems="center" bgGradient="linear(to-r, teal.50, blue.50)" _hover={{ bgGradient: "linear(to-r, teal.100, blue.100)" }}>
                <Box>
                  <Text fontSize="lg" fontWeight="bold" color="teal.700">{job.title}</Text>
                  <Text fontSize="sm" color="gray.700">{job.company}</Text>
                </Box>
                <Flex gap={2}>
                  <Button colorScheme="blue" size="sm" onClick={() => handleViewDetails(job)}>
                    View Details
                  </Button>
                  <Button colorScheme="red" size="sm" onClick={() => handleDelete(job._id)}>
                    Delete
                  </Button>
                </Flex>
              </Flex>
            ))
          )}
        </VStack>
      </Box>
      
      {selectedJob && (
        <Box flex={0.7} p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg" >
          <Text fontSize="2xl" fontWeight="bold" mb={4} color="teal.700" textAlign="center">Job Details</Text>
          <Text fontSize="lg"><strong>Title:</strong> {selectedJob.title}</Text>
          <Text fontSize="lg"><strong>Company:</strong> {selectedJob.company}</Text>
          <Text fontSize="lg"><strong>Description:</strong> {selectedJob.description}</Text>
          <Text fontSize="lg"><strong>Location:</strong> {selectedJob.location}</Text>
          <Text fontSize="lg"><strong>Salary:</strong> {selectedJob.salary}</Text>
        </Box>
      )}
    </Flex>
  );
};

export default ManageJobs;