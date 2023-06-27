import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const registerUser = async(body) => {
    const { name, lastname, username, password } = body;

    try {
        const user = await User.create({
            name: name,
            lastname: lastname,
            username: username,
            password: bcrypt.hashSync(password, 8)
        });
        if (user) {
            return { statusCode: 201, message: "El usuario se registró con éxito!" };
        }
    } catch (err) {
        return { statusCode: 500, message: err.message }
    }
}


export const loginUser = async(userBody) => {
    const { username, password } = userBody;

    try {
        const user = await User.findOne({
            where: { username }
        });

        if (!user) {
            return { statusCode: 404, message: "No se ha encontrado un usuario." };
        }

        let passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return {
                statusCode: 400,
                message: "Nombre de usuario o contraseña inválido. Por favor intente de nuevo"
            };
        }

        let token = Jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1h' });

        return {
            statusCode: 200,
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            username: user.username,
            accessToken: token
        };
    } catch (err) {
        return { message: err.message }
    }
}

export const refreshTokenUser = async(body) => {
    try {
        const { token } = body;
        const decoded = Jwt.verify(token, secret);
        const userId = decoded.id;

        if (token === null) {
            return { statusCode: 400, message: 'El token no puede estar en blanco' };;
        }

        const user = await User.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            return { statusCode: 404, message: 'Usuario no encontrado' };
        }
        let newToken = Jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1h' });

        return { statusCode: 200, mesagge: 'Se generó un nuevo token', refresh_token: newToken };

    } catch (error) {
        console.error('No se pudo renovar el token:', error);
        return { statusCode: 500, message: 'No se pudo renovar el token' };
    }
}