import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  Heading,
  Image,
  Badge,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import useJobs from "../../hooks/useJobs";
import { useEffect } from "react";
import { toaster } from "../ui/toaster";

const CreateJob = () => {
  const [jobDetails, setJobDetails] = useState({
    title: "",
    company: "",
    position: "",
    location: "",
    skillsRequired: [],
    description: "",
    logo: null, // Store logo file
  });
  const [isLoading, setIsLoading] = useState(false);

  const [preview, setPreview] = useState(null); // Store preview image URL
  const [fileName, setFileName] = useState("Add Logo Of company"); // Default text for button
  const [skillInput, setSkillInput] = useState(""); // Temporary input for skills
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const fileInputRef = useRef(null); // Reference to file input

  const { createJob, loading, error } = useJobs();

  useEffect(() => {
    if (error.length > 0) {
      error.forEach((err) => {
        toaster.create({
          type: "error",
          title: err.message,
        });
      });
    }
  }, [error]);

  useEffect(() => {
    // Jobs
    if (loading.some((load) => load.id === "createJob" && load.value)) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loading]);

  // Handle input changes
  const handleChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setJobDetails({ ...jobDetails, logo: file });

      // Generate image preview
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);

      // Update file name
      setFileName(file.name);
    }
  };

  // Handle adding skills dynamically
  const handleAddSkill = () => {
    if (
      skillInput.trim() &&
      !jobDetails.skillsRequired.includes(skillInput.trim())
    ) {
      setJobDetails({
        ...jobDetails,
        skillsRequired: [...jobDetails.skillsRequired, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  // Handle job submission
  const handleCreateJob = () => {

    // Add Email and Mobile to contactInfo
    setJobDetails({
      ...jobDetails,
      contactInfo: { email, mobile },
    });

    const response = createJob(jobDetails);
    if(response){
      toaster.create({
        type: "success",
        title: "Job Posted Successfully",
      });
    }
  };

  return (
    <Box  p={6} mt={4} boxShadow="lg" borderRadius="md">
      <Heading size="md" mb={4} textAlign="center">
        Create a Job Post
      </Heading>
      <VStack spacing={4} align="stretch">
        
        <Input
          placeholder="Company Name"
          name="company"
          value={jobDetails.company}
          onChange={handleChange}
        />
        <Input
          placeholder="Position"
          name="title"
          value={jobDetails.title}
          onChange={handleChange}
        />
        <HStack gap={3}>
          {/* <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> */}
          <Input
            placeholder="Phone"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </HStack>
        <Input
          placeholder="Location"
          name="location"
          value={jobDetails.location}
          onChange={handleChange}
        />

        {/* Skill Input */}
        <HStack>
          <Input
            placeholder="Add Skill"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
          />
          <Button size="sm" colorScheme="blue" onClick={handleAddSkill}>
            Add
          </Button>
        </HStack>

        {/* Display Added Skills */}
        <HStack wrap="wrap">
          {jobDetails.skillsRequired.map((skill, index) => (
            <Badge key={index} colorScheme="purple">
              {skill}
            </Badge>
          ))}
        </HStack>

        <Textarea
          placeholder="Job Description"
          name="description"
          value={jobDetails.description}
          onChange={handleChange}
        />

        {/* Hidden File Input */}
        {/* <Input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          hidden
        /> */}

        {/* Custom Button to Trigger File Input */}
        {/* <Button
          width="100%"
          colorScheme="blue"
          backgroundColor="gray.300"
          color="purple.700"
          onClick={() => fileInputRef.current.click()}
        >
          {fileName}
        </Button> */}

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

        <Button colorScheme="green" onClick={handleCreateJob}>
          Submit Job
        </Button>
        <Button colorScheme="red" variant="outline">
          Cancel
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateJob;
