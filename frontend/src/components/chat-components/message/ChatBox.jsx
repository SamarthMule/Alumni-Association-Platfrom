import { Box } from "@chakra-ui/react";
import {useColorModeValue} from '../../ui/color-mode'
import useChatContext from "../../../hooks/useChatContext";
import GroupChats from "./GroupChats";
import SingleChats from "./SingleChats";

// import PropTypes from "prop-types";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = useChatContext();
  const chatBoxBG = useColorModeValue("white", "gray.900");

  return (
    <Box
      bgColor={chatBoxBG}
      overflow="hidden"
      h="100%"
    >
      {selectedChat && selectedChat.isGroupChat ? (
        <GroupChats />
      ) : (
        <SingleChats />
      )}
    </Box>
  );
};



export default ChatBox;
