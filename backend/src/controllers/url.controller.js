import { getUrl } from "../dao/url.dao.js";
import { createShortUrlServiceWithoutUser } from "../services/createUrl.service.js";

export const createUrl = async (req, res) => {
    try {
        const { url } = req.body;
        const shortUrl = await createShortUrlServiceWithoutUser(url);
        res.send(process.env.APP_URL + shortUrl);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

export const redirectFromShortUrl = async (req, res) => {
    const { id } = req.params;
    console.log("id", id);
      try {
        const fullUrl = await getUrl(id); // Already a string like "facebook.com"
        console.log(fullUrl);
        

        if (fullUrl) {
            let redirectTo = fullUrl;
            if (!/^https?:\/\//i.test(redirectTo)) {
                redirectTo = "https://" + redirectTo;
            }

            console.log("Redirecting to:", redirectTo);
            res.redirect(redirectTo);
        } else {
            res.status(404).send("Short URL not found.");
        }
    } catch (err) {
        console.error("Redirection error:", err);
        res.status(500).send("Server error.");
    }
}