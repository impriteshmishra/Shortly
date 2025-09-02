import { getAllUserUrlsDao } from "../dao/user.dao.js";
import Qr from '../models/qr.model.js';


export const getAllUserUrls = async (req, res) => {
   const { _id } = req.user;
   const urls = await getAllUserUrlsDao(_id);
   res.status(200).json({ message: "success", urls })
}

export const getAllUserQr = async (req, res) => {
   const { _id } = req.user;
   try {
      const qr = await Qr.find({ user: _id });
      res.status(200).json({
         message: "success",
         qr
      })
   } catch (error) {
      res.status(500).json({
         message: "Unable to get QR Code"
      })
   }
}