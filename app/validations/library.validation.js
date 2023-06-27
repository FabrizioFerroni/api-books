import { body } from 'express-validator';
import validateResult from '../helpers/validate.helpers.js';

export const validateLibrary = [
    body('name')
    .notEmpty().withMessage('El campo nombre es requerido'),
    body('location')
    .notEmpty().withMessage('El campo dirección es requerido'),
    body('phone')
    .notEmpty().withMessage('El campo telefono es requerido'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]