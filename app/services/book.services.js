import Book from "../models/book.model.js";
import User from "../models/user.model.js";
import Library from "../models/library.model.js";
import { db } from "../config/db.config.js";
const Op = db.Sequelize.Op;

export const getAll = async(userId) => {
    const books = await Book.findAll({
        paranoid: true,
        where: {
            userId: userId
        },
        attributes: ["id", "isbn", "title", "author", "year"],
        order: [
            ["id", "DESC"]
        ],
        include: {

            model: User,
            attributes: ["name", "lastname", "username"]
        }

    });

    return books;
}

export const getAllDeleted = async(userId) => {
    const books = await Book.findAll({
        paranoid: false,
        where: {
            deletedAt: {
                [Op.ne]: null
            },
            userId: userId
        },
        attributes: ["id", "isbn", "title", "author", "year", "deletedAt"],
        order: [
            ["id", "DESC"]
        ],
        include: {
            model: User,
            attributes: ["name", "lastname", "username"]
        },
    })
    return books;
}

export const getById = async(id, userId) => {
    const book = await Book.findOne({
        paranoid: true,
        where: {
            id: id,
            userId: userId
        },
        attributes: ["id", "isbn", "title", "author", "year"],
        include: {
            model: User,
            attributes: ["name", "lastname", "username"]
        }
    });

    return book;
}

export const create = async(book) => {
    const newBook = await Book.create(book);
    return newBook;
}

export const update = async(id, book) => {
    const registered = await Book.findByPk(id, { paranoid: true });
    if (!registered) {
        return false;
    }
    await Book.update(book, {
        where: {
            id: id
        }
    });

    return true;
}

export const remove = async(id) => {
    const registered = await Book.findByPk(id, { paranoid: true });
    if (!registered) {
        return false;
    }
    await Book.destroy({
        where: {
            id: id
        }
    });
    return true;
}

export const restore = async(id) => {
    const registered = await Book.findByPk(id, { paranoid: false });
    if (!registered) {
        return false;
    }
    await Book.restore({ where: { id: id } });
    return true;
}