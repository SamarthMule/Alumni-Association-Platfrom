// API Endpoints:

// 1. Create a new post (Content or Attachment required)
//    Route: POST /api/posts

// 2. Update an existing post (Only owner can update)
//    Route: PUT /api/posts/:id

// 3. Delete a post along with its comments (Only owner can delete)
//    Route: DELETE /api/posts/:id

// 4. Like/Unlike a post (Toggle like status)
//    Route: PATCH /api/posts/:id/like

// 5. Comment on a post (Requires content)
//    Route: POST /api/posts/:id/comment

// 6. Get all posts liked by the user
//    Route: GET /api/posts/liked

// 7. Get posts from users the logged-in user follows
//    Route: GET /api/posts/followings

// 8. Get all posts created by a specific user
//    Route: GET /api/posts/user/:id

// 9. Get a single post by its ID
//    Route: GET /api/posts/:id

// 10. Get all posts (Paginated, includes suggested posts)
//     Route: GET /api/posts?page=1&limit=10

// 11. Get suggested posts (Filter & sort options available)
//     Route: GET /api/posts/suggested?page=1&limit=10&filter=today&sortBy=likes&order=desc

// 12. Filter posts based on content, owner name, and date range
//     Route: GET /api/posts/filter?content=example&ownerName=John&filter=lastMonth


import { Post } from "../models/post.model.js";
import { Comment } from "../models/comment.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary,deleteFromCloudinary } from "../utils/cloudinary.js";
import { Mentorship } from "../models/mentorship.model.js";
import mongoose from "mongoose";

const createPost = async (req, res) => {
    try {
        const userId = req.user._id;
        const { title, content, } = req.body;
        let attachment = '';

        let missingFields = [];
        if(!title) missingFields.push("title");
        if(!content) missingFields.push("content");

        if (missingFields.length > 0)
            return res.status(400).json({ "message": `${missingFields.join(", ")} ${missingFields.length > 1 ? "are" : "is"} required` })

        if (req.file) {
            const filePath = req.file.path;
            const uploadedResponse = await uploadOnCloudinary(filePath);
            attachment = uploadedResponse.secure_url;
        }

        const newPost = new Post({
            owner: userId,
            title,
            content,
            attachment,
        });

        await newPost.save();
        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        console.log(`\n\n\nError in createPost : `, error)
        res.status(500).json({ message: "Error occurred in createPost", error:error.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        let attachment;

        const post = await Post.findById(id);

        if (!post) return res.status(404).json({ error: "Post not found" });

        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Unauthorized request to update post" });
        }

        if (req.file) {
            if (post.attachment) {
                const attachmentId = post.attachment.split("/").pop().split(".")[0];
                await uploadOnCloudinary(attachmentId);
            }

            const uploadedResponse = await uploadOnCloudinary(req.file.path);
            attachment = uploadedResponse.secure_url;
        }

        post.title = updates.title || post.title;
        post.content = updates.content || post.content;
        post.attachment = attachment || post.attachment;

        await post.save();
        res.status(200).json({ message: "Post updated successfully", post });
    } catch (error) {
        console.log(`\n\n\nError in updatePost : `, error)
        res.status(500).json({ message: "Error occurred in updatePost", error });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) return res.status(404).json({ error: "Post not found" });
        console.log('=== post post.controller.js [125] ===', post);

        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Unauthorized request to delete post" });
        }

        if (post.attachment) {
            const attachmentId = post.attachment.split("/").pop().split(".")[0];
            await deleteFromCloudinary(attachmentId);
        }

        await Comment.deleteMany({ post_id: id });
        await Post.findByIdAndDelete(id);

        res.status(200).json({ message: "Post and its comments deleted successfully" });
    } catch (error) {
        console.log(`\n\n\nError in deletePost : `, error)
        res.status(500).json({ message: "Error occurred in deletePost", error });
    }
};

const likeUnlikePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ error: "Post not found" });

        const isLiked = post.likes.includes(userId);

        if (isLiked) {
            post.likes = post.likes.filter((like) => like.toString() !== userId.toString());
            await post.save();
            return res.status(200).json({ message: "Post unliked successfully", likes: post.likes });
        } else {
            post.likes.push(userId);
            await post.save();

            return res.status(200).json({ message: "Post liked successfully", likes: post.likes });
        }
    } catch (error) {
        console.log(`\n\n\nError in likeUnlikePost : `, error)
        res.status(500).json({ message: "Error occurred in likeUnlikePost", error });
    }
};

