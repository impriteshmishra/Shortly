import express from 'express';
import { createUrl} from '../controllers/url.controller.js';
const router = express.Router();


router.route('/url').post(createUrl);


export default router;