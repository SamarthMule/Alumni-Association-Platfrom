import React, { useState, useEffect } from "react";
import { Box, Input, Button, VStack, Text, HStack, Badge, Stack, Card } from "@chakra-ui/react";
import axios from "axios";
import useColorTheme from "../../hooks/useColorTheme";

const FindJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ location: "", company: "", skills: "" });
  const [applyJobId, setApplyJobId] = useState(null);
  const [viewJob, setViewJob] = useState(null);
  const [applicantDetails, setApplicantDetails] = useState({ name: "", resume: "", coverLetter: "" });
  const [appliedJobs, setAppliedJobs] = useState([]);
  
  

  useEffect(() => {
    fetchJobs();
    fetchAppliedJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("/api/v1/jobs", {
        params: { page: 1, limit: 10 }
      });
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs", error);
      setJobs([]);
    }
  };

  const fetchAppliedJobs = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) return;
    try {
      const response = await axios.get(`/api/v1/jobs/applied/${user._id}`);
      setAppliedJobs(response.data.jobs.map(job => job._id));
    } catch (error) {
      console.error("Error fetching applied jobs", error);
    }
  };

  const handleApply = async (jobId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
        alert("Please log in to apply for jobs.");
        return;
      }
  
      const applicationData = {
        jobId, // Ensure jobId is sent in the request body
        userId: user._id,
        name: applicantDetails.name,
        resume: applicantDetails.resume,
        coverLetter: applicantDetails.coverLetter,
      };
  
      await axios.post(`/api/v1/jobs/apply`, applicationData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
  
      alert("Application submitted successfully!");
      setApplyJobId(null);
      fetchAppliedJobs(); // Refresh applied jobs list
    } catch (error) {
      console.error("Error applying for job", error.response?.data || error.message);
      alert("Failed to apply for the job. Please try again.");
    }
  };
  

  // **Filtering Logic**
  const filteredJobs = jobs.filter((job) => {
    const jobTitle = job.title ? job.title.toLowerCase() : "";
    const jobLocation = job.location ? job.location.toLowerCase() : "";
    const jobCompany = job.company ? job.company.toLowerCase() : "";
    const jobSkills = job.skillsRequired ? job.skillsRequired.map(skill => skill.toLowerCase()) : [];

    return (
      jobTitle.includes(searchTerm.toLowerCase()) &&
      (!filters.location || jobLocation.includes(filters.location.toLowerCase())) &&
      (!filters.company || jobCompany.includes(filters.company.toLowerCase())) &&
      (!filters.skills || jobSkills.some(skill => skill.includes(filters.skills.toLowerCase())))
    );
  });

  return (
    <Box p={6} >
      <Text fontSize="2xl" fontWeight="bold" mb={4} color="pink.700">Find Jobs</Text>
      <HStack mb={4} spacing={4}>
        <Input placeholder="Search jobs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Input placeholder="Filter by Location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
        <Input placeholder="Filter by Company" value={filters.company} onChange={(e) => setFilters({ ...filters, company: e.target.value })} />
        <Input placeholder="Filter by Skills" value={filters.skills} onChange={(e) => setFilters({ ...filters, skills: e.target.value })} />
      </HStack>

      {Array.isArray(filteredJobs) && filteredJobs.length > 0 ? (
        filteredJobs.map((job) => (
          <Card.Root key={job._id} p={4}  mb={3} borderRadius="md" shadow="md">
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Box flex="1">
                <Text fontSize="lg" fontWeight="bold" color="pink.800">{job.title} - {job.company}</Text>
                <Text fontSize="sm" color="gray.500">{job.location}</Text>
                <HStack mt={2} wrap="wrap">{job.skillsRequired.map((skill, index) => <Badge key={index} colorScheme="purple">{skill}</Badge>)}</HStack>
              </Box>
              <HStack>
                <Button colorScheme="teal" onClick={() => setViewJob(job)}>View Details</Button>
                <Button colorScheme="blue" onClick={() => setApplyJobId(job._id)}>Apply</Button>
              </HStack>
            </Stack>
          </Card.Root>
        ))
      ) : (
        <Text>No jobs available</Text>
      )}

      {applyJobId && (
        <Card.Root p={6}  borderRadius="md" shadow="lg" position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)" width="50%" zIndex={1000}>
          <Text fontSize="xl" fontWeight="bold">Apply for Job</Text>
          <Input placeholder="Full Name" onChange={(e) => setApplicantDetails({ ...applicantDetails, name: e.target.value })} />
          <Input placeholder="Resume Link" onChange={(e) => setApplicantDetails({ ...applicantDetails, resume: e.target.value })} />
          <Input placeholder="Cover Letter" onChange={(e) => setApplicantDetails({ ...applicantDetails, coverLetter: e.target.value })} />
          <HStack mt={3}>
            <Button colorScheme="green" onClick={() => handleApply(applyJobId)}>Submit Application</Button>
            <Button colorScheme="red" onClick={() => setApplyJobId(null)}>Cancel</Button>
          </HStack>
        </Card.Root>
      )}

      {viewJob && (
        <Card.Root p={6}  borderRadius="md" shadow="lg" position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)" width="50%" zIndex={1000}>
          <Text fontSize="xl" fontWeight="bold">{viewJob.title}</Text>
          <Text>{viewJob.company}</Text>
          <Text>{viewJob.location}</Text>
          <Text mt={3}>{viewJob.description}</Text>
          <HStack mt={3}>
            <Button colorScheme="red" onClick={() => setViewJob(null)}>Close</Button>
          </HStack>
        </Card.Root>
      )}
    </Box>
  );
};

export default FindJobs;
