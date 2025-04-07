import { Box } from "@chakra-ui/react";
import Section from "../../components/Student/StudentSection";
import useChatContext from "../../hooks/useChatContext";
import { getSenderFull } from "../../config/ChatLogics";
import { useEffect,useState } from "react";
import useJobs from "../../hooks/useJobs";
import axios from "axios";
import useColorTheme from "../../hooks/useColorTheme";

const StudentDashboard = () => {
    const { chats,user,fetchChats } = useChatContext();
    const { jobs,fetchJobs } = useJobs();
    const [events, setEvents] = useState([]);
    const { homeBG } = useColorTheme();

    

    const fetchEvents = async () => {
        try {
          const response = await axios.get("/api/v1/events");
          setEvents(response.data.events || []);
        } catch (error) {
          console.error("Error fetching events", error);
        } 
      };

      useEffect(() => {
        fetchChats();
        fetchJobs();
        fetchEvents();
    }
    ,[]);


    const chatItems = chats.slice(0,3).map((chat) => {
        const sender = getSenderFull(user, chat.users);
        return {
            heading: chat.isGroupChat ? chat.chatName : sender?.name || "Unknown",
            subHeading: chat.latestMessage?.content || "",
            dateModeLocation: chat.latestMessage?.date || ""
        };
    });

    const jobItems = jobs.slice(0,3).map((job) => {
        return {
            heading: job.title,
            subHeading: job.description,
            dateModeLocation: job.location
        };
    });

    const eventItems = events.slice(0,3).map((event) => {
        return {
            heading: event.title,
            subHeading: event.description,
            dateModeLocation: `${new Date(
                event.date
            ).toLocaleDateString("en-GB")} | ${event.time} | ${event.location}`
        };
    });

    

    return (
        <Box  minH="100vh" p={5} bg={homeBG}>
           
            <Section
                title="Events"
                items={eventItems}
            />
            <Section
                title="Jobs"
                items={jobItems}
            />

            <Section
                title="Mentors"
                items={chatItems}
            />

        </Box>
    );
};

export default StudentDashboard;