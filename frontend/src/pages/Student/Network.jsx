import { useState } from "react";
import { Box, Flex, Button, VStack } from "@chakra-ui/react";
import Navbar from "../../components/Student/StudentNavbar";
import MyConnections from "../../components/Student/MyConnections";
import AllConnections from "../../components/Student/Allconnections";

const Network = () => {
    const [selectedTab, setSelectedTab] = useState("all");  // "all" or "my"

    return (
        <Box minH="100vh" bg="gray.50">
            {/* Navbar at the Top */}
            <Navbar />

            <Flex mt="80px">
                {/* Sidebar */}
                <Box w="250px" p={4} bg="purple.100" color="white" minH="100vh">
                    <VStack spacing={4} align="stretch">
                        <Button
                            colorScheme="whiteAlpha"
                            variant={selectedTab === "all" ? "solid" : "ghost"}
                            onClick={() => setSelectedTab("all")}
                        >
                            All Connections
                        </Button>
                        <Button
                            colorScheme="whiteAlpha"
                            variant={selectedTab === "my" ? "solid" : "ghost"}
                            onClick={() => setSelectedTab("my")}
                        >
                            My Connections
                        </Button>
                    </VStack>
                </Box>

                {/* Main Content Area */}
                <Box flex="1" p={5}>
                    {selectedTab === "all" ? <AllConnections /> : <MyConnections />}
                </Box>
            </Flex>
        </Box>
    );
};

export default Network;
