import express from "express";
import Qr from '../models/qr.model.js';
import QRCode from "qrcode";

export const generateQr = async (req, res) => {
    const { url, description, expireAt } = req.body;
    console.log("qr", url);

    try {
        if (!url) {
            return res.status(400).json({
                message: "URL required!"
            })
        }
        if (!description) {
            return res.status(400).json({
                message: "description required!"
            })
        }
        const qrCode = await QRCode.toDataURL(url);  // generate qr as base64 image.

        const newQR = new Qr({
            url,
            qrCode,
            user: req.user._id,
            description,
            expireAt
        })

        await newQR.save();

        res.status(200).json({
            data: newQR,
            success: true
        })

    } catch (error) {
        console.log("error while generating qr", error);
        res.status(500).json({
            error: error.message,
            success: false
        })
    }
}

export const deleteQr = async (req,res) => {
    const {id} = req.params;
    console.log(id, "from contr");
    
    try {
        const deletedQr = await Qr.findByIdAndDelete(id);

        if(!deletedQr){
            return res.status(404).json({
                message: "QR not found.",
                success: false
            })
        }
        res.status(200).json({
            message: "QR deleted successfully.",
            success: true
        })

    } catch (error) {
        console.log(error, "delete QR not work");
        res.status(500).json({
           message: "Server Error.",
           success: false
        })
    }
}