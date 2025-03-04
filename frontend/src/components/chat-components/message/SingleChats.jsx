import {
  Avatar,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Spinner,
  Text,
  VStack,
  Box,
  Stack,
} from "@chakra-ui/react";
import { FaCircleInfo } from "react-icons/fa6";
import { getSender, getSenderFull } from "../../../config/ChatLogics";
import useChatContext from "../../../hooks/useChatContext";
import { Field } from "../../ui/field";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiSolidMessageDetail } from "react-icons/bi";
import { FaArrowLeft as ArrowBackIcon } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import io from "socket.io-client";
import useColorTheme from "../../../hooks/useColorTheme";
import MessageBox from "./MessageBox";
import ProfileModal from "../ProfileModal";

const ENDPOINT = "http://localhost:8000";
let socket, selectedChatCompare;

const SingleChats = () => {
  const {
    user,
    selectedChat,
    setSelectedChat,
    setNotifications,
    fetchAgain,
    setFetchAgain,
  } = useChatContext();
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typing, setTyping] = useState(false);

  const { chatBoxHeaderFooterBG, typingBadgeBG, inputBG } = useColorTheme();

  useEffect(() => {
    socket = io(ENDPOINT);
    // console.log('=== user SingleChats.jsx [54] ===', user);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // Cleanup socket on component unmount
    return () => {
      socket.off("connected");
      socket.off("typing");
      socket.off("stop typing");
    };
  }, [user]);

  const typingHandler = (data) => {
    setMessageInput(data);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTyped = new Date().getTime();
    let typingInterval = 3000;

    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTyped;

      if (timeDiff >= typingInterval && typing) {
        setTyping(false);
        socket.emit("stop typing", selectedChat._id);
      }
    }, typingInterval);
  };

  const sendMessage = async () => {
    if (!messageInput.trim()) return; // Prevent empty messages
    setLoading(true);

    try {
      const result = await axios.post("/api/v1/messages", {
        messageContent: messageInput,
        chatId: selectedChat?._id,
      });

      setMessageInput("");
      socket.emit("new message", result.data);
      setMessages([...messages, result.data]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    setMessageLoading(true);

    try {
      const result = await axios.get(`/api/v1/messages/${selectedChat?._id}`);
      setMessages(result.data);
      socket.emit("join chat", selectedChat._id);
    } catch (err) {
      console.error(err);
    } finally {
      setMessageLoading(false);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      fetchMessages();
      selectedChatCompare = selectedChat;
    }
  }, [selectedChat]);

  useEffect(() => {
    socket.on("recieved", (newMessage) => {
      console.log('=== From Client SingleChats.jsx [134] ===',newMessage);
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessage.chat._id
      ) {
        setFetchAgain(!fetchAgain); // Trigger refresh for unseen messages
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    return () => {
      socket.off("recieved");
    };
  });

  return (
    <Flex direction="column" h="100%">
      {selectedChat && (
        <Flex
          justify="space-between"
          align="center"
          pl={3}
          bgColor={chatBoxHeaderFooterBG}
          borderBottomWidth="1px"
        >
          <Flex align="center" gap={3}>
            <IconButton
              variant="ghost"
              onClick={() => {
                setFetchAgain(!fetchAgain);
                setSelectedChat(null);
              }}
            >
              <ArrowBackIcon />
            </IconButton>

            <Avatar.Root size="sm">
              <Avatar.Fallback
                name={getSenderFull(user, selectedChat.users)?.name}
              />
              <Avatar.Image
                src={getSenderFull(user, selectedChat.users)?.avatar}
              />
            </Avatar.Root>

            <Heading fontSize="1.3rem" textColor="pink.500" py={4}>
              {selectedChat && getSender(user, selectedChat.users)}
            </Heading>

            {isTyping && user._id !== getSender(user, selectedChat.users) && (
              <Text color={typingBadgeBG}>Typing...</Text>
            )}
          </Flex>
          <HStack gap={3}>
            <ProfileModal
              userInfo={selectedChat && getSenderFull(user, selectedChat.users)}
              buttonChildren={<FaCircleInfo size="25px" />}
              style={{
                variant: "ghost",
              }}
            />
          </HStack>
        </Flex>
      )}

      {!selectedChat ? (
        <VStack flex={1} justify="center">
          <Icon as={BiSolidMessageDetail} fontSize="100px" color="pink.300" />
          <Text fontSize="2xl" color="pink.300">
            Select a chat to start messaging
          </Text>
        </VStack>
      ) : messageLoading ? (
        <Grid flex={1} placeItems="center" fontSize="1.3rem">
          <HStack gap={5} color="pink.400">
            <Spinner boxSize="40px" />
            <Text>Fetching Messages</Text>
          </HStack>
        </Grid>
      ) : (
        <Stack h="100%" overflowY="auto" p={3} spacing={3}>
          {messages &&
            messages.map((message, index) => (
              <MessageBox
                key={message._id}
                i={index}
                messages={messages}
                message={message}
                userId={user._id}
                senderId={message.sender._id}
                content={message.content}
                sendername={message.sender.name}
                avatar={message.sender.avatar}
                isGroupChat={false}
              />
            ))}
        </Stack>
      )}

      {selectedChat && (
        <Flex
          bgColor={chatBoxHeaderFooterBG}
          borderTopWidth="1px"
          p={3}
          align="center"
          gap={3}
        >
          <Field
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
                socket.emit("stop typing", selectedChat._id);
              }
            }}
          >
            <Input
              type="text"
              placeholder="Enter Message"
              onChange={(e) => typingHandler(e.target.value)}
              value={messageInput}
              bgColor={inputBG}
            />
          </Field>
          <IconButton p={2} colorPalette="blue" onClick={sendMessage}>
            <IoSend />
          </IconButton>
        </Flex>
      )}
    </Flex>
  );
};

export default SingleChats;
