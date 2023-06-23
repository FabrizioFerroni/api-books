import Library from "../models/library.model.js";
import User from "../models/user.model.js";
import Book from "../models/book.model.js";
import { db } from "../config/db.config.js";
const Op = db.Sequelize.Op;

export const getAllLib = async(userId) => {
    const libraries = await Library.findAll({
        paranoid: true,
        where: {
            userId: userId
        },
        attributes: ["id", "name", "location", "phone"],
        order: [
            ["id", "DESC"]
        ],
        include: [{
            model: Book,
            attributes: ["isbn", "title", "author", "year"]
        }, {
            model: User,
            attributes: ["name", "lastname", "username"]
        }]

    });

    return libraries;
}

export const getAllDeletedLib = async(userId) => {
    const libraries = await Library.findAll({
        paranoid: false,
        where: {
            deletedAt: {
                [Op.ne]: null
            },
            userId: userId
        },
        attributes: ["id", "name", "location", "phone", "deletedAt"],
        order: [
            ["id", "DESC"]
        ],
        include: {
            model: Book,
            attributes: ["isbn", "title", "author", "year"]
        },
        include: {
            model: User,
            attributes: ["name", "lastname", "username"]
        },
    })
    return libraries;
}

export const getByIdLib = async(id, userId) => {
    const library = await Library.findOne({
        paranoid: true,
        where: {
            id: id,
            userId: userId
        },
        attributes: ["id", "name", "location", "phone"],
        include: {
            model: Book,
            attributes: ["isbn", "title", "author", "year"]
        },
        include: {
            model: User,
            attributes: ["name", "lastname", "username"]
        }
    });

    return library;
}

export const createLib = async(library) => {
    const newLibrary = await Library.create(library);
    return newLibrary;
}

export const updateLib = async(id, library) => {
    const registered = await Library.findByPk(id);
    if (!registered) {
        return false;
    }
    await Library.update(library, {
        where: {
            id: id
        }
    });

    return true;
}

export const removeLib = async(id) => {
    const registered = await Library.findByPk(id);
    if (!registered) {
        return false;
    }
    await Library.destroy({
        where: {
            id: id
        }
    });
    return true;
}

export const restoreLib = async(id) => {
    const registered = await Library.findByPk(id, { paranoid: false });
    if (!registered) {
        return false;
    }
    await Library.restore({ where: { id: id } });
    return true;
}