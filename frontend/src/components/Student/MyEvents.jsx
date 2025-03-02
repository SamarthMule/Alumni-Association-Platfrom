import {
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

const MyEvents = () => {
    const [events, setEvents] = useState([
        {
          id: 1,
          event_name: "TechFest 202",
          event_date: "25-5-2025",
          location: "Bangalore, Karnataka, India (Remote) - Full Time",
          skills: ["Python", "GitHub"],
          logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_techfest.jpg",
          description:
            "Good communication skills (must). Experience of complex crawling like captcha, recaptcha, and bypassing proxy.",
        },
        {
            id: 2,
            event_name: "TechFest 203",
            event_date: "20-7-2025",
            location: "Menlo Park, California, United States (Remote) - Full Time",
            skills: ["React", "JavaScript"],
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_techfest.jpg",
            description:
                "Experience with React and JavaScript. Strong problem-solving skills.",
        },
      ]);

  const [editingJobId, setEditingJobId] = useState(null);
  const [editedJob, setEditedJob] = useState(null);
  const [preview, setPreview] = useState(null);
  const [skillInput, setSkillInput] = useState("");
  const [viewingJob, setViewingJob] = useState(null);
  

  const fileInputRef = useRef(null);

  const handleEdit = (job) => {
    setEditingJobId(job.id);
    setEditedJob({ ...job });
    setPreview(job.logo);
    setViewingJob(null);
  };

  const handleViewDetails = (job) => {
    setViewingJob(job);
    setEditingJobId(null);
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


  const handleInputChange = (e) => {
    setEditedJob({ ...editedJob, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      // reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handleSave = () => {
    setEvents(events.map((job) => (job.id === editingJobId ? editedJob : job)));
    setEditingJobId(null);
    setEditedJob(null);
    setPreview(null);
  };

  return (
    <Box p={6} bg="gray.100">
      <Heading size="lg" mb={4} color="blue.700">
        My Jobs
      </Heading>
      {events.map((job) => (
        <Box key={job.id} p={6} mb={4} boxShadow="lg" borderRadius="md" bg="white">
          <Stack direction={{ base: "column", md: "row" }} align={{ base: "center", md: "flex-start" }} spacing={4}>
            <Image
              src={job.logo}
              alt="Company Logo"
              boxSize={{ base: "80px", md: "50px" }}
              objectFit="contain"
              borderRadius="md"
            />
            <Box flex="1" textAlign={{ base: "center", md: "left" }}>
              <Text fontSize="lg" fontWeight="bold" color="blue.800">
                {job.event_name}
              </Text>
              <Text fontSize="md" color="gray.600">
                {job.event_date}
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
            </Box>

            <HStack spacing={2}>
              <Button colorScheme="blue" onClick={() => handleEdit(job)}>
                Edit
              </Button>

              <DialogRoot>
                <DialogTrigger asChild>
                  <Button colorScheme="teal" onClick={() => handleViewDetails(job)}>
                    View Details
                  </Button>
                </DialogTrigger>
                {viewingJob?.id === job.id && (
                  <DialogContent>
                    <DialogCloseTrigger />
                    <DialogHeader>
                      <DialogTitle>{viewingJob.event_name}</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                      <Text fontSize="md">{viewingJob.event_date}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {viewingJob.location}
                      </Text>
                      <Image src={viewingJob.logo} alt="Company Logo" boxSize="100px" borderRadius="md" mt={2} />
                      <Text mt={2}>{viewingJob.description}</Text>
                    </DialogBody>
                    <DialogFooter>
                      <DialogCloseTrigger asChild>
                        <Button colorScheme="red">Close</Button>
                      </DialogCloseTrigger>
                    </DialogFooter>
                  </DialogContent>
                )}
              </DialogRoot>
            </HStack>
          </Stack>

          {editingJobId === job.id && (
            <Box mt={4} p={4} border="1px solid gray" borderRadius="md" bg="gray.50">
              <Heading size="md">Edit Job</Heading>
              <VStack spacing={3} mt={3} align="stretch">
                <Input name="company" placeholder="Company Name" value={editedJob.event_name} onChange={handleInputChange} />
                <Input name="position" placeholder="Job Position" value={editedJob.event_date} onChange={handleInputChange} />
                <Input name="location" placeholder="Job Location" value={editedJob.location} onChange={handleInputChange} />
                <Textarea name="description" placeholder="Job Description" value={editedJob.description} onChange={handleInputChange} />
                <Input type="file" onChange={handleFileChange} mb={2} />
                <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} hidden />

{/* Custom Button to Upload Logo */}
<Button width="100%" colorScheme="blue" onClick={() => fileInputRef.current.click()}>
  Change Logo
</Button>

{/* Preview uploaded image */}
{preview && <Image src={preview} alt="Company Logo" boxSize="100px" objectFit="contain" borderRadius="md" mt={2} />}
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
                <HStack spacing={2}>
                  <Button colorScheme="green" onClick={handleSave}>
                    Save
                  </Button>
                  <Button colorScheme="red" onClick={() => setEditingJobId(null)}>
                    Cancel
                  </Button>
                </HStack>
              </VStack>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default MyEvents;
