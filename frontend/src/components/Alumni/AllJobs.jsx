import {
  Flex,
  Badge,
  Box,
  Button,
  HStack,
  Image,
  Text,
  Heading,
  Input,
  Textarea,
  VStack,
  Stack,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogRoot,
} from "../ui/dialog";
import useJobs from "../../hooks/useJobs";
import { toaster } from "../ui/toaster";
import { Skeleton } from "../ui/skeleton";

const AllJobs = () => {
  const [editingJobId, setEditingJobId] = useState(null);
  const [editedJob, setEditedJob] = useState(null);
  const [preview, setPreview] = useState(null);
  const [skillInput, setSkillInput] = useState("");
  const [viewingJob, setViewingJob] = useState(null);
  const { jobs, getJobById, error, loading, fetchJobs } = useJobs();
  const [jobsLoading, setJobsLoading] = useState(false);
  const [isJDLoading, setIsJDLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ location: "", skills: "" });

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (error.length > 0) {
      error.forEach((err) => {
        toaster.create({ type: "error", title: err.message });
      });
    }
  }, [error]);

  useEffect(() => {
    if (loading.some((load) => load.id === "fetchJobs" && load.value)) {
      setJobsLoading(true);
    } else {
      setJobsLoading(false);
    }
    if (loading.some((load) => load.id === "getJobById" && load.value)) {
      setIsJDLoading(true);
    } else {
      setIsJDLoading(false);
    }
  }, [loading]);

  const handleViewDetails = async (id) => {
    viewingJob && setViewingJob(null);
    const jobDetails = await getJobById(id);
    jobDetails && setViewingJob(jobDetails);
    setEditingJobId(null);
  };

  // **Filtering Logic**
  const filteredJobs = jobs.filter((job) => {
    const jobTitle = job.title ? job.title.toLowerCase() : "";
    const jobLocation = job.location ? job.location.toLowerCase() : "";
    const jobSkills = job.skillsRequired ? job.skillsRequired.map(skill => skill.toLowerCase()) : [];

    return (
      jobTitle.includes(searchTerm.toLowerCase()) &&
      (!filters.location || jobLocation.includes(filters.location.toLowerCase())) &&
      (!filters.skills || jobSkills.some(skill => skill.includes(filters.skills.toLowerCase())))
    );
  });

  return (
    <Box p={6} >
      <Heading size="lg" mb={4} color="pink.700">My Jobs</Heading>
      
      {/* Search and Filter Inputs */}
      <HStack mb={4} spacing={4}>
        <Input placeholder="Search jobs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Input placeholder="Filter by Location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
        <Input placeholder="Filter by Skills" value={filters.skills} onChange={(e) => setFilters({ ...filters, skills: e.target.value })} />
      </HStack>

      {!jobsLoading && filteredJobs.length > 0 && filteredJobs.map((job) => (
        <Box key={job.id} p={6} mb={4} boxShadow="lg" borderRadius="md" >
          <Stack direction={{ base: "column", md: "row" }} align={{ base: "center", md: "flex-start" }} spacing={4}>
            <Image src={job.logo} alt="Company Logo" boxSize={{ base: "80px", md: "50px" }} objectFit="contain" borderRadius="md" />
            <Box flex="1" textAlign={{ base: "center", md: "left" }}>
              <Text fontSize="lg" fontWeight="bold" color="pink.800">Role: {job.title}</Text>
              <Text fontSize="lg" fontWeight="bold" color="pink.800">{job.company}</Text>
              <Text fontSize="sm" color="gray.500">{job.location}</Text>
              <HStack mt={2} justify={{ base: "center", md: "flex-start" }} wrap="wrap">
                {job.skillsRequired.map((skill, index) => (
                  <Badge key={index} colorScheme="purple">{skill}</Badge>
                ))}
              </HStack>
            </Box>
            <DialogRoot>
              <DialogTrigger asChild>
                <Button colorScheme="teal" onClick={() => handleViewDetails(job._id)}>View Details</Button>
              </DialogTrigger>
            </DialogRoot>
          </Stack>
        </Box>
      ))}
      {jobsLoading && Array.from({ length: 5 }).map((_, index) => (
        <Box key={index} p={6} mb={4} boxShadow="lg" borderRadius="md" >
          <Stack direction={{ base: "column", md: "row" }} align={{ base: "center", md: "flex-start" }} spacing={4}>
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

export default AllJobs;