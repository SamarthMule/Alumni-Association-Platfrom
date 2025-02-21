import { Box, Button, Input, Textarea, VStack, Heading, Image, Badge, HStack, Flex } from "@chakra-ui/react";
import { useState, useRef } from "react";

const CreateJob = ({ onClose }) => {
  const [jobDetails, setJobDetails] = useState({
    company: "",
    position: "",
    location: "",
    skills: [],
    description: "",
    logo: null, // Store logo file
  });

  const [preview, setPreview] = useState(null); // Store preview image URL
  const [fileName, setFileName] = useState("Add Logo Of company"); // Default text for button
  const [skillInput, setSkillInput] = useState(""); // Temporary input for skills

  const fileInputRef = useRef(null); // Reference to file input

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
    if (skillInput.trim() && !jobDetails.skills.includes(skillInput.trim())) {
      setJobDetails({ ...jobDetails, skills: [...jobDetails.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  // Handle job submission
  const handleCreateJob = () => {
    console.log("Job Created:", jobDetails);
    onClose(); // Close the form after submission
  };

  return (
    <Box bg="white" p={6} mt={4} boxShadow="lg" borderRadius="md">
      <Heading size="md" mb={4} textAlign="center">
        Create a Job Post
      </Heading>
      <VStack spacing={4} align="stretch">
        <Input placeholder="Company Name" name="company" value={jobDetails.company} onChange={handleChange} />
        <Input placeholder="Position" name="position" value={jobDetails.position} onChange={handleChange} />
        <Input placeholder="Location" name="location" value={jobDetails.location} onChange={handleChange} />
        
        {/* Skill Input */}
        <HStack>
          <Input
            placeholder="Add Skill"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
          />
          <Button size="sm" colorScheme="blue" onClick={handleAddSkill}>Add</Button>
        </HStack>
        
        {/* Display Added Skills */}
        <HStack wrap="wrap">
          {jobDetails.skills.map((skill, index) => (
            <Badge key={index} colorScheme="purple">{skill}</Badge>
          ))}
        </HStack>

        <Textarea placeholder="Job Description" name="description" value={jobDetails.description} onChange={handleChange} />

        {/* Hidden File Input */}
        <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} hidden />

        {/* Custom Button to Trigger File Input */}
        <Button width="100%" colorScheme="blue" backgroundColor="gray.300" color="purple.700" onClick={() => fileInputRef.current.click() }>
          {fileName}
        </Button>

        {/* Preview uploaded image */}
        {preview && (
          <Image src={preview} alt="Company Logo" boxSize="100px" objectFit="contain" borderRadius="md" mt={2} />
        )}

        <Button colorScheme="green" onClick={handleCreateJob}>Submit Job</Button>
        <Button colorScheme="red" variant="outline" onClick={onClose}>Cancel</Button>
      </VStack>
    </Box>
  );
};

export default CreateJob;
