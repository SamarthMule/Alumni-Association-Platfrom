// import { AddIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { FaPlus as AddIcon, FaXmark as CloseIcon } from 'react-icons/fa6';

import { MdEdit as EditIcon } from "react-icons/md";

import {
  Avatar,
  Box,
  Button,
  // Drawer,
  // DrawerBody,
  // DrawerCloseButton,
  // DrawerContent,
  // DrawerHeader,
  // DrawerOverlay,
  Flex,
  Grid,
  HStack,
  IconButton,
  Input,

  Text,

  useDisclosure,

  VStack
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import useChatContext from "../../hooks/useChatContext";
import { Skeleton } from "../ui/skeleton";
import { toaster } from "../ui/toaster";
import InputField from "./InputField";

import { useColorModeValue } from "../ui/color-mode";

import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  // DrawerFooter,
  DrawerHeader,
  DrawerRoot,
} from "../ui/drawer";

import PropTypes from "prop-types";

const UpdateGroupDrawer = ({
  groupChatName,
  groupMembers,
  groupChatProfilePic,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, selectedChat, setSelectedChat, fetchAgain, setFetchAgain } =
    useChatContext();
  const [groupChatNameInput, setGroupChatName] = useState(groupChatName || "");

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const selectedUserBG = useColorModeValue("pink.50", "gray.600");
  const [avatar, setAvatar] = useState("");
  const [cloudinaryUrl, setCloudinaryUrl] = useState(groupChatProfilePic);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleSearch = async () => {
    if (toaster.isVisible("search-toast")) {
      toaster.dismiss("search-toast");
    }
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/user/?search=${search}`);
      const gmid = groupMembers && groupMembers.map((u) => u._id);
      setSearchResults(data.filter((u) => !gmid.includes(u._id)));
    } catch (error) {
      console.error(error);
      toaster.create({
        id: "search-toast",
        title: error.response.data.message,
        type: "error",
      });
    }
    setLoading(false);
  };

  const handleAdd = async (selUser) => {
    if (toaster.isVisible("add-toast")) {
      toaster.dismiss("add-toast");
    }

    await axios
      .put(
        "/api/v1/chats/addToGroupChat",
        { chatId: selectedChat?._id, userId: selUser._id }
      )
      .then(({ data }) => {
        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        setSearchResults(searchResults.filter((u) => u._id !== selUser._id));
        toaster.create({
          id: "add-toast",
          title: "User added to group chat",
          type: "success",
        });
      })
      .catch((error) => {
        console.error(error);
        toaster.create({
          id: "add-toast",
          title: error.response.data.message,
          type: "error",
        });
      });
  };

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
          // console.log(data.url);
          setCloudinaryUrl(data.url);

          setUploadLoading(false);
          setUploaded(true);
          axios
            .put(
              "/api/v1/chats/updateProfilePic",
              { chatId: selectedChat?._id, groupChatProfilePic: data.url }
            )
            .then(({ data }) => {
              setSelectedChat(data);
              setFetchAgain(!fetchAgain);
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
      toaster.create({
        title: "Invalid File Format",
      });
    }
  };

  const handleRemove = async (mem) => {
    await axios
      .put(
        `/api/v1/chats/removeFromGroupChat`,
        {
          chatId: selectedChat?._id,
          userId: mem._id,
        }
      )
      .then(({ data }) => {
        mem._id === user._id ? setSelectedChat(null) : setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        toaster.create({
          title: "User removed from group chat",
          type: "success",
        });
      })
      .catch((error) => {
        console.error(error);
        toaster.create({
          id: "remove-toast",
          title: error.response.data.message,
          type: "error",
        });
      });
  };

  const handleRename = async () => {
    if (toaster.isActive("edit-toast")) {
      toaster.close("edit-toast");
    }

    await axios
      .put(
        "/api/v1/chats/renameGroupChat",
        { chatId: selectedChat?._id, chatName: groupChatNameInput }
      )
      .then(({ data }) => {
        setSelectedChat(data);
        toaster.create({
          id: "edit-toast",
          title: "Group Chat renamed successfully",
          type: "success",
        });
        setFetchAgain(!fetchAgain);
      })
      .catch((error) => {
        console.error(error);
        toaster.create({
          id: "edit-toast",
          title: error.response.data.message,
          type: "error",
        });
      });
  };

  return (
    <>
      <IconButton
        as={EditIcon}
        p={2}
        variant="ghost"
        colorPalette="pink"
        onClick={onOpen}
      />
      <DrawerRoot isOpen={isOpen} onClose={onClose} size="md">
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerCloseTrigger />
          <DrawerHeader>
            <HStack justify="space-between">
              <Text>Edit</Text>
            </HStack>
          </DrawerHeader>
          <DrawerBody overflowY="auto">
            <Grid h="100%" spacing={1} templateRows="auto 1fr">
              <VStack>
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
                      <Avatar.Fallback name={groupChatName} />
                      <Avatar.Image src={avatar} />
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
                <HStack w="100%" align="flex-end">
                  <InputField
                    label="Group Chat Name"
                    type="text"
                    placeholder="Group Chat Name"
                    value={groupChatNameInput}
                    onChange={(e) => setGroupChatName(e.target.value)}
                  />
                  <Button colorPalette="pink" onClick={handleRename}>
                    Rename
                  </Button>
                </HStack>
                <Flex w="100%" align="flex-end" gap={3}>
                  <InputField
                    label="Search"
                    type="text"
                    placeholder="Search for users"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />

                  <Button
                    colorPalette="pink"
                    isLoading={isLoading}
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </Flex>
              </VStack>

              <VStack w="100%" h="100%" overflowY="auto" p={3} gap={3}>
                {groupMembers &&
                  groupMembers.map(
                    (mem) =>
                      mem._id !== selectedChat.groupAdmin._id && (
                        <Flex
                          key={mem._id}
                          p={3}
                          justify="space-between"
                          align="center"
                          w="100%"
                          rounded="md"
                          bg={selectedUserBG}
                        >
                          <Flex align="center" gap={3}>
                            <Avatar.Root size="sm">
                              <Avatar.Fallback name={mem.name} />
                              <Avatar.Image src={mem.profilePic} />
                            </Avatar.Root>
                            <Text>{mem.name}</Text>
                          </Flex>
                          <Button
                            colorPalette="red"
                            size="sm"
                            onClick={() => handleRemove(mem)}
                            variant="ghost"
                          >
                            <CloseIcon />
                          </Button>
                        </Flex>
                      )
                  )}
                {!isLoading &&
                  searchResults &&
                  searchResults.map((user) => (
                    <Flex
                      key={user._id}
                      p={3}
                      justify="space-between"
                      align="center"
                      w="100%"
                      rounded="md"
                    >
                      <Flex align="center" gap={3}>
                        <Avatar.Root size="sm">
                          <Avatar.Fallback name={user.name} />
                          <Avatar.Image src={user.avatar} />
                        </Avatar.Root>
                        <Text>{user.name}</Text>
                      </Flex>

                      <Button
                        colorPalette="pink"
                        size="sm"
                        onClick={() => handleAdd(user)}
                        variant="ghost"
                      >
                        <AddIcon />
                      </Button>
                    </Flex>
                  ))}
                {isLoading && (
                  <Grid gap={3} h="100%" w="100%">
                    {[...Array(8)].map((_, i) => (
                      <Skeleton key={i} rounded="md" />
                    ))}
                  </Grid>
                )}
              </VStack>
            </Grid>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    </>
  );
};

UpdateGroupDrawer.propTypes = {
  groupChatName: PropTypes.string,
  groupMembers: PropTypes.array,
  groupChatProfilePic: PropTypes.string,
};

export default UpdateGroupDrawer;
