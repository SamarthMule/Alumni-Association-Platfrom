import { Box, Flex, Button, VStack } from "@chakra-ui/react";
import { useState } from "react";
import AllEvents from "../../components/Student/AllEvents";
import MyEvents from "../../components/Student/MyEvents";

const StudentEvents = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [showCreateJobForm, setShowCreateJobForm] = useState(false);

  return (
    <Box bg="purple.50" minH="100vh">
     
      <Flex mt="80px" direction={{ base: "column", md: "row" }} minH="calc(100vh - 80px)">
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
              All Events
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
              My Events
            </Button>
          
          </VStack>
        </Box>

        {/* Main Content Area */}
        <Box flex="1" p={5} w="full">
          {selectedTab === "all" && !showCreateJobForm && <AllEvents />}
          {selectedTab === "my" && !showCreateJobForm && <MyEvents />}
          {showCreateJobForm && <CreateEvent onClose={() => setShowCreateJobForm(false)} />}
        </Box>
      </Flex>
    </Box>
  );
};

export default StudentEvents;
