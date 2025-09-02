import { createUser, findUserByEmail } from "../dao/user.dao.js";
import { signToken } from "../utils/helper.js";
import bcrypt from "bcryptjs";

export const registerUserService = async (name, email, password) => {
    const user = await findUserByEmail(email);
    if (user) {
        throw new Error("User already exist.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(name, email, hashedPassword);
    const token = signToken({ id: newUser?._id });
    newUser.isRegistered = true;
    await newUser.save();
    return { token, newUser };
}

export const loginUserService = async (email, password) => {
    const user = await findUserByEmail(email);
    // console.log("Login user",user);
    if (!user) {
        throw new Error("No account with this email");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) throw new Error("Invalid Credentials");

    const token = signToken({ id: user?._id });
    return { token, user };
}