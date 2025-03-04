// import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  // Drawer,
  // DrawerBody,
  // DrawerCloseButton,
  // DrawerContent,
  // DrawerFooter,
  // DrawerHeader,
  // DrawerOverlay,
  Grid,
  IconButton,
  // Skeleton,
  useDisclosure,

  VStack
} from "@chakra-ui/react";

import { FaPlus as AddIcon } from "react-icons/fa6";
import { Skeleton } from '../ui/skeleton';
import { toaster } from "../ui/toaster";
import { MdGroupAdd } from "react-icons/md";

import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

import axios from "axios";
import { useState } from "react";
import useChatContext from "../../hooks/useChatContext";
import InputField from "./InputField";
import UserListItem from "./UserListItem";

const AddUsersDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { user, setSelectedChat, setChats, chats } = useChatContext();

  const handleSearch = async () => {
    setLoading(true);
    
    await axios
      .get(`/api/v1/users/?name=${search}`)
      .then((res) => {
        console.log('=== res AddUsersDrawer.jsx [63] ===', res);
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


  const accessChat = (userId) => {
    setLoadingChat(true);
    

    axios
      .post(`/api/v1/chats`, { userId })
      .then((response) => {
        const data = response.data;
        if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
        setSelectedChat(data);
        setLoadingChat(false);
        toaster.create({
          title: "Chat created successfully",
          type: "success",
        });
        onClose();
      })
      .catch((error) => {
        toaster.create({
          title: error.message,
          type: "error",
        });
      })
      .finally(() => {
        setLoadingChat(false);
      });
  };



  return (
    <>
      
      <DrawerRoot open={isOpen} onOpenChange={(e) => e.open ? onOpen() : onClose()} >
        <DrawerBackdrop />
        <DrawerTrigger asChild>
                <IconButton
                      colorPalette="pink"
                      variant="outline"
                      display="flex"
                      gap={3}
                    >
                      <AddIcon />
                    </IconButton>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Connect to Mentor</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Grid h="100%" templateRows="auto 1fr">
              <InputField
                label="Search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for a mentor"
              />

              <VStack
                w="100%"
                h="100%"
                overflowY="auto"
                sx={{
                  "::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
                py={3}
              >
                {!loading &&
                  searchResults.length > 0 &&
                  searchResults.map((user) => (
                    <UserListItem
                      key={user._id}
                      username={user.name}
                      email={user.email}
                      avatarUrl={user.avatar}
                      onClick={() => accessChat(user._id)}
                      isLoading={loadingChat}
                    />
                  ))}

                {loading && (
                  <>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <Skeleton key={n} height="50px" />
                    ))}
                  </>
                )}
              </VStack>
            </Grid>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px" display="flex" gap={3}>
            <DrawerActionTrigger asChild>
              <Button variant="outline" colorPalette="red" onClick={onClose} flex={1}>
                Cancel
              </Button>
            </DrawerActionTrigger>
            <Button colorPalette="pink" flex={1} onClick={handleSearch}>
              Submit
            </Button>
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    </>
  );
};

export default AddUsersDrawer;
