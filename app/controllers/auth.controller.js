import { registerUser } from "../services/auth.services.js";
import bcrypt from "bcryptjs";
export async function registerUserCont(req, res) {
    const { name, lastname, username, password } = req.body;
    try {
        const data = {
            name: name,
            lastname: lastname,
            username: username,
            password: bcrypt.hashSync(password, 8)
        }
        const user = await registerUser(data);
        res.status(201).json({ message: 'Se creo con éxito el usuario', usuario: user });
    } catch (error) {
        res.status(400).json(error);
    }
}