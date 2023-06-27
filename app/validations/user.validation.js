import { body, matchedData, check } from 'express-validator';
import validateResult from '../helpers/validate.helpers.js';

export const register_user = [
    body('name').notEmpty().withMessage('El campo de nombre es obligatorio.'),
    body('lastname').notEmpty().withMessage('El campo de apellido es obligatorio.'),
    body('username')
    .notEmpty().withMessage('El campo nombre de usuario es obligatorio...')
    .isLength({ min: 3, max: 20 }).withMessage('El campo nombre de usuario debe tener entre 3 y 20 caracteres..'),
    body('password')
    .notEmpty().withMessage('El campo de contraseña es obligatorio.')
    .isLength({ min: 4, max: 20 }).withMessage('La contraseña debe tener entre 4 y 20 caracteres')
    .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una letra mayúscula')
    .matches(/[a-z]/).withMessage('La contraseña debe contener al menos una letra minúscula')
    .matches(/[0-9]/).withMessage('La contraseña debe contener al menos un número')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('La contraseña debe contener al menos un símbolo'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const login_user = [
    body('username')
    .notEmpty().withMessage('El campo username es obligatorio.')
    .isLength({ min: 3, max: 20 }).withMessage('El campo de nombre de usuario debe tener entre 3 y 20 caracteres..'),
    body('password')
    .notEmpty().withMessage('El campo password es obligatorio.')
    .isLength({ min: 4, max: 20 }).withMessage('La contraseña debe tener entre 4 y 20 caracteres'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const refresh_token = [
    body('token')
    .notEmpty().withMessage('El campo token es obligatorio.'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]