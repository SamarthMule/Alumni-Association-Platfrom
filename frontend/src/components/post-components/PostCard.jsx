import {
  Card,
  Button,
  Avatar,
  Flex,
  Text,
  IconButton,
  Box,
  Input,
  Stack,
  Dialog,
  Portal,
  CloseButton,
  FileUpload,
  Textarea,
  Badge,
  // Divider,
  HStack,
  VStack,
  Image,
} from "@chakra-ui/react";
import { FaHeart, FaRegHeart, FaTrash, FaEdit } from "react-icons/fa";
import { FaCommentDots, FaClock } from "react-icons/fa";
import { HiUpload } from "react-icons/hi";
import { useEffect, useState } from "react";
import useChatContext from "../../hooks/useChatContext";
import usePosts from "../../hooks/usePosts";
import { formatDistance } from "date-fns";

const PostCard = ({
  owner,
  title,
  content,
  attachment,
  likes,
  _id,
  createdAt,
  handleDeletePost,
  handleUpdatePost,
  setPosts
}) => {
  const [postTitle, setPostTitle] = useState(title);
  const [postContent, setContent] = useState(content);
  const [postAttachment, setAttachment] = useState(attachment);
  const [loading, setLoading] = useState({
    like: false,
    comment: false,
    delete: false,
    edit: false
  });

  const EditDialog = () => {
    const [postTitle, setPostTitle] = useState(title);
    const [postContent, setPostContent] = useState(content);
    const [postAttachment, setPostAttachment] = useState(attachment);
  
    const handleFileChange = (e) => {
      setPostAttachment(e.target.files[0]);
    };
  
    const handleOnSave = async () => {
      if (!postTitle.trim() || !postContent.trim()) {
        alert("Title and content are required.");
        return;
      }
  
      setLoading(prev => ({...prev, edit: true}));
      const formData = new FormData();
      formData.append("title", postTitle);
      formData.append("content", postContent);
      if (postAttachment) {
        formData.append("attachment", postAttachment);
      }
  
      try {
         await handleUpdatePost(_id, formData);
  
        setPostTitle("");
        setPostContent("");
        setPostAttachment(null);
      } catch (error) {
        console.error("Error updating post:", error);
      } finally {
        setLoading(prev => ({...prev, edit: false}));
      }
    };
  
    return (
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <IconButton 
            variant="outline" 
            ml={4} 
            colorScheme="blue"
            size="sm"
            aria-label="Edit post"
          >
            <Box as={FaEdit} />
          </IconButton>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop 
            bg="blackAlpha.600"
            backdropFilter="blur(8px)"
          />
          <Dialog.Positioner>
            <Dialog.Content
              
              borderRadius="md"
              boxShadow="xl"
              maxW="500px"
              w="90%"
            >
              <Dialog.Header borderBottomWidth="1px" p={4}>
                <Dialog.Title fontWeight="bold">Edit Post</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body p={4}>
                <VStack spacing={4} align="stretch">
                  <Box>
                    <Text mb={1} fontSize="sm" fontWeight="medium">Post Title</Text>
                    <Input
                      placeholder="Title of the Post"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      focusBorderColor="blue.400"
                    />
                  </Box>
                  <Box>
                    <Text mb={1} fontSize="sm" fontWeight="medium">Post Content</Text>
                    <Textarea
                      placeholder="What do you want to talk about?"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      focusBorderColor="blue.400"
                      minH="120px"
                    />
                  </Box>
                  <Box>
                    <Text mb={1} fontSize="sm" fontWeight="medium">Attachment</Text>
                    <Flex gap={3} alignItems='center'>
                      <FileUpload.Root>
                        <FileUpload.HiddenInput onChange={handleFileChange} />
                        <FileUpload.Trigger asChild>
                          <Button variant="outline" size="sm" colorScheme="blue">
                            <HiUpload style={{ marginRight: "8px" }} /> Upload file
                          </Button>
                        </FileUpload.Trigger>
                        <FileUpload.List />
                      </FileUpload.Root>
                      {postAttachment && (
                        <Button size="sm" colorScheme="red" onClick={() => setPostAttachment(null)}>
                          Remove File
                        </Button>
                      )}
                    </Flex>
                  </Box>
                </VStack>
              </Dialog.Body>
              <Dialog.Footer borderTopWidth="1px" p={4}>
                <HStack spacing={2} justify="flex-end">
                  <Dialog.CloseTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </Dialog.CloseTrigger>
                  <Button 
                    onClick={handleOnSave} 
                    colorScheme="blue"
                    loading={loading.edit}
                  >
                    Save Changes
                  </Button>
                </HStack>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild position="absolute" top={3} right={3}>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    );
  };

  const { getSpecUser, user } = useChatContext();
  const { getPostComments, commentOnPost, likeUnlike, deleteComment } = usePosts();
  const [authorDetails, setAuthorDetails] = useState({ name: "", avatar: "" });
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likesCount, setLikesCount] = useState(likes.length);
  const [commentsCount, setCommentsCount] = useState(comments.length);
  const [isLiked, setIsLiked] = useState(
    likes.find((like) => (like === user._id ? true : false))
  );
  const [showComments, setShowComments] = useState(false);

  const fetchAuthorDetails = async () => {
    const details = await getSpecUser(owner);
    if (details) {
      setAuthorDetails(details);
    }
  };

  const handleLikeUnlike = async () => {
    setLoading(prev => ({...prev, like: true}));
    try {
      const response = await likeUnlike(_id);
      if (response) {
        setLikesCount(response.likes.length);
        setIsLiked((prev) => !prev);
      }
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    } finally {
      setLoading(prev => ({...prev, like: false}));
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setLoading(prev => ({...prev, comment: true}));
    try {
      const response = await commentOnPost(_id, newComment);
      const userDetails = await getSpecUser(response.comment.user);
      const newc = {
        user: {
          name: userDetails.author,
          avatar: userDetails.avatar,
        },
        content: newComment,
      };

      if (response) {
        setComments((prev) => [...prev, newc]);
        setCommentsCount((prev) => prev + 1);
        setNewComment("");
        setShowComments(true); // Show comments after adding a new one
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setLoading(prev => ({...prev, comment: false}));
    }
  };

  const handleDeleteComment = async (id) => {
    setLoading(prev => ({...prev, delete: true}));
    try {
      const response = await deleteComment(id);
      if (response) {
        setComments((prev) => prev.filter((comment) => comment._id !== id));
        setCommentsCount((prev) => prev - 1);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setLoading(prev => ({...prev, delete: false}));
    }
  };

  useEffect(() => {
    fetchAuthorDetails();
  }, [owner, getSpecUser]);

  useEffect(() => {
    const fetchPostComments = async () => {
      const details = await getPostComments(_id);
      if (details) {
        setComments(details);
        setCommentsCount(details.length);
      }
    };

    fetchPostComments();
  }, []);

  const timeAgo = createdAt ? formatDistance(new Date(createdAt), new Date(), { addSuffix: true }) : '';

  return (
    <Card.Root
      width={{ lg: "550px", md: "85%", base: "95%" }}
      mb={6}
      borderRadius="xl"
      boxShadow="md"
      
      overflow="hidden"
      transition="transform 0.2s, box-shadow 0.2s"
      _hover={{ boxShadow: "lg" }}
      divideY="1px"
    >
      {/* Card Header */}
      <Card.Header p={4}>
        <Flex justify="space-between" align="center">
          <Flex gap={3} align="center">
            <Avatar.Root size="md">
              <Avatar.Fallback name={authorDetails.author} />
              <Avatar.Image src={authorDetails.avatar} />
            </Avatar.Root>
            <Box>
              <Text fontWeight="bold" fontSize="md">{authorDetails.author}</Text>
              <Flex align="center" color="gray.500" fontSize="xs">
                <Box as={FaClock} mr={1} />
                <Text>{timeAgo}</Text>
              </Flex>
            </Box>
          </Flex>
          
          {user._id === owner && (
            <HStack spacing={2}>
              <IconButton
                colorScheme="red"
                variant="ghost"
                aria-label="Delete post"
                size="sm"
                onClick={() => handleDeletePost(_id)}
                loading={loading.delete}
              >
                <Box as={FaTrash} boxSize="14px" />
              </IconButton>
              <EditDialog />
            </HStack>
          )}
        </Flex>
      </Card.Header>
      
      
      
      {/* Card Body */}
      <Card.Body p={4}>
        <VStack align="stretch" spacing={4}>
          <Text fontWeight="bold" fontSize="xl">{postTitle}</Text>
          
          <Text color="gray.700" whiteSpace="pre-wrap">{postContent}</Text>
          
          {attachment && (
            <Box 
              borderRadius="md" 
              overflow="hidden"
              borderWidth="1px"
              borderColor="gray.200"
            >
              <Image
                src={postAttachment}
                alt="Post Attachment"
                objectFit="cover"
                maxH="350px"
                w="100%"
              />
            </Box>
          )}
        </VStack>
      </Card.Body>
      
      
      
      {/* Card Footer */}
      <Card.Footer p={4}>
        <VStack spacing={3} align="stretch" w="full">
          {/* Engagement Stats */}
          <Flex justify="space-between" align="center">
            <HStack spacing={3}>
              <Button
                variant="ghost"
                colorScheme={isLiked ? "red" : "gray"}
                leftIcon={isLiked ? <FaHeart /> : <FaRegHeart />}
                size="sm"
                fontSize="sm"
                onClick={handleLikeUnlike}
                loading={loading.like}
              >
                {likesCount} {likesCount === 1 ? "Like" : "Likes"}
              </Button>
              
              <Button
                variant="ghost"
                colorScheme={showComments ? "blue" : "gray"}
                leftIcon={<FaCommentDots />}
                size="sm"
                fontSize="sm"
                onClick={() => setShowComments(!showComments)}
              >
                {commentsCount} {commentsCount === 1 ? "Comment" : "Comments"}
              </Button>
            </HStack>
          </Flex>
          
          {/* Add Comment */}
          <Flex gap={2}>
            <Avatar.Root size="sm">
              <Avatar.Fallback name={user.name} />
              <Avatar.Image src={user.avatar} />
            </Avatar.Root>
            <Input
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              borderRadius="full"
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleAddComment();
              }}
            />
            <Button 
              colorScheme="blue" 
              onClick={handleAddComment}
              loading={loading.comment}
              size="sm"
            >
              Post
            </Button>
          </Flex>
          
          {/* Comments Section */}
          {showComments && commentsCount > 0 && (
            <VStack 
              align="stretch" 
              spacing={3} 
              maxH="300px" 
              overflowY="auto"
              mt={2}
              p={3}
             
              borderRadius="md"
            >
              {comments.map((comment, index) => (
                <Flex key={index} gap={3} align="flex-start">
                  <Avatar.Root size="sm">
                    <Avatar.Fallback name={comment.user.name} />
                    <Avatar.Image src={comment.user.avatar} />
                  </Avatar.Root>
                  <Box 
                    flex={1} 
                    p={3} 
                     
                    borderRadius="md"
                    borderWidth="1px"
                   
                  >
                    <Flex justify="space-between" align="center" mb={1}>
                      <Text fontWeight="bold" fontSize="sm">{comment.user.name}</Text>
                      {comment.user._id === user._id && (
                        <IconButton
                          variant="ghost"
                          colorScheme="red"
                          aria-label="Delete comment"
                          size="xs"
                          onClick={() => handleDeleteComment(comment._id)}
                          loading={loading.delete}
                        >
                          <Box as={FaTrash} boxSize="12px" />
                        </IconButton>
                      )}
                    </Flex>
                    <Text fontSize="sm">{comment.content}</Text>
                  </Box>
                </Flex>
              ))}
            </VStack>
          )}
        </VStack>
      </Card.Footer>
    </Card.Root>
  );
};

export default PostCard;