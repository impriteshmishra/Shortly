import { generateNanoId } from "../utils/helper.js";
import { checkCustomSlug, saveUrl } from "../dao/url.dao.js";

//without user
export const createShortUrlServiceWithoutUser = async (url) => {
    const shortUrl = generateNanoId(7);

    if(!shortUrl) throw new Error("Short URL not generated.")
    await saveUrl(shortUrl, url);
    return shortUrl;
}

//with user
export const createShortUrlServiceWithUser = async (url, userId, slug=null) => {
    const shortUrl = slug || generateNanoId(7);
    console.log(shortUrl,"shorturl")
     if (slug) {
        const exist = await checkCustomSlug(slug);
        console.log("exist", exist);
        if (exist) throw new Error("This custom URL already exists.");
    }
    await saveUrl(shortUrl, url, userId);
    return shortUrl;
}