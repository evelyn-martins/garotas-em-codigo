import { Router } from "express";
import { createPost, deletePost, getPostById, getPostsByUser, updatePost, getPostLikes, getAllPosts } from "../controllers/postController";
import { likePost, unlikePost } from "../controllers/likeController";
import { authenticateToken } from "../middleware/auth";

const postRoutes = Router();

postRoutes.get('/', authenticateToken, getAllPosts);
postRoutes.get('/user/:userId', authenticateToken, getPostsByUser);
postRoutes.post('/create', authenticateToken, createPost);
postRoutes.put('/update/:postId', authenticateToken, updatePost);
postRoutes.delete('/delete/:postId', authenticateToken, deletePost);
postRoutes.get('/:postId', getPostById);
postRoutes.post('/:postId/like', authenticateToken, likePost);
postRoutes.delete('/:postId/unlike', authenticateToken, unlikePost);
postRoutes.get('/:postId/likes', authenticateToken, getPostLikes);

export default postRoutes;