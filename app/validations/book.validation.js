import { body } from 'express-validator';
import validateResult from '../helpers/validate.helpers.js';

const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]{1,17}$/;

export const validateBook = [
    body('isbn')
    .notEmpty().withMessage('El campo isbn es requerido')
    .matches(isbnRegex).withMessage('El campo isbn no es válido'),
    body('title')
    .notEmpty().withMessage('El campo titulo es requerido'),
    body('author')
    .notEmpty().withMessage('El campo autor es requerido'),
    body('year')
    .notEmpty().withMessage('El campo año es requerido'),
    body('libraryId')
    .notEmpty().withMessage('El campo libraryId es requerido, necesita insertar el id de la libreria'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]