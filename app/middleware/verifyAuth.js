import Jwt from "jsonwebtoken";
import User from '../models/user.model.js';
import moment from 'moment';

const secret = process.env.JWT_SECRET || "";

export function validateLogin(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(403).send({ message: `You don't have sent a token` });

    let token = authorization.replace(/['"]+/g, '');

    let seg = token.split('.');

    if (seg.length != 3) {
        return res.status(403).send({ message: 'Invalid Token' });
    } else {
        try {
            const payload = Jwt.decode(token, secret);
            if (payload.exp <= moment().unix()) {
                return res.status(403).send({ message: 'Expired Token' });
            }
        } catch (error) {
            return res.status(403).send({ message: 'Invalid Token' });
        }
    }

    Jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        req.username = decoded.username;
    });
};