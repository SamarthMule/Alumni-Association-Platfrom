import { Box, VStack, Button, Input, Text, Tabs } from "@chakra-ui/react";
import { FaSearch, FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";

const Sidebar = ({ onSearch, onCreatePost, onDeletePost, onUpdatePost }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <Tabs.List>
      <Box
        w="250px"
        p={5}
        boxShadow="lg"
        borderRadius="lg"
        h="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <VStack spacing={6} align="stretch" gap={"30px"}>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="gray.700"
            textAlign="center"
          >
            Manage Posts
          </Text>

          {/* Search Filter */}
          <Box>
            <Input
              placeholder="Search by title or content"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              mb={2}
              size="sm"
              borderRadius="md"
              focusBorderColor="blue.500"
            />
            <Button
              leftIcon={<FaSearch />}
              colorScheme="blue"
              size="md"
              onClick={handleSearch}
              width="100%"
              aria-label="Search posts"
              _hover={{ bg: "blue.600" }}
              _focus={{ boxShadow: "outline" }}
            >
              Search
            </Button>
          </Box>

          <Tabs.Trigger value="home">Home</Tabs.Trigger>

          <Tabs.Trigger value="my-posts">My Posts</Tabs.Trigger>
        </VStack>
      </Box>
    </Tabs.List>
  );
};

export default Sidebar;
