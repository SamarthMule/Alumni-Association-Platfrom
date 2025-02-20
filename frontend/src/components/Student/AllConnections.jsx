import { Box, Text, VStack, HStack, Input, Button } from "@chakra-ui/react";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import { InputGroup } from "../ui/input-group";
import { Avatar } from "../ui/avatar";

const myConnectionsData = [
    { name: "Alice Brown", role: "UX Designer" },
    { name: "David Wilson", role: "Cloud Engineer" }
];

const MyConnections = () => {
    return (
        <Box p={4} bg="white" boxShadow="sm" borderRadius="md" w="full">
            {/* Search Bar */}
            <HStack mb={6} spacing={4} w="full">
                <InputGroup flex="1" startElement={<FaSearch color="gray.400" />}>
                    <Input
                        placeholder="Search Connections..."
                        bg="gray.50"
                        borderRadius="full"
                        _hover={{ bg: "gray.100" }}
                        _focus={{ bg: "white", boxShadow: "outline" }}
                        size="lg"
                        w="full"
                    />
                </InputGroup>
            </HStack>

            {/* My Connections Title */}
            <Text fontSize="xl" fontWeight="bold" mb={4}>My Connections</Text>

            <VStack spacing={3} align="stretch" w="full">
                {myConnectionsData.map((connection, index) => (
                    <HStack
                        key={index}
                        p={3}
                        bg="gray.100"
                        borderRadius="md"
                        justify="space-between"
                        align="center"
                        _hover={{ bg: "gray.200", transform: "scale(1.02)", transition: "0.3s ease-in-out" }}
                        w="full"
                        flexWrap="wrap"
                    >
                        {/* Profile Info */}
                        <HStack spacing={4} align="center">
                            <Avatar name={connection.name} size="sm" />
                            <Box>
                                <Text fontWeight="bold">{connection.name}</Text>
                                <Text fontSize="sm" color="gray.600">{connection.role}</Text>
                            </Box>
                        </HStack>

                        {/* Message Button */}
                        <Button
                            colorScheme="purple"
                            size="sm"
                            rightIcon={<FaUserPlus />}
                            variant="outline"
                            borderRadius="full"
                            _hover={{ bg: "purple.100" }}
                            backgroundColor="gray.300"
                            color="orange.600"
                        >
                        
                            Connect
                        </Button>
                    </HStack>
                ))}
            </VStack>
        </Box>
    );
};

export default MyConnections;
