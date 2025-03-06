import { Box, Flex, Grid, Heading, Button, Avatar } from "@chakra-ui/react";

import useChatContext from "../../hooks/useChatContext";
// import LogoutButton from "../components/chat-components/LogoutButton";
// import ProfileModal from "../components/chat-components/ProfileModal";
import UserChats from "../../components/chat-components/UserChats";
import { useColorModeValue } from "../../components/ui/color-mode";
import ChatBox from "../../components/chat-components/message/ChatBox";
// import SearchChats from "../components/chat-components/SearchChats";

const MentorConnect = () => {
  const { user, selectedChat } = useChatContext();

  const appHeaderBG = useColorModeValue("gray.100", "gray.700");
  const headingColor = useColorModeValue("pink.500", "pink.100");
  const headerBorder = useColorModeValue("gray.200", "gray.600");

  return (
    <Grid
      w="100%"
      minH="90svh"
      overflow="hidden"
      templateColumns={{
        base: !selectedChat ? "1fr 0px" : "0px 1fr",
        md: "250px 1fr",
        xl: "350px 1fr",
      }}
      bgColor={useColorModeValue("gray.50", "gray.700")}
    >
      <UserChats />
      <ChatBox />
    </Grid>
  );
};

export default MentorConnect;
