import urlSchema from "../models/url.model.js"

export const saveUrl = async (shortUrl, longUrl, userId, description, expireAt) => {
    // console.log(userId, "userId")
    const newUrl = new urlSchema({
        full_url: longUrl,
        short_url: shortUrl,
    });
    if (userId) {
        newUrl.user = userId;
        newUrl.description = description;
        newUrl.expireAt = expireAt
    }
    // console.log( newUrl.description, "d");
    
    await newUrl.save();
}

export const getUrlDoc = async (id)=>{
    // console.log("id from get url", id);
    
    const user =  await urlSchema.findOneAndUpdate({short_url: id},{$inc:{click:1}});
    // console.log("full url", fullUrl);
    
    return user;
}

export const checkCustomSlug = async (slug) => {
    return await urlSchema.findOne({short_url:slug});
}    