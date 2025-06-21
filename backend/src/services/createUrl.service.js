import { generateNanoId } from "../utils/helper.js";
import { saveUrl } from "../dao/url.dao.js";

//without user
export const createShortUrlServiceWithoutUser = async (url) => {
    const shortUrl = generateNanoId(7);

    if(!shortUrl) throw new Error("Short URL not generated.")
    await saveUrl(shortUrl, url);
    return shortUrl;
}

//with user
export const createShortUrlServiceWithUser = async (url, userId) => {
    const shortUrl = generateNanoId(7);
    await saveUrl(shortUrl, url, userId);
    return shortUrl;
}