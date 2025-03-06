import { Box, Flex, Button, VStack } from "@chakra-ui/react";
import { useState } from "react";
import AppliedJobs from "../../components/Student/AppliedJobs";
import FindJobs from "../../components/Student/FindJobs";

const StudentJob = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [showCreateJobForm, setShowCreateJobForm] = useState(false);

  return (
    <Box bg="purple.50" minH="100vh">
      <Flex mt="20px" direction={{ base: "column", md: "row" }} minH="calc(100vh - 80px)">
        
        {/* Sidebar */}
        <Box p={4} bg="purple.200" color="black" minH="100%" minW="250px">
          <VStack spacing={3} align="stretch">
            <Button
              colorScheme="purple"
              variant={selectedTab === "all" ? "solid" : "ghost"}
              _hover={{ bg: "purple.300" }}
              onClick={() => {
                setSelectedTab("all");
                setShowCreateJobForm(false);
              }}
              w="full"
            >
              Find Jobs
            </Button>

            <Button
              colorScheme="purple"
              variant={selectedTab === "my" ? "solid" : "ghost"}
              _hover={{ bg: "purple.300" }}
              onClick={() => {
                setSelectedTab("my");
                setShowCreateJobForm(false);
              }}
              w="full"
            >
              Applied Jobs
            </Button>
          </VStack>
        </Box>

        {/* Main Content Area */}
        <Box flex="1" p={5} w="full">
          {selectedTab === "all" && !showCreateJobForm && <FindJobs />}
          {selectedTab === "my" && !showCreateJobForm && <AppliedJobs />}
        </Box>
      </Flex>
    </Box>
  );
};

export default StudentJob;
