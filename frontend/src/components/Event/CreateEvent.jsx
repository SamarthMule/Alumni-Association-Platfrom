import { useState, useRef } from "react";
import { Box, Button, Input, Textarea, VStack, Heading, Image } from "@chakra-ui/react";
import { toaster } from "../ui/toaster";
import { Field } from "@chakra-ui/react";
import axios from "axios";

const CreateEvent = () => {
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    banner: null,
  });
  const [errors, setErrors] = useState({});
  const [previewBanner, setPreviewBanner] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleFileUpload = (files) => {
    if (files && files[0]) {
      setEventDetails({ ...eventDetails, banner: files[0] });
      setPreviewBanner(URL.createObjectURL(files[0]));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ["title", "description", "date", "time", "location"];

    requiredFields.forEach((field) => {
      if (!eventDetails[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateEvent = async () => {
    if (!validateForm()) {
      toaster.create({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        type: "error",
        
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", eventDetails.title);
      formData.append("description", eventDetails.description);
      formData.append("date", eventDetails.date);
      formData.append("time", eventDetails.time);
      formData.append("location", eventDetails.location);
      if (eventDetails.banner) {
        formData.append("banner", eventDetails.banner);
      }

      const response = await axios.post("/api/v1/events", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toaster.create({
        title: "Success",
        description: "Event created successfully!",
        type: "success",
       
      });
      console.log("Created event:", response.data);

      setEventDetails({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        banner: null,
      });
      setPreviewBanner(null);
    } catch (error) {
      console.error("Error creating event", error.response?.data || error.message);
      toaster.create({
        title: "Error creating event",
        description: error.response?.data?.message || "Failed to create event. Please try again.",
        type: "error",
        
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box p={6} borderRadius="md" boxShadow="md">
      <Heading size="md" mb={4}>
        Create Event
      </Heading>
      <VStack spacing={4} align="stretch">
        <Field.Root invalid={!!errors.title}>
          <Field.Label>Event Title</Field.Label>
          <Input placeholder="Event Title" name="title" value={eventDetails.title} onChange={handleChange} />
          <Field.ErrorText>{errors.title}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.description}>
          <Field.Label>Description</Field.Label>
          <Textarea placeholder="Description" name="description" value={eventDetails.description} onChange={handleChange} />
          <Field.ErrorText>{errors.description}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.date}>
          <Field.Label>Date</Field.Label>
          <Input type="date" name="date" value={eventDetails.date} onChange={handleChange} />
          <Field.ErrorText>{errors.date}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.time}>
          <Field.Label>Time</Field.Label>
          <Input type="time" name="time" value={eventDetails.time} onChange={handleChange} />
          <Field.ErrorText>{errors.time}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.location}>
          <Field.Label>Location</Field.Label>
          <Input placeholder="Location" name="location" value={eventDetails.location} onChange={handleChange} />
          <Field.ErrorText>{errors.location}</Field.ErrorText>
        </Field.Root>

        <Box textAlign="center">
          {previewBanner && <Image src={previewBanner} alt="Banner Preview" boxSize="200px" mb={4} />}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleFileUpload(e.target.files)}
          />
          <Button colorScheme="purple" onClick={triggerFileInput}>
            Upload Banner
          </Button>
        </Box>

        <Button colorScheme="blue" onClick={handleCreateEvent} isLoading={isSubmitting} loadingText="Creating...">
          Create Event
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateEvent;
