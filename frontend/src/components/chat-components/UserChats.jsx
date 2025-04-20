import {
  Alert,
  Box,
  Flex,
  Grid,
  HStack,
  IconButton,
  VStack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
// import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaXmark as CloseIcon, FaTrash, FaPlus as AddIcon } from "react-icons/fa6";
import { getSender } from "../../config/ChatLogics";
import useChatContext from "../../hooks/useChatContext";
import { useColorModeValue } from "../ui/color-mode";
import { Skeleton } from "../ui/skeleton";
import { toaster } from "../ui/toaster";
import AddUsersDrawer from "./AddUsersDrawer";
import ChatDetails from "./ChatDetails";
import CreateGroupDrawer from "./CreateGroupDrawer";
import SearchChats from "./SearchChats";
import { Checkbox } from "../ui/checkbox";
import { useNavigate } from "react-router";


const UserChats = () => {
  const {
    user,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    fetchAgain,
    setFetchAgain,
    search,
    deleteMode,
    setDeleteMode,
    fetchChats,
    loading: isLoading,
  } = useChatContext();

  const [loggedInUser, setLoggedInUser] = useState(null);
  const userChatsBG = useColorModeValue("white", "white");
  const featuresBG = useColorModeValue("gray.50", "gray.50");
  const sectionBorderColor = useColorModeValue("gray.200", "gray.200");
  const [searchResults, setSearchResults] = useState([]);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigate = useNavigate();
  const redirect = user.role === "student" ? "student" : "alumni";

  const handleDeleteUsers = async () => {
    await axios
      .delete("/api/v1/chats", { data: { chatIds: selectedUsers } })
      .then(() => {
        toaster.create({
          title: `${selectedUsers.length} chats deleted`,
          type: "success",
        });
        setDeleteMode(false);
        setSelectedUsers(null);
        setFetchAgain(!fetchAgain);
      })
      .catch((err) => {
        if (toaster.isVisible("toast")) {
          return toaster.dismiss();
        }
        toaster.create({
          id: "toast",
          title: err.response.data.message,
          type: "warning",
        });
      });
  };

  useEffect(() => {
    setLoggedInUser(JSON.parse(localStorage.getItem("user")));
    fetchChats();
  }, [fetchAgain]);

  useEffect(() => {
    if (search) {
      const results = chats.filter((chat) =>
        chat.isGroupChat
          ? chat.chatName.toLowerCase().indexOf(search.toLowerCase()) > -1
          : getSender(loggedInUser, chat.users)
              .toLowerCase()
              .indexOf(search.toLowerCase()) > -1
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [search]);

  return (
    <Grid
      templateRows="auto 1fr"
      overflow="hidden"
   
    >
      <Flex p={3} gap={3}>
        <Box borderRadius="md"  flex={1}>
          <SearchChats />
        </Box>
        <Flex gap={3} justifyContent="center">
          <IconButton
            colorPalette="pink"
            variant="outline"
            display="flex"
            gap={3}
            onClick={() => navigate(`/${redirect}/network`)}
          >
            <AddIcon />
          </IconButton>

          <IconButton
            aria-label="Delete Chats"
            variant="outline"
            colorPalette={deleteMode ? "red" : "pink"}
            onClick={() => setDeleteMode(!deleteMode)}
          >
            {!deleteMode ? <FaTrash /> : <CloseIcon />}
          </IconButton>
        </Flex>
      </Flex>
      {!isLoading && chats ? (
        <VStack
          px={3}
          overflowY="auto"
          sx={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": { width: 0, height: 0 },
          }}
        >
          {deleteMode && (
            <Alert.Root
              w="100%"
              status="info"
              display="flex"
              alignItems="center"
              rounded="md"
              mt={3}
            >
              <Alert.Indicator />
              <Alert.Content justifySelf="flex-end">
                <Alert.Description flex={1} display="flex">
                  <Text>
                    Select the chats you want to delete and click on the trash
                    icon
                  </Text>
                  <IconButton
                    aria-label="Delete Chats"
                    colorPalette="pink"
                    onClick={handleDeleteUsers}
                    ml={3}
                  >
                    <FaTrash />
                  </IconButton>
                </Alert.Description>
              </Alert.Content>
            </Alert.Root>
          )}
          {!searchResults.length && !search && !chats.length && (
            <VStack flex={1} justify="center">
              <Text fontSize="2xl" color="pink.300" textAlign='center'>
                Connect to a Mentor by clicking on the + icon
              </Text>
            </VStack>
          )}

          {!searchResults.length && !search
            ? chats &&
              chats.length > 0 &&
              chats.map((chat) => (
                <HStack key={chat._id} w="full">
                  <ChatDetails
                    setSelectedChat={setSelectedChat}
                    chat={chat}
                    selectedChat={selectedChat}
                    loggedInUser={user}
                  />
                  {deleteMode && (
                    <Checkbox
                      type="checkbox"
                      size="lg"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers([...selectedUsers, chat._id]);
                        } else {
                          setSelectedUsers(
                            selectedUsers.filter((_id) => _id !== chat._id)
                          );
                        }
                      }}
                      isChecked={selectedUsers.includes(chat._id)}
                    />
                  )}
                </HStack>
              ))
            : searchResults &&
              searchResults.map((chat) => (
                <ChatDetails
                  key={chat._id}
                  setSelectedChat={setSelectedChat}
                  chat={chat}
                  selectedChat={selectedChat}
                  loggedInUser={loggedInUser}
                />
              ))}
        </VStack>
      ) : (
        <Grid gap={3} h="100%" p={3}>
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} rounded="md" />
          ))}
        </Grid>
      )}
    </Grid>
  );
};

// UserChats.propTypes = {
//   user: PropTypes.object,
//   chats: PropTypes.array,
//   setChats: PropTypes.func,
//   selectedChat: PropTypes.object,
//   setSelectedChat: PropTypes.func,
//   fetchAgain: PropTypes.bool,
//   setFetchAgain: PropTypes.func,
//   search: PropTypes.string,
//   deleteMode: PropTypes.bool,
//   setDeleteMode: PropTypes.func,
// };

export default UserChats;
