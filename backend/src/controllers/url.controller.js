import { getUrl } from "../dao/url.dao.js";
import { createShortUrlServiceWithoutUser, createShortUrlServiceWithUser } from "../services/createUrl.service.js";

export const createUrl = async (req, res) => {
    const data = req.body;
    // console.log(data)

    try {
        let shortUrl;
        if (req?.user) {
            shortUrl = await createShortUrlServiceWithUser(data?.url, req.user._id, data?.slug);
        }
        else {
            shortUrl = await createShortUrlServiceWithoutUser(data?.url);
        }
        console.log(process.env.APP_URL + shortUrl);
        
        res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
    } catch (error) {
        console.error("Error in createUrl controller:", error?.message);
        res.status(400).json({ error: error?.message });
    }

}

export const redirectFromShortUrl = async (req, res) => {
    const { id } = req.params;
    // console.log("id", id);
    try {
        const fullUrl = await getUrl(id); // Already a string like "facebook.com"
        // console.log(fullUrl);
        if (fullUrl) {
            let redirectTo = fullUrl;
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
    const { url, slug } = req.body
    const shortUrl = await createShortUrlServiceWithoutUser(url, customUrl)
    res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl })
}