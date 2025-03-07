import { Box, Text, VStack, HStack, Input } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { InputGroup } from "../ui/input-group"; // Import your custom InputGroup
import useChatContext from "../../hooks/useChatContext";
import { useEffect, useState } from "react";
import ConnectionItem from "../common/ConnectionItem";

const MyConnections = () => {
    const { chats, fetchChats, user, selectedChat, setSelectedChat} = useChatContext();
    const [searchResults, setSearchResults] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchChats();
    }, []);

    useEffect(() => {
        if (search) {
            const results = chats.filter((chat) =>
                chat.isGroupChat
                    ? chat.chatName.toLowerCase().includes(search.toLowerCase())
                    : chat.users.some((u) => u.name.toLowerCase().includes(search.toLowerCase()))
            );
            setSearchResults(results);
            console.log('=== searchResults MyConnections.jsx [25] ===', searchResults);
        } else {
            setSearchResults([]);
        }
    }, [search, chats]);

    return (
        <Box p={4} bg="white" boxShadow="sm" borderRadius="md">
            {/* Search Bar */}
            <HStack mb={6} spacing={4}>
                <InputGroup flex="1" startElement={<FaSearch color="gray.400" />}>
                    <Input
                        placeholder="Search Connections..."
                        bg="gray.50"
                        borderRadius="full"
                        _hover={{ bg: "gray.100" }}
                        _focus={{ bg: "white", boxShadow: "outline" }}
                        size="lg"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </InputGroup>
            </HStack>

            {/* All Connections Title */}
            <Text fontSize="2xl" fontWeight="bold" mb={4} color="purple.700">
                Connected People
            </Text>

            <VStack spacing={4} align="stretch">
                {searchResults.length > 0 ? (
                    searchResults.map((connection, index) => (
                        <ConnectionItem
                            key={index}
                            loggedInUser={user}
                            chat={connection}
                            selectedChat={selectedChat}
                            setSelectedChat={setSelectedChat}
                        />
                    ))
                ) : chats && chats.length > 0 ? (
                    chats.map((connection, index) => (
                        <ConnectionItem
                            key={index}
                            loggedInUser={user}
                            chat={connection}
                            selectedChat={selectedChat}
                            setSelectedChat={setSelectedChat}
                        />
                    ))
                ) : (
                    <Text fontSize="lg" color="gray.500" textAlign="center">
                        No Connections Yet
                    </Text>
                )}
            </VStack>
        </Box>
    );
};

export default MyConnections;
