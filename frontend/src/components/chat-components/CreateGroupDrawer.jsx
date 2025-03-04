// import { AddIcon, CloseIcon } from "@chakra-ui/icons";

import {
  Avatar,
  Box,
  Button,
  DrawerTrigger,
  // Drawer,
  // DrawerBody,
  // DrawerCloseButton,
  // DrawerContent,
  // DrawerFooter,
  // DrawerHeader,
  // DrawerOverlay,
  Flex,
  Grid,
  IconButton,
  Link,
  Text,

  VStack,
} from "@chakra-ui/react";
import { FaPlus as AddIcon, FaXmark as CloseIcon } from "react-icons/fa6";

import { useColorModeValue } from "../ui/color-mode";

import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from "../ui/drawer";

import axios from "axios";
import { useState } from "react";
import { MdGroupAdd } from "react-icons/md";
import useChatContext from "../../hooks/useChatContext";
import { toaster } from "../ui/toaster";
import InputField from "./InputField";

const CreateGroupDrawer = () => {
 
  const { user, setChats, fetchAgain, setFetchAgain } = useChatContext();
  const [groupChatName, setGroupChatName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [cloudinaryUrl, setCloudinaryUrl] = useState("");

  const selectedUserBG = useColorModeValue("pink.50", "gray.600");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    
    await axios
      .get(
        `/api/v1/users/search?name=${search}`,
      )
      .then((res) => {
        console.log('=== res.data CreateGroupDrawer.jsx [68] ===', res.data);
        setSearchResults(res.data.users);
      })
      .catch((err) => {
        if (toaster.isVisible("toast")) {
          return toaster.dismiss("toast");
        }
        toaster.create({
          id: "toast",
          title: err.response.data.message,
          type: "warning",
        });
      })
      .finally(() => setLoading(false));
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
          toaster.create({
            title: "Image Uploaded Successfully",
            type: "success",
          });
          setUploadLoading(false);
          setUploaded(true);
        })
        .catch((err) => {
          console.log(err);
          toaster.create({
            title: err.message,
            type: "error",
          });
          setUploadLoading(false);
        });
    } else {
      toaster.create({
        title: "Invalid File Format",
        type: "warning",
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    const data = {
      name: groupChatName,
      users: selectedUsers && JSON.stringify(selectedUsers.map((u) => u._id)),
      groupChatProfilePic: cloudinaryUrl || null,
    };
    await axios
      .post("/api/v1/chats/group", data)
      .then((res) => {
        setChats((prev) => [...prev, res.data]);
        toaster.create({
          id: "toast",
          title: "Group Chat created successfully",
          type: "success",
        });
        setFetchAgain(!fetchAgain);
       
      })
      .catch((err) => {
        if (toaster.isVisible("toast")) {
          return toaster.dismiss("toast");
        }
        toaster.create({
          id: "toast",
          title: err.response.data,
          type: "warning",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <DrawerRoot size="md">
        <DrawerBackdrop />
        <DrawerTrigger asChild>
        <IconButton
              colorPalette="pink"
              variant="outline"
              display="flex"
              gap={3}
            >
              <MdGroupAdd size="25px" />
            </IconButton>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerCloseTrigger >
            <IconButton
              
              colorPalette="pink"
              variant="outline"
              display="flex"
              gap={3}
            >
              <MdGroupAdd size="25px" />
            </IconButton>
          </DrawerCloseTrigger>
          <DrawerHeader>
            <DrawerTitle>New Group Chat</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Grid h="100%" spacing={1} templateRows="auto 1fr">
              <Box>
                <Flex alignItems="flex-end" gap={3}>
                  <InputField
                    label="Select Group Profile Photo"
                    type="file"
                    placeholder="Select Group Profile Photo"
                    isRequired={false}
                    onChange={(e) => {
                      setAvatar(URL.createObjectURL(e.target.files[0]));
                      setCloudinaryUrl(e.target.files[0]);
                      setUploaded(false);
                    }}
                    display="none"
                  />

                  {uploaded && (
                    <Link as={Button} href={cloudinaryUrl}>
                      Preview
                    </Link>
                  )}
                </Flex>

                {avatar && !uploaded && (
                  <Box>
                    Preview
                    <Avatar.Root size="md">
                      <Avatar.Fallback name="Fallback Name" />
                      <Avatar.Image src={avatar} />
                    </Avatar.Root>
                    <Flex>
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
                      <Button
                        isLoading={uploadLoading}
                        loadingText="Uploading"
                        onClick={handleUpload}
                        colorPalette="pink"
                      >
                        Upload
                      </Button>
                    </Flex>
                  </Box>
                )}

                <InputField
                  label="Group Chat Name"
                  type="text"
                  placeholder="Group Chat Name"
                  value={groupChatName}
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
                <Flex w="100%" align="flex-end" gap={3}>
                  <InputField
                    label="Search"
                    type="text"
                    placeholder="Search for users"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <Button
                    colorPalette="pink"
                    isLoading={isLoading}
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </Flex>
              </Box>
              <VStack w="100%" h="100%" overflowY="auto" p={3} gap={3}>
                {searchResults && searchResults.length > 0 &&
                  searchResults.map((user) => (
                    <Flex
                      key={user._id}
                      p={3}
                      justify="space-between"
                      align="center"
                      w="100%"
                      rounded="md"
                      sx={{
                        bg: selectedUsers.includes(user)
                          ? selectedUserBG
                          : null,
                      }}
                    >
                      <Flex align="center" gap={3}>
                        <Avatar.Root size="sm">
                          <Avatar.Fallback name={user.name} />
                          <Avatar.Image src={user.avatar} />
                        </Avatar.Root>
                        <Text>{user.name}</Text>
                      </Flex>
                      {!selectedUsers.includes(user) ? (
                        <Button
                          colorPalette="pink"
                          size="sm"
                          onClick={() =>
                            setSelectedUsers([...selectedUsers, user])
                          }
                          variant="ghost"
                        >
                          <AddIcon />
                        </Button>
                      ) : (
                        <Button
                          colorPalette="red"
                          size="sm"
                          onClick={() =>
                            setSelectedUsers(
                              selectedUsers.filter((u) => u !== user)
                            )
                          }
                          variant="ghost"
                        >
                          <CloseIcon />
                        </Button>
                      )}
                    </Flex>
                  ))}
              </VStack>
            </Grid>
          </DrawerBody>

          <DrawerFooter as={Flex} gap={3}>
            <Button colorPalette="pink" onClick={handleSubmit}>
              Create
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerRoot>
    </>
  );
};

export default CreateGroupDrawer;
