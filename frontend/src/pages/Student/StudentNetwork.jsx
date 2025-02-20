import { useState } from "react";
import { Box, Flex, Button, VStack, Text } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa"; // Only FaBars needed
import Navbar from "../../components/Student/StudentNavbar";
import MyConnections from "../../components/Student/MyConnections";
import AllConnections from "../../components/Student/Allconnections";

const Network = () => {
    const [selectedTab, setSelectedTab] = useState("all");  
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <Box minH="90vh" bg="gray.50">
            {/* Navbar */}
            <Navbar />

            {/* Sidebar Toggle Button (Mobile Only) */}
            <Button
                aria-label="Toggle Sidebar"
                onClick={() => setIsSidebarOpen(true)}
                position="fixed"
                top="70px"
                zIndex="overlay"
                bg="transparent"
                color="black"
                fontSize="18px"
                fontWeight="bold"
                px="20px"
                py="10px"
                borderRadius="md"
                boxShadow="lg"
                _hover={{ bg: "purple.700", color: "white" }}
                _focus={{ outline: "none" }}
                display={{ base: "flex", md: "none" }} // Hide on full screen
            >
                <FaBars style={{ marginRight: "8px" }} /> 
            </Button>

            <Flex mt="80px">
                {/* Sidebar */}
                <Box
                    w="250px"
                    p={4}
                    bg="purple.100"
                    color="white"
                    minH="100vh"
                    position={{ base: "fixed", md: "relative" }}
                    left={{ base: isSidebarOpen ? "0" : "-100%", md: "0" }}
                    transition="left 0.3s ease-in-out"
                    zIndex="modal"
                    display={{ base: isSidebarOpen ? "block" : "none", md: "block" }}
                    boxShadow="lg"
                >
                    {/* Cross (X) Button for Closing Sidebar (Only in Mobile View) */}
                    <Flex justify="flex-end" display={{ base: "flex", md: "none" }}>
                        <Text
                            fontSize="24px"
                            fontWeight="bold"
                            cursor="pointer"
                            color="red.500"
                            _hover={{ color: "red.700" }}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            ✕
                        </Text>
                    </Flex>

                    {/* Sidebar Content */}
                    <VStack spacing={4} align="stretch" mt={4}>
                        <Button
                            colorScheme="whiteAlpha.200"
                            variant={selectedTab === "all" ? "solid" : "ghost"}
                            onClick={() => {
                                setSelectedTab("all");
                                setIsSidebarOpen(false);
                            }}
                        >
                            All Connections
                        </Button>
                        <Button
                            colorScheme="whiteAlpha"
                            variant={selectedTab === "my" ? "solid" : "ghost"}
                            onClick={() => {
                                setSelectedTab("my");
                                setIsSidebarOpen(false);
                            }}
                        >
                            My Connections
                        </Button>
                    </VStack>
                </Box>

                {/* Main Content */}
                <Box flex="1" p={5}>
                    {selectedTab === "all" ? <AllConnections /> : <MyConnections />}
                </Box>
            </Flex>
        </Box>
    );
};

export default Network;
