/* eslint-disable react/prop-types */

import { Box, Text, HStack, Avatar } from "@chakra-ui/react";
import { getSenderFull, getSender } from "../../config/ChatLogics";
import { useColorModeValue } from "../ui/color-mode";

export function ChatDetails({
  setSelectedChat,
  chat,
  selectedChat,
  loggedInUser,
}) {
  const chatDetailsBG = useColorModeValue(
    selectedChat?._id === chat._id ? "pink.500" : null,
    selectedChat?._id === chat._id ? "pink.900" : null
  );

  const fontColor = selectedChat?._id === chat._id ? "white" : "pink.500";

  return (
     <Box
      w="100%"
      key={chat._id}
      p={3}
      onClick={() => setSelectedChat(chat)}
      bg={{ base: "transperant", md: chatDetailsBG }} // color={selectedChat === chat._id ? "white" : "black"}
      color={fontColor}
      borderBottomWidth="1px"
      sx={{
        borderRadius: {
          base: "none",
          md: "md",
        },
      }}
    >
      <HStack>
        <Avatar.Root size='sm'>
          <Avatar.Fallback name={
            !chat.isGroupChat
              ? getSender(loggedInUser, chat.users)
              : chat.chatName
          } />
          <Avatar.Image src={
            !chat.isGroupChat
              ? getSenderFull(loggedInUser, chat.users).avatar
              : chat.groupChatProfilePic
          } />
        </Avatar.Root>
        {/* {console.log("===  ChatDetails.jsx [50] ===", chat.latestMessage)} */}
        <Box>
          <Text fontWeight="bold" fontSize="1.1rem">
            {!chat.isGroupChat
              ? getSender(loggedInUser, chat.users)
              : chat.chatName}
          </Text>
          {chat.latestMessage && (
            <HStack
              fontSize="sm" // color={selectedChat === chat._id ? "white" : "gray.500"}
            >
              {chat.latestMessage?.sender?.name ===
                loggedInUser.name ? (
                <Text fontWeight="bold">You:</Text>
              ) : (
                chat.isGroupChat && (
                  <Text fontWeight="bold">{chat.latestMessage?.sender?.name}:</Text>
                )
              )}
              <Text>{chat.latestMessage?.content}</Text>
            </HStack>
          )}
        </Box>
      </HStack>
    </Box>
  );
}
export default ChatDetails;
