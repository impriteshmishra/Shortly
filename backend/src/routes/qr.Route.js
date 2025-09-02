import express from "express";
import { deleteQr, generateQr } from "../controllers/qr.controller.js";
import isAuthenticated from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/generate").post(isAuthenticated, generateQr);
router.route('/delete/:id').delete(isAuthenticated,deleteQr)

export default router;