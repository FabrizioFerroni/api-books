import Library from "../models/library.model.js";
import Book from "../models/book.model.js";
import { db } from "../config/db.config.js";
const Op = db.Sequelize.Op;

export const getAllLib = async() => {
    try {
        const libraries = await Library.findAll({
            paranoid: true,
            attributes: ["id", "name", "location", "phone"],
            order: [
                ["id", "DESC"]
            ],
            include: [{
                model: Book,
                attributes: ["isbn", "title", "author", "year"]
            }]

        });

        return {
            statusCode: 200,
            libraries
        }
    } catch (error) {
        console.error('Hubo un error al obtener todas las bibliotecas: ', error);
        return { statusCode: 500, message: 'Hubo un error al obtener todas las bibliotecas' };
    }
}

export const getAllDeletedLib = async() => {
    try {
        const libraries = await Library.findAll({
            paranoid: false,
            where: {
                deletedAt: {
                    [Op.ne]: null
                }
            },
            attributes: ["id", "name", "location", "phone", "deletedAt"],
            order: [
                ["id", "DESC"]
            ],
            include: {
                model: Book,
                attributes: ["isbn", "title", "author", "year"]
            }
        })
        return {
            statusCode: 200,
            libraries
        }
    } catch (error) {
        console.error('No se pudo obtener todas las bibliotecas: ', error);
        return { statusCode: 500, message: 'No se pudo obtener todas las bibliotecas' };
    }
}

export const getByIdLib = async(params) => {
    const { id } = params;
    try {
        const library = await Library.findOne({
            paranoid: true,
            where: {
                id: id
            },
            attributes: ["id", "name", "location", "phone"],
            include: {
                model: Book,
                attributes: ["isbn", "title", "author", "year"]
            }
        });

        return { statusCode: 200, library };
    } catch (error) {
        console.error('No se pudo obtener la biblioteca: ', error);
        return { statusCode: 500, message: 'No se pudo obtener la biblioteca' };
    }
}

export const createLib = async(body) => {
    const { name, location, phone } = body;
    try {
        const library = await Library.create({
            name,
            location,
            phone
        });
        if (library) {
            return { statusCode: 201, message: "Se creo con éxito la biblioteca!", data: library };
        } else {
            return { statusCode: 404, message: 'No se pudo crear la biblioteca' };
        }

    } catch (error) {
        console.error('Hubo un error al crear la biblioteca: ', error);
        return { statusCode: 500, message: 'Hubo un error al crear la biblioteca' };
    }
}

export const updateLib = async(params, body) => {
    const { id } = params;
    const { name, location, phone } = body;
    try {
        const registered = await Library.findByPk(id);
        if (!registered) {
            return { statusCode: 404, message: 'No se ha encontrado una libreria con el id ingresado' };
        }

        const library = await Library.update({
            name,
            location,
            phone
        }, {
            where: {
                id: id
            }
        })

        if (library) {
            return { statusCode: 200, message: "Se actualizo con exito la biblioteca" }
        } else {
            return { statusCode: 404, message: 'No se pudo actualizar la biblioteca' };
        }
    } catch (error) {
        console.error('Hubo un error al actualizar la biblioteca: ', error);
        return { statusCode: 500, message: 'Hubo un error al actualizar la biblioteca' };
    }
}

export const removeLib = async(params) => {
    const { id } = params;
    try {
        const registered = await Library.findByPk(id);
        if (!registered) {
            return { statusCode: 404, message: 'No se ha encontrado una libreria con el id ingresado' };
        }

        const libraryDestroy = await Library.destroy({
            where: {
                id
            }
        });
        if (libraryDestroy) {
            return { statusCode: 200, message: "Se elimino con éxito la biblioteca" }
        } else {
            return { statusCode: 404, message: 'No se pudo eliminar la biblioteca' };
        }
    } catch (error) {
        console.error('Hubo un error al eliminar la biblioteca: ', error);
        return { statusCode: 500, message: 'Hubo un error al eliminar la biblioteca' };
    }
}

export const restoreLib = async(params) => {
    const { id } = params;
    try {
        const registered = await Library.findByPk(id, { paranoid: false });
        if (!registered) {
            return { statusCode: 404, message: 'No se ha encontrado una libreria con el id ingresado' };
        }
        const libraryRestore = await Library.restore({
            where: {
                id: id
            }
        });
        if (libraryRestore) {
            return { statusCode: 200, message: "Se restauró con éxito la biblioteca" }
        } else {
            return { statusCode: 404, message: 'No se pudo restaurar la biblioteca' };
        }
    } catch (error) {
        console.error('Hubo un error al restaurar la biblioteca: ', error);
        return { statusCode: 500, message: 'Hubo un error al restaurar la biblioteca' };
    }
}