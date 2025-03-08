import { useState } from "react";
import { Box, Flex, Button, VStack, Text } from "@chakra-ui/react";

import MyConnections from "../../components/Student/MyConnections";
import AllConnections from "../../components/Student/AllConnections";

const StudentNetwork = () => {
    const [selectedTab, setSelectedTab] = useState("all");  
    

    return (
        <Box  bg="gray.50">
           

            <Flex  direction={{ base: "column", md: "row" }}>
                {/* Sidebar */}
                <Box p={4} bg="purple.100" color="white" minH={{md: "90vh"}} minW="250px">
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

export default StudentNetwork;
