import React, { useState, useEffect } from "react";
import { Box, Button, VStack, Text, HStack, Badge, Stack, Card } from "@chakra-ui/react";
import axios from "axios";

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [viewJob, setViewJob] = useState(null);

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) return;
    try {
      const response = await axios.get(`/api/v1/jobs/applied/${user._id}`);
      setAppliedJobs(response.data.jobs || []);
    } catch (error) {
      console.error("Error fetching applied jobs", error);
      setAppliedJobs([]);
    }
  };

  return (
    <Box p={6} >
      <Text fontSize="2xl" fontWeight="bold" mb={4} color="pink.700">Applied Jobs</Text>
      {Array.isArray(appliedJobs) && appliedJobs.length > 0 ? (
        appliedJobs.map((job) => (
          <Card.Root key={job._id} p={4}  mb={3} borderRadius="md" shadow="md">
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Box flex="1">
                <Text fontSize="lg" fontWeight="bold" color="pink.800">{job.title} - {job.company}</Text>
                <Text fontSize="sm" color="gray.500">{job.location}</Text>
                <HStack mt={2} wrap="wrap">{job.skillsRequired.map((skill, index) => <Badge key={index} colorScheme="purple">{skill}</Badge>)}</HStack>
              </Box>
              <HStack>
                <Button colorScheme="teal" onClick={() => setViewJob(job)}>View Details</Button>
              </HStack>
            </Stack>
          </Card.Root>
        ))
      ) : (
        <Text>No applied jobs found</Text>
      )}

      {viewJob && (
        <Box p={6}  borderRadius="md" shadow="lg" position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)" width="50%" zIndex={1000}>
          <Text fontSize="xl" fontWeight="bold">{viewJob.title}</Text>
          <Text>{viewJob.company}</Text>
          <Text>{viewJob.location}</Text>
          <Text mt={3}>{viewJob.description}</Text>
          <HStack mt={3}>
            <Button colorScheme="red" onClick={() => setViewJob(null)}>Close</Button>
          </HStack>
        </Box>
      )}
    </Box>
  );
};

export default AppliedJobs;
