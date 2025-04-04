import PostCard from "./PostCard";
import SearchPost from "./SearchPost";
import { 
  VStack, 
  Spinner, 
  Text, 
  HStack, 
  Tabs, 
  Box, 
  Flex, 
  Badge,
  Container,
  useBreakpointValue,
  Stack
} from "@chakra-ui/react";
import usePosts from "../../hooks/usePosts";
import { useEffect, useState } from "react";
import { toaster } from "../ui/toaster";
import useChatContext from "../../hooks/useChatContext";
import Sidebar from "../common/Sidebar";

const PostsBox = () => {
  const { getAllPosts, deletePost, updatePost, getUserPostsById } = usePosts();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useChatContext();
  const [userPost, setUserPost] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
  
  // Responsive layout adjustments
  const isMobile = useBreakpointValue({ base: true, md: false });
  const contentWidth = useBreakpointValue({ 
    base: "100%", 
    sm: "95%",
    md: "90%", 
    lg: "85%" 
  });

  const fetchUserPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUserPostsById(user._id);
      if (response?.posts) {
        setUserPost(response.posts);
        toaster.create({
          id: "toast-fetch-success",
          title: "Your posts loaded successfully",
          type: "success",
        });
      }
    } catch (err) {
      console.error("Error fetching user posts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all posts
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllPosts();
      if (response?.posts) {
        setPosts(response.posts);
        toaster.create({
          id: "toast-fetch-success",
          title: "Posts loaded successfully",
          type: "success",
        });
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts. Please try again.");
      toaster.create({
        id: "toast-fetch-error",
        title: "Failed to load posts",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle post deletion - update both posts and userPost states
  const handleDeletePost = async (postId) => {
    try {
      const response = await deletePost(postId);
      if (response) {
        // Update main posts list
        setPosts((prevPosts) => 
          prevPosts.filter((post) => post._id !== postId)
        );
        
        // Also update user posts list
        setUserPost((prevUserPosts) => 
          prevUserPosts.filter((post) => post._id !== postId)
        );
        
        toaster.create({
          id: "toast-delete-success",
          title: "Post deleted successfully",
          type: "success",
        });
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      toaster.create({
        id: "toast-delete-error",
        title: "Failed to delete post",
        type: "error",
      });
    }
  };

  // Handle post update - update both posts and userPost states
  const handleUpdatePost = async (postId, formData) => {
    try {
      const response = await updatePost(postId, formData);
      if (response) {
        const updatedPost = response.post;
        
        // Update main posts list
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...post, ...updatedPost } : post
          )
        );
        
        // Also update user posts list
        setUserPost((prevUserPosts) =>
          prevUserPosts.map((post) =>
            post._id === postId ? { ...post, ...updatedPost } : post
          )
        );

        toaster.create({
          id: "toast-update-success",
          title: "Post updated successfully",
          type: "success",
        });
      }
    } catch (err) {
      console.error("Error updating post:", err);
      toaster.create({
        id: "toast-update-error",
        title: "Failed to update post",
        type: "error",
      });
    }
  };

  const handleSearch = (query) => {
    if (!query) {
      // Reset to original data if search is cleared
      activeTab === "home" ? fetchPosts() : fetchUserPosts();
      return;
    }
    
    if (activeTab === "home") {
      const filteredPosts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase())
      );
      setPosts(filteredPosts);
    } else {
      const filteredUserPosts = userPost.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase())
      );
      setUserPost(filteredUserPosts);
    }
  };

  // Fetch both all posts and user posts on component mount
  useEffect(() => {
    fetchPosts();
    fetchUserPosts();
  }, []);

  // Handle tab changes
  const handleTabChange = (value) => {
    setActiveTab(value);
    if (value === "my-posts" && userPost.length === 0) {
      fetchUserPosts(); // Fetch user posts when switching to my-posts tab if empty
    }
  };

  return (
    <Container maxW="container.xl" p={{ base: 2, md: 4 }}>
      <Tabs.Root 
        variant="enclosed" 
        defaultValue="home" 
        w="100%"
        onValueChange={(e) => handleTabChange(e.value)}
        mb={4}
      >
        <Box mb={4}>
          <Tabs.List 
            
            borderRadius="lg" 
            p={1}
            overflowX="auto"
            display="flex"
            width="100%"
          >
            <Tabs.Trigger 
              value="home"
              flex={1}
              py={2}
              borderRadius="md"
              fontWeight="medium"
              _selected={{ 
                
                fontWeight: "bold",
                boxShadow: "sm" 
              }}
            >
              All Posts
              {posts.length > 0 && (
                <Badge ml={2} colorScheme="blue" borderRadius="full">
                  {posts.length}
                </Badge>
              )}
            </Tabs.Trigger>
            <Tabs.Trigger 
              value="my-posts"
              flex={1}
              py={2}
              borderRadius="md"
              fontWeight="medium"
              _selected={{ 
                
                fontWeight: "bold",
                boxShadow: "sm" 
              }}
            >
              My Posts
              {userPost.length > 0 && (
                <Badge ml={2} colorScheme="blue" borderRadius="full">
                  {userPost.length}
                </Badge>
              )}
            </Tabs.Trigger>
          </Tabs.List>
        </Box>
        
        <Flex 
          direction={{ base: "column", md: "row" }}
          w="100%"
          gap={4}
          align="flex-start"
        >
          
          
          <Box flex={1}>
            <Tabs.Content value="home">
              <VStack 
                w={contentWidth}
                mx="auto"
                spacing={5} 
                align="center"
                
                borderRadius="lg"
                
                p={{ base: 3, md: 5 }}
              >
                <Stack w="100%" mb={2} divideY="1px" alignItems='center'>
                  <Text fontSize="xl" fontWeight="bold" mb={3}>
                    All Posts
                  </Text>
                  <SearchPost setPosts={setPosts} />
                  
                </Stack>
                
                {loading && (
                  <Flex justify="center" py={8}>
                    <Spinner size="xl" thickness="4px" color="blue.500" />
                  </Flex>
                )}
                
                {error && (
                  <Box 
                    w="100%" 
                    p={4} 
                    bg="red.50" 
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor="red.200"
                  >
                    <Text color="red.500">{error}</Text>
                  </Box>
                )}
                
                {posts.length > 0 ? (
                  <VStack spacing={6} w="100%" align="center">
                    {posts.map((post) => (
                      <PostCard
                        key={post._id}
                        {...post}
                        handleDeletePost={handleDeletePost}
                        handleUpdatePost={handleUpdatePost}
                        setPosts={setPosts}
                      />
                    ))}
                  </VStack>
                ) : (
                  !loading && (
                    <Box 
                      w="100%" 
                      py={10} 
                      textAlign="center"
                    >
                      <Text fontSize="lg" color="gray.500">
                        No posts available.
                      </Text>
                    </Box>
                  )
                )}
              </VStack>
            </Tabs.Content>
            
            <Tabs.Content value="my-posts">
              <VStack 
                w={contentWidth}
                mx="auto"
                spacing={5} 
                align="center"
                
                borderRadius="lg"
                boxShadow="sm"
                p={{ base: 3, md: 5 }}
              >
                <Stack w="100%" mb={2} divideY="1px" alignItems='center' >
                  <Text fontSize="xl" fontWeight="bold" mb={3}>
                    My Posts
                  </Text>
                  <SearchPost setPosts={setUserPost} />
                 
                </Stack>
                
                {loading && (
                  <Flex justify="center" py={8}>
                    <Spinner size="xl" thickness="4px" color="blue.500" />
                  </Flex>
                )}
                
                {userPost.length > 0 ? (
                  <VStack spacing={6} w="100%" align="center">
                    {userPost.map((post) => (
                      <PostCard
                        key={post._id}
                        {...post}
                        handleDeletePost={handleDeletePost}
                        handleUpdatePost={handleUpdatePost}
                        setPosts={setUserPost}
                      />
                    ))}
                  </VStack>
                ) : (
                  !loading && (
                    <Box 
                      w="100%" 
                      py={10} 
                      textAlign="center"
                    >
                      <Text fontSize="lg" color="gray.500">
                        You haven't created any posts yet.
                      </Text>
                    </Box>
                  )
                )}
              </VStack>
            </Tabs.Content>
          </Box>
        </Flex>
      </Tabs.Root>
    </Container>
  );
};

export default PostsBox;