import { Box } from "@chakra-ui/react";
import Navbar from "../../components/Alumni/AlumniNavbar";
import Section from "../../components/Student/StudentSection";

const AlumniDashboard = () => {
    return (
        <Box bg="pink.100" minH="100vh" p={5} pt="80px">
            
            <Section
                title="Events"
                items={[
                    { heading: "Event 1 Heading", subHeading: "SubHeading", dateModeLocation: "Date Mode Location" },
                    { heading: "Event 2 Heading", subHeading: "SubHeading", dateModeLocation: "Date Mode Location" },
                    { heading: "Event 3 Heading", subHeading: "SubHeading", dateModeLocation: "Date Mode Location" }
                ]}
            />
            <Section
                title="Jobs"
                items={[
                    { heading: "Job 1 Heading", subHeading: "SubHeading", dateModeLocation: "Date Mode Location" },
                    { heading: "Job 2 Heading", subHeading: "SubHeading", dateModeLocation: "Date Mode Location" },
                    { heading: "Job 3 Heading", subHeading: "SubHeading", dateModeLocation: "Date Mode Location" }
                ]}
            />

            <Section
                title="Mentors"
                items={[
                    { heading: "Recent Name 1", subHeading: "Last Chat" },
                    { heading: "Recent Name 2", subHeading: "Last Chat" },
                    { heading: "Recent Name 3", subHeading: "Last Chat" }
                ]}
            />

        </Box>
    );
};

export default AlumniDashboard;