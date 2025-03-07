import { Box } from "@chakra-ui/react";
import Section from "../../components/Student/StudentSection";
import useChatContext from "../../hooks/useChatContext";
import { getSenderFull } from "../../config/ChatLogics";
import { useEffect,useState } from "react";
import useJobs from "../../hooks/useJobs";
import axios from "axios";

const StudentDashboard = () => {
    const { chats,user,fetchChats } = useChatContext();
    const { jobs,fetchJobs } = useJobs();
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        try {
          const response = await axios.get("/api/v1/events");
          setEvents(response.data.events || []);
        } catch (error) {
          console.error("Error fetching events", error);
        } 
      };

    const chatItems = chats.slice(0,3).map((chat) => {
        return {
            heading: chat.isGroupChat ? chat.chatName : getSenderFull(user,chat.users).name,
            subHeading: chat.latestMessage?.content,
            dateModeLocation: chat.latestMessage?.date
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

    useEffect(() => {
        fetchChats();
        fetchJobs();
        fetchEvents();
    }
    ,[]);


    return (
        <Box bg="pink.100" minH="100vh" p={5} >
           
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