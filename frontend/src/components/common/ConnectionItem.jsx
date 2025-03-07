/* eslint-disable react/prop-types */

import { Box, Text, HStack, Button } from "@chakra-ui/react";
import { getSenderFull, getSender } from "../../config/ChatLogics";
import { useColorModeValue } from "../ui/color-mode";
import { FaUserPlus } from "react-icons/fa";
import { Avatar } from "../ui/avatar";
import { useNavigate } from "react-router";

const ConnectionItem = ({
  setSelectedChat,
  chat,
  selectedChat,
  loggedInUser,
}) => {
  const chatDetailsBG = useColorModeValue(
    selectedChat?._id === chat._id ? "pink.500" : "gray.100",
    selectedChat?._id === chat._id ? "pink.900" : "gray.100"
  );

  const fontColor = selectedChat?._id === chat._id ? "white" : "pink.500";
  const navigate = useNavigate();

  return (
    <HStack
      key={chat._id}
      p={4}
      bg={chatDetailsBG}
      borderRadius="md"
      justify="space-between"
      align="center"
      _hover={{
        bg: "gray.200",
        transform: "scale(1.02)",
        transition: "0.3s ease-in-out",
      }}
      boxShadow="md"
      onClick={() => setSelectedChat(chat)}
    >
      {/* Profile Icon */}
      <HStack spacing={4} align="center">
        <Avatar
          name={
            !chat.isGroupChat
              ? getSender(loggedInUser, chat.users)
              : chat.chatName
          }
          src={
            !chat.isGroupChat
              ? getSenderFull(loggedInUser, chat.users).avatar
              : chat.groupChatProfilePic
          }
          size="sm"
        />
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            {!chat.isGroupChat
              ? getSender(loggedInUser, chat.users)
              : chat.chatName}
          </Text>
          {chat.latestMessage && (
            <HStack fontSize="sm">
              {chat.latestMessage?.sender?.name === loggedInUser.name ? (
                <Text fontWeight="bold">You:</Text>
              ) : (
                chat.isGroupChat && (
                  <Text fontWeight="bold">
                    {chat.latestMessage?.sender?.name}:
                  </Text>
                )
              )}
              <Text>{chat.latestMessage?.content}</Text>
            </HStack>
          )}
        </Box>
      </HStack>

      {/* Connect Button */}
      <Button
        colorScheme="purple"
        size="sm"
        rightIcon={<FaUserPlus />}
        variant="outline"
        borderRadius="full"
        _hover={{ bg: "purple.100" }}
        backgroundColor="gray.300"
        color="orange.600"
        onClick={() =>
          navigate(
            loggedInUser.role === "student"
              ? navigate("/student/mentor-connect")
              : navigate("/alumni/mentor-connect")
          )
        }
      >
        Message
      </Button>
    </HStack>
  );
};

export default ConnectionItem;
