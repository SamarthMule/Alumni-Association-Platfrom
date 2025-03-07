import { Box, Flex, Button, VStack } from "@chakra-ui/react";
import { useState } from "react";
import AllJobs from "../../components/Alumni/AllJobs";
import MyJobs from "../../components/Alumni/MyJobs";
import Navbar from "../../components/Alumni/AlumniNavbar";
import CreateJob from "../../components/Alumni/CreateJob";

const AlumniJob = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [showCreateJobForm, setShowCreateJobForm] = useState(false);

  return (
    <Box bg="purple.50" minH="100vh">
      

      <Flex  direction={{ base: "column", md: "row" }} minH="calc(100vh - 80px)">
        {/* Sidebar */}
        <Box p={4} bg="purple.100" color="white" minH="100%" minW="250px">
          <VStack spacing={2} align="stretch">
            <Button
              colorScheme="whiteAlpha"
              variant={selectedTab === "all" ? "solid" : "ghost"}
              onClick={() => {
                setSelectedTab("all");
                setShowCreateJobForm(false);
              }}
              w="full"
            >
              All Jobs
            </Button>
            <Button
              colorScheme="whiteAlpha"
              variant={selectedTab === "my" ? "solid" : "ghost"}
              onClick={() => {
                setSelectedTab("my");
                setShowCreateJobForm(false);
              }}
              w="full"
            >
              My Jobs
            </Button>
            <Button
              colorScheme="orange"
              variant={showCreateJobForm ? "solid" : "ghost"}
              onClick={() => {
                setShowCreateJobForm((prev) => !prev);
                setSelectedTab(""); 
              }}
              w="full"
            >
             Create Job
            </Button>
          </VStack>
        </Box>

        {/* Main Content Area */}
        <Box flex="1" p={5} w="full">
          {selectedTab === "all" && !showCreateJobForm && <AllJobs />}
          {selectedTab === "my" && !showCreateJobForm && <MyJobs />}
          {showCreateJobForm && <CreateJob onClose={() => setShowCreateJobForm(false)} />}
        </Box>
      </Flex>
    </Box>
  );
};

export default AlumniJob;
