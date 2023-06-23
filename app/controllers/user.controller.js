import { getAllUsers } from "../services/user.services.js";

export async function getAllUsersCont(req, res) {
    try {
        const data = await getAllUsers();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}