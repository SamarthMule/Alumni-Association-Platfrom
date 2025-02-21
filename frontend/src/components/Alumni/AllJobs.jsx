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

const AllJobs = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      company: "Google",
      position: "Software Developer",
      location: "Bangalore, Karnataka, India (Remote) - Full Time",
      skills: ["Python", "GitHub"],
      logo: "https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png",
      description:
        "Good communication skills (must). Experience of complex crawling like captcha, recaptcha, and bypassing proxy.",
    },
    {
      id: 2,
      company: "Facebook",
      position: "Software Engineer",
      location: "Menlo Park, California, United States (Remote) - Full Time",
      skills: ["React", "JavaScript"],
      logo: "https://pngimg.com/d/facebook_logos_PNG19753.png",
      description: "Experience with React and JavaScript. Strong problem-solving skills.",
    },
  ]);

  const [editingJobId, setEditingJobId] = useState(null);
  const [editedJob, setEditedJob] = useState(null);
  const [preview, setPreview] = useState(null);
  const [skillInput, setSkillInput] = useState("");

  const fileInputRef = useRef(null);

  const handleEdit = (job) => {
    setEditingJobId(job.id);
    setEditedJob({ ...job });
    setPreview(job.logo);
  };

  const handleChange = (e) => {
    setEditedJob({ ...editedJob, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedJob({ ...editedJob, logo: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !editedJob.skills.includes(skillInput.trim())) {
      setEditedJob({ ...editedJob, skills: [...editedJob.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditedJob({
      ...editedJob,
      skills: editedJob.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleSave = () => {
    setJobs(jobs.map((job) => (job.id === editedJob.id ? editedJob : job)));
    setEditingJobId(null);
  };

  const handleCancel = () => {
    setEditingJobId(null);
  };

  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>
        My Jobs
      </Heading>
      {jobs.map((job) => (
        <Box key={job.id} p={6} mb={4} boxShadow="lg" borderRadius="md" bg="white">
          {editingJobId === job.id ? (
            // Editable Form
            <VStack spacing={4} align="stretch">
              <Input placeholder="Company Name" name="company" value={editedJob.company} onChange={handleChange} />
              <Input placeholder="Position" name="position" value={editedJob.position} onChange={handleChange} />
              <Input placeholder="Location" name="location" value={editedJob.location} onChange={handleChange} />

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

              {/* Display Skills */}
              <HStack wrap="wrap">
                {editedJob.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    colorScheme="purple"
                    cursor="pointer"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    {skill} ❌
                  </Badge>
                ))}
              </HStack>

              <Textarea placeholder="Job Description" name="description" value={editedJob.description} onChange={handleChange} />

              {/* Hidden File Input */}
              <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} hidden />

              {/* Custom Button to Upload Logo */}
              <Button width="100%" colorScheme="blue" onClick={() => fileInputRef.current.click()}>
                Change Logo
              </Button>

              {/* Preview uploaded image */}
              {preview && <Image src={preview} alt="Company Logo" boxSize="100px" objectFit="contain" borderRadius="md" mt={2} />}

              <HStack justify="center">
                <Button colorScheme="green" onClick={handleSave}>
                  Save
                </Button>
                <Button colorScheme="red" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </HStack>
            </VStack>
          ) : (
            // Normal Job Display
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
                <Text fontSize="lg" fontWeight="bold">
                  {job.company}
                </Text>
                <Text fontSize="md" color="gray.600">
                  {job.position}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {job.location}
                </Text>
                <HStack mt={2} justify={{ base: "center", md: "flex-start" }} wrap="wrap">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} colorScheme="purple">
                      {skill}
                    </Badge>
                  ))}
                </HStack>
                <Text fontSize="sm" mt={2} wordBreak="break-word">
                  {job.description}
                </Text>
              </Box>
              <Button colorScheme="blue" onClick={() => handleEdit(job)}>
                Edit
              </Button>
            </Stack>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default AllJobs;
