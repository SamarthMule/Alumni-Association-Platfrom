import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

import { toaster } from "../ui/toaster";

import axios from "axios";
import { useState } from "react";
import useChatContext from "../../hooks/useChatContext";
import InputField from "./InputField";

// import PropTypes from "prop-types";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  DialogBackdrop,
  DialogActionTrigger
} from "../ui/dialog";

const ProfileModal = ({
  buttonChildren = "Profile",
  style = {},
  userInfo,
  isGroupChat,
  groupChatName,
  groupMembers,
  groupAdmin,
  groupChatavatar,
}) => {
  const { user, fetchAgain, setFetchAgain } = useChatContext();
  const [isEditable, setIsEditable] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [cloudinaryUrl, setCloudinaryUrl] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [name, setname] = useState(userInfo?.name);

  const handleUpload = () => {
    if (
      ["image/jpeg", "image/png", "image/webp"].includes(cloudinaryUrl.type)
    ) {
      setUploadLoading(true);
      const data = new FormData();
      data.append("file", cloudinaryUrl);
      data.append("upload_preset", "letschat");
      data.append("cloud_name", "calmperson");
      fetch("https://api.cloudinary.com/v1_1/calmperson/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setCloudinaryUrl(data.url);

          setUploadLoading(false);
          setUploaded(true);
          axios
            .put(
              "/api/v1/users/updateUser",
              { userId: user.id, avatar: data.url },
              {
                headers: {
                  Authorization: `Bearer ${user?.token}`,
                },
              }
            )
            .then(() => {
              const updatedUser = { ...user, avatar: data.url };
              localStorage.setItem("userDetails", JSON.stringify(updatedUser));
              setFetchAgain(!fetchAgain);
              setIsEditable(false);
            })
            .catch((err) => {
              console.log(err);
              toaster.create({
                title: err.message,
                type: "error",
              });
              setUploadLoading(false);
            });
        })
        .catch((err) => {
          console.log(err);
          toaster.create({
            title: err.message,
            type: "error",
          });
          setUploadLoading(false);
        })
        .finally(() => {
          toaster.create({
            title: "Image Uploaded Successfully",
            type: "success",
          });
        });
    } else {
      toaster({
        title: "Invalid File Format",
      });
    }
  };

  const updatename = async () => {
    await axios
      .put(
        "/api/v1/users/updateUser",
        { userId: user.id, name },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then(() => {
        const updatedname = { ...user, name };
        localStorage.setItem("userDetails", JSON.stringify(updatedname));
        setFetchAgain(!fetchAgain);
        setIsEditable(false);
        toaster.create({
          title: "name Updated Successfully",
          type: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        toaster.create({
          title: err.message,
        });
      });
  };

  return (
    <DialogRoot >
      <DialogBackdrop />
      <DialogTrigger asChild>
        <Button colorPalette="pink" {...style}>
          {buttonChildren}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <HStack gap={10} justify="center">
            <Flex direction="column" align="center" gap={3}>
              {!isEditable ? (
                <Avatar.Root size="2xl" boxSize="200px" boxShadow="outline">
                  <Avatar.Fallback
                    name={!isGroupChat ? userInfo?.name : groupChatName}
                  />
                  <Avatar.Image
                    src={!isGroupChat ? userInfo?.avatar : groupChatavatar}
                  />
                </Avatar.Root>
              ) : (
                <VStack>
                  <Box position="relative" justify="center" h="100%">
                    <Input
                      type="file"
                      position="absolute"
                      opacity={0}
                      w="100%"
                      bgColor="red.100"
                      h="100%"
                      zIndex={999}
                      onChange={(e) => {
                        setAvatar(URL.createObjectURL(e.target.files[0]));
                        setCloudinaryUrl(e.target.files[0]);
                        setUploaded(false);
                      }}
                    />
                    <Avatar.Root size="xl" boxSize="200px" bg="pink.500">
                      <Avatar.Fallback name={userInfo?.name} />
                      <Avatar.Image src={!avatar ? userInfo?.avatar : avatar} />
                    </Avatar.Root>
                  </Box>
                  {!avatar ? (
                    <Text color="pink.200">
                      Click anywhere around Avatar or Drag n Drop
                    </Text>
                  ) : (
                    !uploaded && (
                      <>
                        <Button
                          colorPalette="pink"
                          onClick={handleUpload}
                          isLoading={uploadLoading}
                          loadingText="Uploading"
                        >
                          Upload
                        </Button>
                        <Button
                          colorPalette="red"
                          onClick={() => {
                            setAvatar("");
                            setCloudinaryUrl("");
                            setUploaded(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    )
                  )}
                </VStack>
              )}
              <VStack>
                {!isEditable ? (
                  <Heading fontSize="2xl">
                    {!isGroupChat ? userInfo?.name : groupChatName}
                  </Heading>
                ) : (
                  <HStack>
                    <InputField
                      type="text"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                    />
                    <Button
                      colorPalette="green"
                      isDisabled={name === user?.name}
                      onClick={updatename}
                    >
                      {/* <CheckIcon /> */}
                    </Button>
                  </HStack>
                )}
                {!isGroupChat && <Text>{userInfo?.email}</Text>}
              </VStack>
            </Flex>
            {isGroupChat && (
              <Grid templateRows="auto 1fr">
                <Text
                  color="pink.500"
                  textAlign="center"
                  p={3}
                  borderBottom="2px"
                  borderColor="pink.100"
                >
                  Group Members
                </Text>
                <VStack
                  h="100%"
                  pt={3}
                  overFlowY="auto"
                  sx={{
                    "::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                >
                  {groupMembers &&
                    groupMembers.map((user) => (
                      <ProfileModal
                        key={user._id}
                        userInfo={user}
                        buttonChildren={
                          <HStack w="100%">
                            <Avatar.Root size="sm">
                              <Avatar.Fallback name={user.name} />
                              <Avatar.Image src={user.avatar} />
                            </Avatar.Root>
                            <Text>{user.name}</Text>
                            {user._id === groupAdmin && (
                              <Badge colorPalette="green" variant="solid">
                                Admin
                              </Badge>
                            )}
                          </HStack>
                        }
                        style={{
                          variant: "ghost",
                          w: "100%",
                        }}
                      />
                    ))}
                </VStack>
              </Grid>
            )}
          </HStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button>Save</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

// ProfileModal.propTypes = {
//   buttonChildren: PropTypes.node,
//   style: PropTypes.object,
//   userInfo: PropTypes.object,
//   isGroupChat: PropTypes.bool,
//   groupChatName: PropTypes.string,
//   groupMembers: PropTypes.array,
//   groupAdmin: PropTypes.string,
//   groupChatavatar: PropTypes.string,
// };

export default ProfileModal;
