import Book from '../models/book.model.js'
export function checkDuplicateISBN(req, res, next) {
    const { isbn } = req.body;
    // username
    Book.findOne({
        where: {
            isbn: isbn
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