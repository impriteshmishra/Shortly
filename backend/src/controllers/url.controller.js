import {getUrlDoc } from "../dao/url.dao.js";
import { createShortUrlServiceWithoutUser, createShortUrlServiceWithUser } from "../services/createUrl.service.js";
import urlSchema from "../models/url.model.js"

export const createUrl = async (req, res) => {
    const data = req.body;
    console.log(data)

    try {
        let shortUrl;
        if (req?.user) {
            shortUrl = await createShortUrlServiceWithUser(data?.url, req.user._id, data?.slug, data?.description, data?.expireDate);
        }
        else {
            shortUrl = await createShortUrlServiceWithoutUser(data?.url);
        }
        console.log(process.env.APP_URL + shortUrl);
        
        res.status(200).json({ shortUrl: process.env.APP_URL + "s/" + shortUrl });
    } catch (error) {
        console.error("Error in createUrl controller:", error?.message);
        res.status(400).json({ error: error?.message });
    }

}

export const redirectFromShortUrl = async (req, res) => {
    const { id } = req.params;
    // console.log("id", id);
    try {
        const user = await getUrlDoc(id); 
        // console.log(fullUrl);
        if(user?.expireAt){
            if(user?.expireAt < new Date()){
                return res.status(410).json({
                    message: "URL validity is expired.",
                    success:false
                })
            }
        }
        if (user?.full_url) {
            let redirectTo = user?.full_url;
            if (!/^https?:\/\//i.test(redirectTo)) {
                redirectTo = "https://" + redirectTo;
            }

            // console.log("Redirecting to:", redirectTo);
            res.redirect(redirectTo);
        } else {
            res.status(404).send("Short URL not found.");
        }
    } catch (err) {
        console.error("Redirection error:", err);
        res.status(500).send("Server error.");
    }
}


export const createCustomUrl = async (req, res) => {
    const { url, slug } = req.body;
    const shortUrl = await createShortUrlServiceWithoutUser(url, customUrl)
    res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl })
}

export const deleteUrl = async (req,res) => {
    const {id} = req.params;
    console.log(id, "from contr");
    
    try {
        const deletedUrl = await urlSchema.findByIdAndDelete(id);

        if(!deletedUrl){
            return res.status(404).json({
                message: "URL not found.",
                success: false
            })
        }
        res.status(200).json({
            message: "Url deleted successfully.",
            success: true
        })

    } catch (error) {
        console.log(error, "delete url not work");
        res.status(500).json({
           message: "Server Error.",
           success: false
        })
    }
}