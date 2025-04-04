import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Editable,
  Button,
} from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";
import useChatContext from "../../hooks/useChatContext";
import { useState, useEffect, useRef } from "react";
import useUpdateUserProfile from "../../hooks/useUpdateUserProfile";
import { toaster } from "../../components/ui/toaster";

const StudentProfile = () => {
  const { user } = useChatContext();
  const [mobileNo, setMobileNo] = useState(user.mobile_no);
  const [company, setCompany] = useState(user.company);
  const [jobTitle, setJobTitle] = useState(user.job_title);
  const [interests, setInterests] = useState(user.interests.join(", "));
  const [avatar, setAvatar] = useState(user.avatar);
  const fileInputRef = useRef(null);
  const triggerFileInput = () => fileInputRef.current.click();

  const { loading, error, success, updateUserDetails, updateUserAvatar } =
    useUpdateUserProfile();

  const fields = [
    { label: "Name", defaultValue: user.name, disabled: true },
    { label: "Gender", defaultValue: user.gender, disabled: true },
    {
      label: "Mobile No",
      defaultValue: mobileNo,
      disabled: false,
      onChange: setMobileNo,
    },
    { label: "Email", defaultValue: user.email, disabled: true },
    { label: "Role", defaultValue: user.role, disabled: true },
    {
      label: "Graduation Year",
      defaultValue: user.graduation_year.split("T")[0],
      disabled: true,
    },
    {
      label: "Current Status",
      defaultValue: user.current_status,
      disabled: true,
    },
    {
      label: "Company",
      defaultValue: company,
      disabled: false,
      onChange: setCompany,
    },
    {
      label: "Job Title",
      defaultValue: jobTitle,
      disabled: false,
      onChange: setJobTitle,
    },
    {
      label: "Interests",
      defaultValue: interests,
      disabled: false,
      onChange: setInterests,
    },
  ];

  useEffect(() => {
    if (error) {
      toaster.create({ title: error, type: "error" });
    }
    if (success) {
      toaster.create({
        title: "Profile updated successfully",
        type: "success",
      });
    }
  }, [error, success]);

  const handleUpdateDetails = (index, value) => {
    const updatedDetails = {
      [fields[index].label.toLowerCase().replace(" ", "_")]: value,
    };

    updateUserDetails(updatedDetails);
    toaster.create({ title: "Updating profile...", type: "info" });
  };

  const handleUpdateAvatar = (formData) => {
    updateUserAvatar(formData);
    toaster.create({ title: "Avatar updated successfully", type: "success" });
  };

  const handleFileUpload = (files) => {
    // Assuming you're handling file upload logic here
    const file = files[0]; // Get the first uploaded file
    const newAvatarURL = URL.createObjectURL(file); // Create a URL for the uploaded image
    setAvatar(newAvatarURL); // Update the avatar with the new image URL
    const formData = new FormData();
    formData.append("avatar", file);
    handleUpdateAvatar(formData);
  };

  return (
    <Box  minH="100vh" p={5} pt="80px">
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
        gap="5"
      >
        <Flex
          direction="column"
          align="center"
          justify="center"
          p={5}
          
          borderRadius="lg"
          boxShadow="md"
        >
          {/* Avatar Component */}
          <Avatar.Root colorPalette={"purple"} size="2xl" boxSize={200}>
            <Avatar.Fallback name={user.name} />
            <Avatar.Image src={avatar} />
          </Avatar.Root>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: "none" }} // Hide the input
            onChange={(e) => handleFileUpload(e.target.files)}
          />

          {/* Button to trigger file upload */}
          <Button colorScheme="purple" mt={5} onClick={triggerFileInput}>
            Change The Image
          </Button>
        </Flex>

        <Flex
          direction={{ base: "column", md: "row" }}
          p={5}
          
          borderRadius="lg"
          boxShadow="md"
          w="100%"
        >
          <Flex direction="column" w={{ base: "100%", md: "50%" }}>
            {fields.slice(0, 5).map((field, index) => (
              <Field label={field.label} key={index} disabled={field.disabled}>
                <Editable.Root defaultValue={field.defaultValue}>
                  <Editable.Preview minW={{ md: "70%", base: "90%" }} />
                  <Editable.Input
                    minW={{ md: "70%", base: "90%" }}
                    onChange={(e) => field.onChange?.(e.target.value)}
                  />
                  <Editable.Control>
                    <Editable.EditTrigger asChild>
                      <IconButton variant="ghost" size="xs" aria-label="Edit">
                        <LuPencilLine />
                      </IconButton>
                    </Editable.EditTrigger>
                    <Editable.CancelTrigger asChild>
                      <IconButton
                        variant="outline"
                        size="xs"
                        aria-label="Cancel"
                      >
                        <LuX />
                      </IconButton>
                    </Editable.CancelTrigger>
                    <Editable.SubmitTrigger asChild>
                      <IconButton
                        variant="outline"
                        size="xs"
                        aria-label="Submit"
                        onClick={() =>
                          handleUpdateDetails(index, field.defaultValue)
                        }
                      >
                        <LuCheck />
                      </IconButton>
                    </Editable.SubmitTrigger>
                  </Editable.Control>
                </Editable.Root>
              </Field>
            ))}
          </Flex>

          <Flex direction="column" w={{ base: "100%", md: "50%" }}>
            {fields.slice(5).map((field, index) => (
              <Field label={field.label} key={index} disabled={field.disabled}>
                <Editable.Root defaultValue={field.defaultValue}>
                  <Editable.Preview minW={{ md: "70%", base: "90%" }} />
                  <Editable.Input
                    minW={{ md: "70%", base: "90%" }}
                    onChange={(e) => field.onChange?.(e.target.value)}
                  />
                  <Editable.Control>
                    <Editable.EditTrigger asChild>
                      <IconButton variant="ghost" size="xs" aria-label="Edit">
                        <LuPencilLine />
                      </IconButton>
                    </Editable.EditTrigger>
                    <Editable.CancelTrigger asChild>
                      <IconButton
                        variant="outline"
                        size="xs"
                        aria-label="Cancel"
                      >
                        <LuX />
                      </IconButton>
                    </Editable.CancelTrigger>
                    <Editable.SubmitTrigger asChild>
                      <IconButton
                        variant="outline"
                        size="xs"
                        aria-label="Submit"
                        onClick={() =>
                          handleUpdateDetails(index + 5, field.defaultValue)
                        }
                      >
                        <LuCheck />
                      </IconButton>
                    </Editable.SubmitTrigger>
                  </Editable.Control>
                </Editable.Root>
              </Field>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default StudentProfile;
