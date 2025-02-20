import Navbar from '../../components/Alumni/AlumniNavbar';
import { Box, Flex, Button, VStack } from "@chakra-ui/react";
import { useState } from "react";
import AllJobs from "../../components/Alumni/AllJobs";
import MyJobs from "../../components/Alumni/MyJobs";

const AlumniJob = () => {
    const [selectedTab, setSelectedTab] = useState("all");  // "all" or "my"
  return (
    <Box bg="purple.50">
            {/* Navbar at the Top */}
            <Navbar />

            <Flex mt="80px" direction={{ base: "column", md: "row" }}>
                {/* Sidebar */}
                <Box p={4} bg="purple.100" color="white"  minH={{md: "90vh"}} minW="250px">
                    <VStack spacing={4} align="stretch">
                        <Button
                            colorScheme="whiteAlpha"
                            variant={selectedTab === "all" ? "solid" : "ghost"}
                            onClick={() => setSelectedTab("all")}
                        >
                            All Jobs
                        </Button>
                        <Button
                            colorScheme="whiteAlpha"
                            variant={selectedTab === "my" ? "solid" : "ghost"}
                            onClick={() => setSelectedTab("my")}
                        >
                            My Jobs
                        </Button>
                    </VStack>
                </Box>

                {/* Main Content Area */}
                <Box flex="1" p={5}>
                    {selectedTab === "all" ? <AllJobs /> : <MyJobs />}
                </Box>
            </Flex>
        </Box>
  )
}

export default AlumniJob;