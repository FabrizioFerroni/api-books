import User from "../models/user.model.js";

export const getAllUsers = () => {
    const users = User.findAll({
        attributes: ["id", "name", "lastname", "username"],
        order: [
            ["id", "DESC"]
        ]
    });
    return users;
}