const commentOnPost = async (req, res) => {
    try {
        const { content } = req.body;
        console.log('=== content post.controller.js [175] ===', content);
        const { id } = req.params;
        const userId = req.user._id;

        if (!content) return res.status(400).json({ error: "Comment content is required" });

        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ error: "Post not found" });

        const newComment = new Comment({
            post_id: id,
            user: userId,
            content,
        });

        const savedComment = await newComment.save();

        post.comments.push(savedComment._id);
        await post.save();

        res.status(201).json({ message: "Comment added successfully", comment: savedComment });
    } catch (error) {
        console.log(`\n\n\nError in commentOnPost : `, error)
        res.status(500).json({ message: "Error occurred in commentOnPost", error });
    }
};

const getLikedPost = async (req, res) => {
    try {
        const userId = req.user._id.toString();

        const likedPosts = await Post.find({ likes: {$in: userId} }).sort({ createdAt: -1 });

        if (!likedPosts.length) {
            return res.status(404).json({ message: "No liked posts found" });
        }

        res.status(200).json({ message: "Liked posts retrieved successfully", likedPosts });
    } catch (error) {
        console.log(`\n\n\nError in getLikedPost : `, error)
        res.status(500).json({ message: "Error occurred in getLikedPost", error });
    }
};

const getPostOfFollowings = async (req, res) => {
    try {
        const userId = req.user._id.toString();

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const followingIds = user.following.map((following) => new mongoose.Types.ObjectId(following._id));

        const posts = await Post.find({ owner: { $in: followingIds } }).sort({ createdAt: -1 });

        if (!posts.length) {
            return res.status(404).json({ message: "No posts found from followings" });
        }

        res.status(200).json({ message: "Posts from followings retrieved successfully", posts });
    } catch (error) {
        console.log(`\n\n\nError in getPostOfFollowings : `, error)
        res.status(500).json({ message: "Error occurred in getPostOfFollowings", error });
    }
};

const getUserPostsById = async (req, res) => {
    try {
        const { id } = req.params;

        const posts = await Post.find({ owner: id }).sort({ createdAt: -1 });

        if (!posts.length) {
            return res.status(404).json({ message: "No posts found for the user" });
        }

        res.status(200).json({ message: "User's posts retrieved successfully", posts });
    } catch (error) {
        console.log(`\n\n\nError in getUserPostsById : `, error)
        res.status(500).json({ message: "Error occurred in getUserPostsById", error });
    }
};

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id).exec();
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json({
            message: "Post retrieved successfully",
            post,
        });
    } catch (error) {
        console.log(`\n\n\nError in getPostById : `, error)
        res.status(500).json({ message: "Error occurred in getPostById", error });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        let { page = 1, limit = 10, filter, content, ownerName, sortBy, order } = req.query;

        // Fetch all non-blocked posts
        let allPosts = await Post.find({ is_blocked: false }).sort({ createdAt: -1 });

        // Apply filters only to allPosts
        allPosts = applyFilters(allPosts, { filter, content, ownerName, sortBy, order });

        // Pagination
        const startIndex = (page - 1) * limit;
        const paginatedPosts = allPosts.slice(startIndex, startIndex + limit);

        res.status(200).json({
            message: "All posts retrieved successfully",
            posts: paginatedPosts,
            totalPosts: allPosts.length,
            currentPage: parseInt(page),
            totalPages: Math.ceil(allPosts.length / limit),
        });
    } catch (error) {
        console.log("\n\n\nError in getAllPosts : ", error);
        res.status(500).json({ message: "Error occurred in getAllPosts", error });
    }
};

const getSuggestedPosts = async (req, res) => {
    try {
        let userId = req.user._id.toString();
        let { page = 1, limit = 10, filter, content, ownerName, sortBy, order } = req.query;

        const user = await User.findById(userId);
        const suggestedPosts = new Set();

        let userFriends = [...user.following, ...user.followers];
        userFriends = userFriends.map(usf => usf._id);
        const fetchPosts = async (query) => {
            const posts = await Post.find(query, { is_blocked: false });
            posts.forEach((post) => suggestedPosts.add(post));
        };

        userId = new mongoose.Types.ObjectId(userId);
        const userMentorships = await Mentorship.find({$or: [
            {mentor: userId},
            {mentee: {$in: userId}}
        ]})

        let userMentors = userMentorships.flatMap(ment => [...ment.mentee, ment.mentor]);
        await Promise.all([
            fetchPosts({ owner: { $in: userFriends } }),
            fetchPosts({ owner: { $in: userMentors } })
        ]);

        let suggestedPostsArray = Array.from(suggestedPosts);

        // Apply filters only to suggestedPosts
        suggestedPostsArray = applyFilters(suggestedPostsArray, { filter, content, ownerName, sortBy, order });

        // Pagination
        const startIndex = (page - 1) * limit;
        const paginatedPosts = suggestedPostsArray.slice(startIndex, startIndex + limit);

        res.status(200).json({
            message: "Suggested posts retrieved successfully",
            posts: paginatedPosts,
            totalPosts: suggestedPostsArray.length,
            currentPage: parseInt(page),
            totalPages: Math.ceil(suggestedPostsArray.length / limit),
        });
    } catch (error) {
        console.log("\n\n\nError in getSuggestedPosts : ", error);
        res.status(500).json({ message: "Error occurred in getSuggestedPosts", error });
    }
};

