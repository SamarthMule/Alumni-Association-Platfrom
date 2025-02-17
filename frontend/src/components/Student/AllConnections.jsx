import { Box, Text, VStack, HStack, Input, Button} from "@chakra-ui/react";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import { InputGroup } from "../ui/input-group";  // Import your custom InputGroup
// import { LuUser } from "react-icons/lu";  // Import an icon to use in the input field
import { Avatar } from "../ui/avatar";

const allConnectionsData = [
    { name: "John Doe", role: "Software Engineer" },
    { name: "Jane Smith", role: "Data Scientist" },
    { name: "Michael Johnson", role: "Product Manager" }
];

const AllConnections = () => {
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
                    />
                </InputGroup>
            </HStack>

            {/* All Connections Title */}
            <Text fontSize="xl" fontWeight="bold" mb={4}>All Connections</Text>
            
            <VStack spacing={3} align="stretch">
                {allConnectionsData.map((connection, index) => (
                    <HStack
                        key={index}
                        p={3}
                        bg="gray.100"
                        borderRadius="md"
                        justify="space-between"
                        align="center"
                        _hover={{ bg: "gray.200", transform: "scale(1.02)", transition: "0.3s ease-in-out" }}
                    >
                        {/* Profile Icon */}
                        <HStack spacing={4} align="center">
                            <Avatar name={connection.name} size="sm" />
                            <Box>
                                <Text fontWeight="bold">{connection.name}</Text>
                                <Text fontSize="sm" color="gray.600">{connection.role}</Text>
                            </Box>
                        </HStack>

                        {/* Connect Button */}
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

export default AllConnections;
