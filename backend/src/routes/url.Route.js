import express from 'express';
import { createUrl, deleteUrl} from '../controllers/url.controller.js';
import isAuthenticated from '../middleware/auth.middleware.js';
const router = express.Router();


router.route('/create').post(createUrl);
router.route('/delete/:id').delete(isAuthenticated,deleteUrl)


export default router;