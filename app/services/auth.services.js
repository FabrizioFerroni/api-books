import User from "../models/user.model.js";

export const registerUser = async(user) => {
    const newUser = await User.create(user);
    return newUser;
}