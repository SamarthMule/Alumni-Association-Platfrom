import { useState } from "react";
import axios from "axios";

const usePosts = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const api = axios.create({
        baseURL: "/api/v1/posts",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const handleRequest = async (request) => {
        try {
            setLoading(true);
            setError(null);
            const response = await request();
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const createPost = async (formData) => {
        return handleRequest(() =>
            api.post("/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
        );
    };

    const updatePost = async (id, formData) => {
        return handleRequest(() =>
            api.put(`/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
        );
    };

    const deletePost = async (id) => {
        return handleRequest(() => api.delete(`/${id}`));
    };

    const likeUnlikePost = async (id) => {
        return handleRequest(() => api.post(`/${id}/like-unlike`));
    };

    const commentOnPost = async (id, content) => {
        return handleRequest(() =>
            api.post(`/${id}/comment`, { content })
        );
    };

    const getLikedPosts = async () => {
        return handleRequest(() => api.get("/liked"));
    };

    const getPostsOfFollowings = async () => {
        return handleRequest(() => api.get("/followings"));
    };

    const getUserPostsById = async (userId) => {
        return handleRequest(() => api.get(`/${userId}/post`));
    };

    const getPostById = async (id) => {
        return handleRequest(() => api.get(`/${id}`));
    };

    const getAllPosts = async (params) => {
        return handleRequest(() => api.get("/", { params }));
    };

    const getSuggestedPosts = async (params) => {
        return handleRequest(() => api.get("/suggested", { params }));
    };

    const getPostComments = async (postId) => {
        return handleRequest(() => api.get(`/post/${postId}/comments`));
    };

    const likeUnlike = async (postId) => {
        return handleRequest(() => api.post(`${postId}/like-unlike`));
    }

    const deleteComment = async (commentId) => {
        return handleRequest(() => api.delete(`/comments/${commentId}`));
    }

    return {
        loading,
        error,
        createPost,
        updatePost,
        deletePost,
        likeUnlikePost,
        commentOnPost,
        getLikedPosts,
        getPostsOfFollowings,
        getUserPostsById,
        getPostById,
        getAllPosts,
        getSuggestedPosts,
        getPostComments,
        likeUnlike,
        deleteComment
    };
};

export default usePosts;