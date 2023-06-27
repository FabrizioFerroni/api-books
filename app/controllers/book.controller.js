import { getAll, getAllDeleted, getById, create, update, remove, restore } from "../services/book.services.js";

export async function getAllCont(req, res) {
    try {
        const data = await getAll();
        const { statusCode, ...responseData } = data;
        res.status(statusCode).json(responseData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function getAllDelCont(req, res) {
    try {
        const data = await getAllDeleted();
        const { statusCode, ...responseData } = data;
        res.status(statusCode).json(responseData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getByIdCont(req, res) {
    try {
        const data = await getById(req.params);
        const { statusCode, ...responseData } = data;
        res.status(statusCode).json(responseData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function createCont(req, res) {
    try {
        const data = await create(req.body);
        const { statusCode, ...responseData } = data;
        res.status(statusCode).json(responseData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function updateCont(req, res) {
    try {
        const data = await update(req.params, req.body);
        const { statusCode, ...responseData } = data;
        res.status(statusCode).json(responseData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function removeCont(req, res) {
    try {
        const data = await remove(req.params);
        const { statusCode, ...responseData } = data;
        res.status(statusCode).json(responseData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function restoreCont(req, res) {
    try {
        const data = await restore(req.params);
        const { statusCode, ...responseData } = data;
        res.status(statusCode).json(responseData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}