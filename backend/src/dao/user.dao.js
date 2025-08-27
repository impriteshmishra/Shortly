import url from "../models/url.model.js";
import User from "../models/user.model.js";


export const findUserByEmail = async (email) => {
    return await User.findOne({email})
}

export const findUserById = async (id) => {
    // console.log(id)
    return await User.findById(id);
}

export const createUser = async (name, email, password) => {
    // console.log(name, email,password);
    
    const newUser = new User({name, email, password,  isVerified:true})
    await newUser.save();
    // console.log(newUser);
    return newUser;
}

export const getAllUserUrlsDao = async (id) => {
    return await url.find({user:id});
}