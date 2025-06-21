import urlSchema from "../models/url.model.js"

export const saveUrl = async (shortUrl, longUrl, userId) => {
    const newUrl = new urlSchema({
        full_url: longUrl,
        short_url: shortUrl
    });
    if (userId) {
        newUrl.user_id = userId;
    }
    await newUrl.save();
}

export const getUrl = async (id)=>{
    // console.log("id from get url", id);
    
    const url =  await urlSchema.findOneAndUpdate({short_url: id},{$inc:{click:1}});
    const fullUrl = url.full_url
    console.log("full url", fullUrl);
    
    return fullUrl;
}