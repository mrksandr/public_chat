import { Router } from 'express';
import * as PostsController from '../controllers/posts';

let router = Router();

router.get('/posts', PostsController.getAllPosts);

router.post('/posts', PostsController.createPost);

router.get('/posts/:page', PostsController.postByPage);

export default router;
