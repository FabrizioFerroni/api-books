import { loginUser, refreshTokenUser, registerUser } from "../services/auth.services.js";

export async function registerUserCont(req, res) {
    try {
        const user = await registerUser(req.body);
        const { statusCode, ...responseData } = user;
        res.status(statusCode).json(responseData);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export async function login(req, res) {
    try {
        const user = await loginUser(req.body);
        const { statusCode, ...responseData } = user;
        res.status(statusCode).json(responseData);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export async function refreshToken(req, res) {
    try {
        const user = await refreshTokenUser(req.body);
        const { statusCode, ...responseData } = user;
        res.status(statusCode).json(responseData);
    } catch (error) {
        res.status(500).json(error.message)
    }
}