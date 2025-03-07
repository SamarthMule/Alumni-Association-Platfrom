import {
  Box,
  Text,
  VStack,
  HStack,
  Input,
  Button,
  IconButton,
  useDisclosure,
  Grid,
} from "@chakra-ui/react";
import { FaSearch, FaUserPlus, FaPlus as AddIcon } from "react-icons/fa";
import { InputGroup } from "../ui/input-group";
import { Avatar } from "../ui/avatar";

import { toaster } from "../ui/toaster";
import axios from "axios";
import { useEffect, useState } from "react";
import useChatContext from "../../hooks/useChatContext";
import { useNavigate } from "react-router";


const AllConnections = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const navigate = useNavigate();

  const { user, setSelectedChat, setChats, chats } = useChatContext();

  const handleSearch = async () => {
    setLoading(true);

    await axios
      .get(`/api/v1/users/?name=${search}`)
      .then((res) => {
        setSearchResults(res.data.users);
      })
      .catch((err) => {
        if (toaster.isVisible("toast")) {
          return toaster.dismiss("toast");
        }
        toaster.create({
          id: "toast",
          title: err.response.data.message,
          type: "warning",
        });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleSearch();
  }, [search]);

  const accessChat = (userId) => {
    setLoadingChat(true);

    axios
      .post(`/api/v1/chats`, { userId })
      .then((response) => {
        const data = response.data;
        if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
        setSelectedChat(data);
        setLoadingChat(false);
        toaster.create({
          title: "Chat created successfully",
          type: "success",
        });
      })
      .catch((error) => {
        toaster.create({
          title: error.message,
          type: "error",
        });
      })
      .finally(() => {
        setLoadingChat(false);
      });
  };

  const handleAccessChat = (id) => {
    accessChat(id);
   
    navigate("/student/mentor-connect");
  }

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
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>
            <IconButton
                colorScheme="purple"
                variant="outline"
                icon={<AddIcon />}
                onClick={handleSearch}
            />
        </HStack>

        {/* My Connections Title */}
        <Text fontSize="xl" fontWeight="bold" mb={4}>
            Choose your Mentor(s)
        </Text>

        <VStack spacing={3} align="stretch" w="full">
            {searchResults.length > 0 ? (
                searchResults.map((user) => (
                    <HStack
                        key={user._id}
                        p={4}
                        bg="gray.100"
                        borderRadius="md"
                        justify="space-between"
                        align="center"
                        _hover={{
                            bg: "gray.200",
                            transform: "scale(1.02)",
                            transition: "0.3s ease-in-out",
                        }}
                        boxShadow="md"
                        onClick={() => handleAccessChat(user._id)}
                    >
                        {/* Profile Icon */}
                        <HStack spacing={4} align="center">
                            <Avatar
                                name={user.name}
                                src={user.avatar}
                                size="sm"
                            />
                            <Box>
                                <Text fontWeight="bold" fontSize="lg">
                                    {user.name}
                                </Text>
                                <Text fontSize="sm" color="gray.500">
                                    {user.email}
                                </Text>
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
                ))
            ) : (
                <Box>
                    <Text fontSize="lg" color="gray.500" textAlign="center">
                        Search for Mentors
                    </Text>
                </Box>
            )}
        </VStack>
    </Box>
);
};

export default AllConnections;
