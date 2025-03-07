import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import { Tooltip } from "../../ui/tooltip";

import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../../config/ChatLogics";
import { useColorModeValue } from "../../ui/color-mode";
import PropTypes from "prop-types";

const MessageBox = ({
  i,
  messages,
  message,
  userId,
  senderId,
  content,
  senderUsername,
  profilePic,
  isGroupChat,
}) => {
  // console.log(
  //   "=== senderId === userId MessageBox.jsx [10] ===",
  //   senderId === userId
  // );

  const light = senderId === userId ? "green.100" : "pink.100";
  const dark = senderId === userId ? "pink.800" : "gray.700";

  return (
    <HStack
      gap={2}
      alignSelf={senderId !== userId ? "flex-start" : "flex-end"}
      flexFlow={senderId !== userId ? "row" : "row-reverse"}
      px={10}
      my={3}
      w="100%"
    >
      {isGroupChat && !isSameUser(messages, message, i, userId) && (
        <Tooltip label={senderUsername} hasArrow>
          <Avatar.Root size="30px" key={i}>
            <Avatar.Fallback name={senderUsername} />
            <Avatar.Image src={profilePic} />
          </Avatar.Root>
        </Tooltip>
      )}

      <Box
        bgColor={useColorModeValue(light, dark)}
        p={3}
        borderRadius="md"
        w='fit-content'
        maxW="70%"
        ml={isGroupChat && isSameUser(messages, message, i) ? "38px" : 0}
        mr={isGroupChat && isSameUser(messages, message, i) ? "38px" : 0}
        mt={isGroupChat && isSameUser(messages, message, i) ? 0 : 2}
      >
        <Text>{content}</Text>
      </Box>
    </HStack>
  );
};

MessageBox.propTypes = {
  i: PropTypes.number,
  messages: PropTypes.array,
  message: PropTypes.object,
  userId: PropTypes.string,
  senderId: PropTypes.string,
  content: PropTypes.string,
  senderUsername: PropTypes.string,
  profilePic: PropTypes.string,
  isGroupChat: PropTypes.bool,
};

export default MessageBox;
