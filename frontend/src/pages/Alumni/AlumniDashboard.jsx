import { Box } from "@chakra-ui/react";

import Section from "../../components/Student/StudentSection";
import useChatContext from "../../hooks/useChatContext";
import useJobs from "../../hooks/useJobs";
import {useEffect} from "react";
import { getSenderFull } from "../../config/ChatLogics";

const AlumniDashboard = () => {
    const { chats,user,fetchChats } = useChatContext();
    const { jobs,fetchJobs } = useJobs();
  const chatItems = chats.slice(0, 3).map((chat) => {
    return {
      heading: chat.isGroupChat
        ? chat.chatName
        : getSenderFull(user, chat.users).name,
      subHeading: chat.latestMessage?.content,
      dateModeLocation: chat.latestMessage?.date,
    };
  });

  const jobItems = jobs.slice(0, 3).map((job) => {
    return {
      heading: job.title,
      subHeading: job.description,
      dateModeLocation: job.location,
    };
  });

    useEffect(() => { 
        fetchChats();
        fetchJobs();
    }, []);

  return (
    <Box  minH="100vh" p={5} pt="80px">
      <Section
        title="Jobs"
        items={jobItems}
      />

      <Section
        title="Network"
        items={chatItems}
      />
    </Box>
  );
};

export default AlumniDashboard;
