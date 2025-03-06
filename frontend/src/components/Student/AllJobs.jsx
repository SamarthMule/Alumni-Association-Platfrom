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
import { useState, useRef } from "react";
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
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";

const FindJobs = () => {
  const [editingJobId, setEditingJobId] = useState(null);
  const [editedJob, setEditedJob] = useState(null);
  const [preview, setPreview] = useState(null);
  const [skillInput, setSkillInput] = useState("");
  const [viewingJob, setViewingJob] = useState(null);
  const { jobs, getJobById, error, loading,fetchJobs } = useJobs();
  const [jobsLoading, setJobsLoading] = useState(false);
  const [isJDLoading, setIsJDLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleViewDetails = async (id) => {
    viewingJob && setViewingJob(null);
    const jobDetails = await getJobById(id);
    jobDetails && setViewingJob(jobDetails);
    setEditingJobId(null);
  };

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
    // Jobs
    if (loading.some((load) => load.id === "fetchJobs" && load.value)) {
      setJobsLoading(true);
    } else {
      setJobsLoading(false);
    }

    // Job Details
    if (loading.some((load) => load.id === "getJobById" && load.value)) {
      setIsJDLoading(true);
    } else {
      setIsJDLoading(false);
    }
  }, [loading]);

  return (
    <Box p={6} bg="gray.100">
      <Heading size="lg" mb={4} color="pink.700">
       Find Jobs
      </Heading>
      {!jobsLoading &&
        jobs &&
        jobs.length > 0 &&
        jobs.map((job) => (
          <Box
            key={job.id}
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
                src={job.logo}
                alt="Company Logo"
                boxSize={{ base: "80px", md: "50px" }}
                objectFit="contain"
                borderRadius="md"
              />
              <Box flex="1" textAlign={{ base: "center", md: "left" }}>
              <Text fontSize="lg" fontWeight="bold" color="pink.800">
                  Role: {job.title}
                </Text>
                <Text fontSize="lg" fontWeight="bold" color="pink.800">
                  {job.company}
                </Text>
                
                <Text fontSize="sm" color="gray.500">
                  {job.location}
                </Text>
                <HStack
                  mt={2}
                  justify={{ base: "center", md: "flex-start" }}
                  wrap="wrap"
                >
                  {job.skillsRequired.map((skill, index) => (
                    <Badge key={index} colorScheme="purple">
                      {skill}
                    </Badge>
                  ))}
                </HStack>
              </Box>

              <DialogRoot>
                <DialogTrigger asChild>
                  <Button
                    colorScheme="teal"
                    onClick={() => handleViewDetails(job._id)}
                  >
                    View Details
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  {!isJDLoading && viewingJob ? (
                    <>
                      <DialogHeader>
                        <DialogCloseTrigger asChild>
                          <Button
                            colorPalette="red"
                            onClick={() => viewingJob(null)}
                          >
                            Close
                          </Button>
                        </DialogCloseTrigger>
                        <DialogTitle>{viewingJob.company}</DialogTitle>
                      </DialogHeader>
                      <DialogBody>
                        <Text fontSize="md">{viewingJob.position}</Text>
                        <Text fontSize="sm" color="gray.500">
                          {viewingJob.location}
                        </Text>
                        <Image
                          src={viewingJob.logo}
                          alt="Company Logo"
                          boxSize="100px"
                          borderRadius="md"
                          mt={2}
                        />
                        <Text mt={2}>{viewingJob.description}</Text>
                        <Text mt={2} fontWeight="bold">
                          Contact Information:
                        </Text>
                        <Text>{viewingJob.contactInfo.email}</Text>
                        <Text>{viewingJob.contactInfo.mobile}</Text>
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
      {jobsLoading &&
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

export default FindJobs;
