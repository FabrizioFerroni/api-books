import Jwt from "jsonwebtoken";
import User from '../models/user.model.js';
import moment from 'moment';

const secret = process.env.JWT_SECRET || "";

export function validateLogin(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(403).send({ message: `No has enviado un token.` });

    let token = authorization.replace(/['"]+/g, '');

    let seg = token.split('.');

    if (seg.length != 3) {
        return res.status(403).send({ message: 'Token invalido' });
    } else {
        try {
            const payload = Jwt.decode(token, secret);
            if (payload.exp <= moment().unix()) {
                return res.status(403).send({ message: 'Token expirado' });
            }
        } catch (error) {
            return res.status(403).send({ message: 'Token invalido' });
        }
    }

    Jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "No estas autorizado para hacer esta operacion!"
            });
        }
        req.userId = decoded.id;
        req.username = decoded.username;
        next();
    });
};

export function checkDuplicateUsername(req, res, next) {
    const { username } = req.body;
    // username
    User.findOne({
        where: {
            username: username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "¡Upss... hubo un error 😣! ¡El nombre de usuario ya está en uso!"
            });
            return;
        }

        next();
    });
};