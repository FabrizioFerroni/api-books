import Book from '../models/book.model.js';
import { db } from "../config/db.config.js";
const Op = db.Sequelize.Op;
export function checkDuplicateISBN(req, res, next) {
    const { isbn } = req.body;
    const ISBNnormalized = isbn.replace(/-/g, '');
    const formattedISBN = `${ISBNnormalized}`;

    Book.findOne({
        where: {
            [Op.or]: [
                { isbn: isbn },
                db.where(
                    db.fn('replace', db.col('isbn'), '-', ''),
                    formattedISBN
                )
            ]
        }
    }).then(book => {
        if (book) {
            res.status(400).send({
                message: "¡Upss... hubo un error 😣! ¡El isbn no se puede duplicar!"
            });
            return;
        }

        next();
    });
};