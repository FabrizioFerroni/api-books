import Book from "../models/book.model.js";
import Library from "../models/library.model.js";
import { db } from "../config/db.config.js";
const Op = db.Sequelize.Op;

export const getAll = async() => {
    try {
        const books = await Book.findAll({
            paranoid: true,
            attributes: ["id", "isbn", "title", "author", "year"],
            order: [
                ["id", "DESC"]
            ],
            include: [{
                model: Library,
                attributes: ["name", "location", "phone"]
            }]

        });

        return {
            statusCode: 200,
            books
        }
    } catch (error) {
        console.error('Hubo un error al obtener todos los libros: ', error);
        return { statusCode: 500, message: 'Hubo un error al obtener todos los libros' };
    }
}

export const getAllDeleted = async() => {
    try {
        const books = await Book.findAll({
            paranoid: false,
            where: {
                deletedAt: {
                    [Op.ne]: null
                }
            },
            attributes: ["id", "isbn", "title", "author", "year", "deletedAt"],
            order: [
                ["id", "DESC"]
            ],
            include: [{
                model: Library,
                attributes: ["name", "location", "phone"]
            }]
        })
        return {
            statusCode: 200,
            books
        }
    } catch (error) {
        console.error('Hubo un error al obtener todos los libros borrados: ', error);
        return { statusCode: 500, message: 'Hubo un error al obtener todos los libros borrados' };
    }
}

export const getById = async(params) => {
    const { id } = params;
    try {
        const book = await Book.findOne({
            paranoid: true,
            where: {
                id
            },
            attributes: ["id", "isbn", "title", "author", "year"],
            include: {
                model: Library,
                attributes: ["name", "location", "phone"]
            }
        });
        return {
            statusCode: 200,
            book
        }
    } catch (error) {
        console.error('Hubo un error al obtener un libro: ', error);
        return { statusCode: 500, message: 'Hubo un error al obtener un libro' };
    }
}

export const create = async(body) => {
    const { isbn, title, author, year, libraryId } = body;
    try {
        const book = await Book.create({
            isbn,
            title,
            author,
            year,
            libraryId
        });
        if (book) {
            return { statusCode: 201, message: "Se creo con éxito el libro!", data: book };
        } else {
            return { statusCode: 404, message: 'No se pudo crear el libro' };
        }

    } catch (error) {
        console.error('Hubo un error al crear el libro: ', error);
        return { statusCode: 500, message: 'Hubo un error al crear el libro' };
    }
}

export const update = async(params, body) => {
    const { id } = params;
    const { isbn, title, author, year, libraryId } = body;

    try {
        const registered = await Book.findByPk(id);
        if (!registered) {
            return { statusCode: 404, message: 'No se ha encontrado un libro con el id ingresado' };
        }

        const book = await Book.update({
            isbn,
            title,
            author,
            year,
            libraryId
        }, {
            where: {
                id: id
            }
        })

        if (book) {
            return { statusCode: 200, message: "Se actualizo con exito el libro" }
        } else {
            return { statusCode: 404, message: 'No se pudo actualizar el libro' };
        }
    } catch (error) {
        console.error('Hubo un error al actualizar el libro: ', error);
        return { statusCode: 500, message: 'Hubo un error al actualizar el libro' };
    }
}

export const remove = async(params) => {
    const { id } = params;
    try {
        const registered = await Book.findByPk(id);
        if (!registered) {
            return { statusCode: 404, message: 'No se ha encontrado un libro con el id ingresado' };
        }

        const bookDestroy = await Book.destroy({
            where: {
                id
            }
        });
        if (bookDestroy) {
            return { statusCode: 200, message: "Se elimino con éxito el libro" }
        } else {
            return { statusCode: 404, message: 'No se pudo eliminar el libro' };
        }
    } catch (error) {
        console.error('Hubo un error al eliminar el libro: ', error);
        return { statusCode: 500, message: 'Hubo un error al eliminar el libro' };
    }
}

export const restore = async(params) => {
    const { id } = params;
    try {
        const registered = await Book.findByPk(id, { paranoid: false });
        if (!registered) {
            return { statusCode: 404, message: 'No se ha encontrado un libro con el id ingresado' };
        }
        const bookRestore = await Book.restore({
            where: {
                id: id
            }
        });
        if (bookRestore) {
            return { statusCode: 200, message: "Se restauró con éxito el libro" }
        } else {
            return { statusCode: 404, message: 'No se pudo restaurar el libro' };
        }
    } catch (error) {
        console.error('Hubo un error al restaurar el libro: ', error);
        return { statusCode: 500, message: 'Hubo un error al restaurar el libro' };
    }
}