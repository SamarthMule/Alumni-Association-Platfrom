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

import { useEffect } from "react";
import useJobs from "../../hooks/useJobs";
import { toaster } from "../ui/toaster";
import { Skeleton } from "../ui/skeleton";

const MyJobs = () => {
  const [editingJobId, setEditingJobId] = useState(null);
  const [editedJob, setEditedJob] = useState(null);
  const [preview, setPreview] = useState(null);
  const [skillInput, setSkillInput] = useState("");
  const [viewingJob, setViewingJob] = useState(null);
  const { getJobById, fetchUserPostedJobs, loading, error, jobs, updateJob, deleteJob } =
    useJobs();
  const [jobsLoading, setJobsLoading] = useState(false);
  const [isJDLoading, setIsJDLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchUserPostedJobs();
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
    if (
      loading.some((load) => load.id === "fetchUserPostedJobs" && load.value)
    ) {
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

  const handleEdit = (job) => {
    setEditingJobId(job._id);
    setEditedJob({ ...job });
    setPreview(job.logo);
    setEmail(job.contactInfo.email);
    setMobile(job.contactInfo.mobile);
    setViewingJob(null);
  };

  const handleViewDetails = async (id) => {
    viewingJob && setViewingJob(null);
    const jobDetails = await getJobById(id);
    jobDetails && setViewingJob(jobDetails);
    setEditingJobId(null);
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !editedJob.skills.includes(skillInput.trim())) {
      setEditedJob({
        ...editedJob,
        skills: [...editedJob.skills, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditedJob({
      ...editedJob,
      skills: editedJob.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleInputChange = (e) => {
    setEditedJob({ ...editedJob, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async() => {
    const response = await updateJob(editedJob._id, {
      ...editedJob,
      contactInfo: { email, mobile },
    });
    if (response) {
      toaster.create({
        type: "success",
        title: "Job Updated Successfully",
      });
      setEditingJobId(null);
      setEditedJob(null);
      setPreview(null);
      setEmail("");
      setMobile("");
      fetchUserPostedJobs();
    }
  };

  const handleDelete = async (id) => {
    const response = await deleteJob(id);
    if (response) {
      toaster.create({
        type: "success",
        title: "Job Deleted Successfully",
      });
      fetchUserPostedJobs();
    }
  };

  return (
    <Box p={6} >
      <Heading size="lg" mb={4} color="pink.700">
        My Jobs
      </Heading>
      {!jobsLoading &&
        jobs &&
        jobs.length > 0 &&
        jobs.map((job) => (
          <Box
            key={job._id}
            p={6}
            mb={4}
            boxShadow="lg"
            borderRadius="md"
            
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
                    <Badge key={index} colorPalette="purple">
                      {skill}
                    </Badge>
                  ))}
                </HStack>
              </Box>

              <HStack>
                <Button colorPalette="blue" onClick={() => handleEdit(job)}>
                  Edit
                </Button>

                <DialogRoot>
                  <DialogTrigger asChild>
                    <Button
                      colorPalette="teal"
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
                              onClick={() => setViewingJob(null)}
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

                <Button colorPalette="red" onClick={() => handleDelete(job._id)}>
                  Delete
                </Button>
              </HStack>
            </Stack>

            {editingJobId === job._id && (
              <Box
                mt={4}
                p={4}
                border="1px solid gray"
                borderRadius="md"
                bg="gray.50"
              >
                <Heading size="md">Edit Job</Heading>
                <VStack spacing={3} mt={3} align="stretch">
                  <Input
                    name="title"
                    placeholder="Job Title"
                    value={editedJob.title}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="company"
                    placeholder="Company Name"
                    value={editedJob.company}
                    onChange={handleInputChange}
                  />
                
                  <HStack gap={3}>
                    <Input
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      placeholder="Phone"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </HStack>
                  <Input
                    name="location"
                    placeholder="Job Location"
                    value={editedJob.location}
                    onChange={handleInputChange}
                  />
                  <Textarea
                    name="description"
                    placeholder="Job Description"
                    value={editedJob.description}
                    onChange={handleInputChange}
                  />
                  <Input type="file" onChange={handleFileChange} mb={2} />
                  <Input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    hidden
                  />

                  {/* Custom Button to Upload Logo */}
                  <Button
                    width="100%"
                    colorPalette="blue"
                    onClick={() => fileInputRef.current.click()}
                  >
                    Change Logo
                  </Button>

                  {/* Preview uploaded image */}
                  {preview && (
                    <Image
                      src={preview}
                      alt="Company Logo"
                      boxSize="100px"
                      objectFit="contain"
                      borderRadius="md"
                      mt={2}
                    />
                  )}
                  {/* Skill Input */}
                  <HStack>
                    <Input
                      placeholder="Add Skill"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                    />
                    <Button
                      size="sm"
                      colorPalette="blue"
                      onClick={handleAddSkill}
                    >
                      Add
                    </Button>
                  </HStack>

                  {/* Display Skills */}
                  <HStack wrap="wrap">
                    {editedJob.skillsRequired.map((skill, index) => (
                      <Badge
                        key={index}
                        colorPalette="purple"
                        cursor="pointer"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        {skill} ❌
                      </Badge>
                    ))}
                  </HStack>
                  <HStack spacing={2}>
                    <Button colorPalette="green" onClick={handleSave}>
                      Save
                    </Button>
                    <Button
                      colorPalette="red"
                      onClick={() => setEditingJobId(null)}
                    >
                      Cancel
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            )}
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

      {jobs && jobs.length === 0 && (
        <Flex
          justify="center"
          align="center"
          direction="column"
          p={6}
          
          borderRadius="md"
          boxShadow="lg"
        >
          <Heading size="md" color="gray.500">
            No Jobs Posted Yet
          </Heading>
          <Text color="gray.400">
            Click the Create Job Button to post a job
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default MyJobs;
