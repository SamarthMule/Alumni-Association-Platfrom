// import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaArrowLeft as ArrowBackIcon } from "react-icons/fa6";
import { Field } from "../../ui/field";

import axios from "axios";
import { useEffect, useState } from "react";
import { BiSolidMessageDetail } from "react-icons/bi";
import { FaCircleInfo } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { toaster } from "../../ui/toaster";
// import ScrollableFeed from "react-scrollable-feed";
import io from "socket.io-client";
import { getSender, getSenderFull } from "../../../config/ChatLogics";
import useChatContext from "../../../hooks/useChatContext";
import useColorTheme from "../../../hooks/useColorTheme";
import ProfileModal from "../ProfileModal";
import UpdateGroupDrawer from "../UpdateGroupDrawer";
import MessageBox from "./MessageBox";

const ENDPOINT = "http://localhost:8000";
// const ENDPOINT2 = "https://lpdjx99c-8000.inc1.devtunnels.ms/";

let socket;
let selectedChatCompare;

const GroupChats = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typerName, setTyperName] = useState(null);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messageInput, setMessageInput] = useState("");

  const { chatBoxHeaderFooterBG, inputBG, typingBadgeBG } = useColorTheme();

  const {
    selectedChat,
    setSelectedChat,
    user,
    fetchAgain,
    setFetchAgain,
    notifications,
    setNotifications,
  } = useChatContext();

  

 
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", (name) => {
      if (name) setTyperName(name);
      setIsTyping(true);
    });
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);


  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);

      const { data } = await axios.get(`/api/v1/messages/${selectedChat._id}`);
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toaster.create({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        position: "bottom",
        type: "error",
      });
    }
  };

  const sendMessage = async () => {
    setLoading(true);
    await axios
      .post("/api/v1/messages", {
        messageContent: messageInput,
        chatId: selectedChat?._id,
      })
      .then((result) => {
        setMessageInput("");
        // console.log("=== result SingleChatMessage.jsx [49] ===", result);
        socket.emit("new message", result.data);
        setMessages([...messages, result.data]);
      })
      .catch((err) => {
        console.log(err);
        toaster.create({
          title: err.response.data.message,
          type: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };


  useEffect(() => {
    socket.on("message received", (newMessage) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessage.chat._id
      ) {
        if (!notifications.includes(newMessage)) {
          setNotifications([newMessage, ...notifications]);
        }
      } else {
        setMessages([...messages, newMessage]);
      }
    });
  });

  const typingHandler = (data) => {
    setMessageInput(data);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", {
        selectedChat: selectedChat._id,
        typerName: user.name,
      });
    }

    let lastTyped = new Date().getTime();
    let typingInterval = 3000;

    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTyped;

      if (timeDiff >= typingInterval && typing) {
        setTyping(false);
        socket.emit("stop typing", selectedChat._id);
        setTyperName(null);
      }
    }, typingInterval);
  };

  return (
    <Flex direction="column" h="100%">
      {selectedChat && (
        <Flex
          justify="space-between"
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
            <Avatar.Root size="sm" key={selectedChat?._id}>
              <Avatar.Fallback name={selectedChat?.chatName} />
              <Avatar.Image src={selectedChat?.groupChatProfilePic} />
            </Avatar.Root>
            <Heading fontSize="1.3rem" textColor="pink.500" py={4}>
              {selectedChat && selectedChat.chatName}
            </Heading>
            {isTyping &&
              typerName &&
              typerName !== user.name &&
              user._id !== getSender(user, selectedChat.users) && (
                <Tag.Root
                  size="sm"
                  height="fit-content"
                  bgColor={typingBadgeBG}
                  color="white"
                >
                  <Tag.Label>{typerName} is typing...</Tag.Label>
                </Tag.Root>
              )}
          </Flex>
          <HStack gap={3}>
            {/* {
            console.log(
              "=== selectedChat,user SingleChatMessage.jsx [38] ===",
              selectedChat,
              user
            )} */}
            {selectedChat.groupAdmin._id === user?._id && (
              <UpdateGroupDrawer
                groupChatName={selectedChat.chatName}
                groupChatProfilePic={selectedChat.groupChatProfilePic}
                groupMembers={selectedChat.users}
                groupAdmin={selectedChat.groupAdmin._id}
              />
            )}

            <ProfileModal
              userInfo={
                selectedChat && getSenderFull(user, selectedChat?.users)
              }
              buttonChildren={<FaCircleInfo size="25px" />}
              style={{
                variant: "ghost",
              }}
              isGroupChat={selectedChat && selectedChat?.isGroupChat}
              groupChatName={selectedChat && selectedChat?.chatName}
              groupMembers={selectedChat && selectedChat?.users}
              groupAdmin={selectedChat && selectedChat?.groupAdmin?._id}
              groupChatProfilePic={
                selectedChat && selectedChat?.groupChatProfilePic
              }
            />
          </HStack>
        </Flex>
      )}
      {!selectedChat ? (
        <VStack flex={1} justify="center">
          <Icon as={BiSolidMessageDetail} fontSize="100px" color="pink.300" />
          <Text fontSize="2xl" color="pink.300">
            Pick your Alumni to start messaging
          </Text>
        </VStack>
      ) : (
        <VStack flex={1} overflowY="auto" p={3} spacing={3}>
          {console.log("=== messages GroupChats.jsx [260] ===", messages)}
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
                profilePic={message.sender.profilePic}
                isGroupChat={true}
              />
            ))}
        </VStack>
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
          <IconButton p={2} colorPalette="pink" onClick={sendMessage}>
            <IoSend />
          </IconButton>
        </Flex>
      )}
    </Flex>
  );
};

export default GroupChats;
