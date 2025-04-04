import {
  Box,
  HStack,
  Avatar,
  Input,
  Textarea,
  Button,
  FileUpload,
  Dialog,
  Card,
} from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";
import { useState, useCallback } from "react";
import usePosts from "../../hooks/usePosts";
import useChatContext from "../../hooks/useChatContext";
import { toaster } from "../ui/toaster";

const SearchPost = ({ setPosts }) => {
  const { createPost } = usePosts();
  const { user } = useChatContext();

  const [open, setOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postAttachment, setPostAttachment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setPostAttachment(e.target.files[0]);

  const handleCreatePost = async () => {
    if (!postTitle.trim() || !postContent.trim()) {
      toaster.create({
        id: "toast-post-error",
        title: "Title and content are required",
        type: "error",
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", postTitle);
    formData.append("content", postContent);
    if (postAttachment) formData.append("attachment", postAttachment);

    try {
      const response = await createPost(formData);
      const newPost = {
        ...response.post,
        likes: [],
        comments: [],
        owner: user._id,
      };

      setPosts((prevPosts) => [newPost, ...prevPosts]);
      toaster.create({
        id: "toast-post-success",
        title: "Post created successfully",
        type: "success",
      });

      // Reset form and close dialog
      setOpen(false);
      setPostTitle("");
      setPostContent("");
      setPostAttachment(null);
    } catch (error) {
      toaster.create({
        id: "toast-post-failure",
        title: "Failed to create post",
        type: "error",
      });
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSetPostTitle = useCallback((e) => setPostTitle(e.target.value), []);
  const debouncedSetPostContent = useCallback((e) => setPostContent(e.target.value), []);

  return (
    <Card.Root width="500px">
      <HStack padding="4" boxShadow="md" borderRadius="md" spacing="4" >
        <Avatar.Root>
          <Avatar.Fallback />
          <Avatar.Image />
        </Avatar.Root>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger w="100%" h="100%">
            <Input placeholder="Start a post" />
          </Dialog.Trigger>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.CloseTrigger onClick={() => setOpen(false)} />
              <Dialog.Header>
                <Dialog.Title>Create a post</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Input
                  placeholder="Title of the Post"
                  value={postTitle}
                  onChange={debouncedSetPostTitle}
                  mb={3}
                />
                <Textarea
                  placeholder="What do you want to talk about?"
                  value={postContent}
                  onChange={debouncedSetPostContent}
                />
                <FileUpload.Root>
                  <FileUpload.HiddenInput onChange={handleFileChange} />
                  <FileUpload.Trigger asChild>
                    <Button variant="outline" size="sm" mt={3}>
                      <HiUpload style={{ marginRight: "8px" }} /> Upload file
                    </Button>
                  </FileUpload.Trigger>
                  <FileUpload.List />
                </FileUpload.Root>
              </Dialog.Body>
              <Dialog.Footer>
                <Button
                  colorPalette="blue"
                  mr={3}
                  onClick={handleCreatePost}
                  loading={loading}
                  loadingText="Posting..."
                >
                  Post
                </Button>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Root>
      </HStack>
    </Card.Root>
  );
};

export default SearchPost;