const applyFilters = (posts, { filter, content, ownerName, sortBy, order }) => {
    let filteredPosts = [...posts];

    // Apply date filtering
    if (filter) {
        const now = new Date();
        let startDate, endDate;

        switch (filter) {
            case "today":
                startDate = new Date(now.setHours(0, 0, 0, 0));
                endDate = new Date(now.setHours(23, 59, 59, 999));
                break;
            case "yesterday":
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 1);
                startDate.setHours(0, 0, 0, 0);
                endDate = new Date(startDate);
                endDate.setHours(23, 59, 59, 999);
                break;
            case "lastMonth":
                startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                endDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
                break;
            case "lastYear":
                startDate = new Date(now.getFullYear() - 1, 0, 1);
                endDate = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999);
                break;
            case "moreThanLastYear":
                endDate = new Date(now.getFullYear() - 1, 0, 1);
                break;
            default:
                break;
        }

        if (startDate && endDate) {
            filteredPosts = filteredPosts.filter((post) => post.createdAt >= startDate && post.createdAt <= endDate);
        } else if (endDate) {
            filteredPosts = filteredPosts.filter((post) => post.createdAt < endDate);
        }
    }

    // Apply content filtering
    if (content) {
        const contentRegex = new RegExp(content, "i");
        filteredPosts = filteredPosts.filter((post) => contentRegex.test(post.content));
    }

    // Apply owner name filtering
    if (ownerName) {
        const ownerRegex = new RegExp(ownerName, "i");
        filteredPosts = filteredPosts.filter((post) => ownerRegex.test(post.owner.name));
    }

    // Sorting logic
    if (sortBy) {
        filteredPosts.sort((a, b) => {
            if (sortBy === "likes") return order === "asc" ? a.likes.length - b.likes.length : b.likes.length - a.likes.length;
            if (sortBy === "comments") return order === "asc" ? a.comments.length - b.comments.length : b.comments.length - a.comments.length;
            return order === "asc" ? a.createdAt - b.createdAt : b.createdAt - a.createdAt;
        });
    }

    return filteredPosts;
};

// ===================== Filters Supported by `getAllPosts` and `getSuggestedPosts` APIs ===================== //

// 1️⃣ Date-Based Filters (filter parameter)
// --------------------------------------------------
// "today"            -> Fetch posts created today (00:00 - 23:59)
// "yesterday"        -> Fetch posts created yesterday (00:00 - 23:59)
// "lastMonth"        -> Fetch posts created in the previous month
// "lastYear"         -> Fetch posts created in the previous year
// "moreThanLastYear" -> Fetch posts created before the last year

// 2️⃣ Content-Based Filter (content parameter)
// --------------------------------------------------
// - Searches for posts where `content` contains the given keyword (case-insensitive)

// 3️⃣ Owner Name Filter (ownerName parameter)
// --------------------------------------------------
// - Searches for posts where `owner.name` contains the given keyword (case-insensitive)

// 4️⃣ Sorting (sortBy & order parameters)
// --------------------------------------------------
// "likes"     -> Sort by number of likes
// "comments"  -> Sort by number of comments
// "createdAt" -> Sort by creation date (default sorting)
//
// order = "asc"  -> Ascending order
// order = "desc" -> Descending order

// 5️⃣ Pagination (page & limit parameters)
// --------------------------------------------------
// page  -> Specifies which page of results to return (default: 1)
// limit -> Specifies the number of posts per page (default: 10)

// ⚠️ Important Differences:
// ✅ `getAllPosts` -> Applies filters to all posts (merged list of suggested + other posts)
// ✅ `getSuggestedPosts` -> Applies filters only to suggested posts


export {
    createPost,
    updatePost,
    deletePost,

    likeUnlikePost,
    commentOnPost,

    getLikedPost,
    getPostOfFollowings,
    getUserPostsById,
    getPostById,

    getAllPosts,
    getSuggestedPosts
};
