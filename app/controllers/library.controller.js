import { getAllLib, getAllDeletedLib, getByIdLib, createLib, updateLib, removeLib, restoreLib } from "../services/library.services.js";

export async function getAllContLib(req, res) {
    try {
        const data = await getAllLib();
        const { statusCode, ...responseData } = data;
        res.status(statusCode).json(responseData);
    } catch (err) {
        res.status(500).json(err.message);
    }
}
export async function getAllDelContLib(req, res) {
    try {
        const data = await getAllDeletedLib();
        const { statusCode, ...responseData } = data;
        res.status(statusCode).json(responseData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getByIdContLib(req, res) {
    try {
        const data = await getByIdLib(req.params);
        const { statusCode, ...responseData } = data;
        res.status(statusCode).json(responseData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function createContLib(req, res) {
    try {
        const data = await createLib(req.body);
        const { statusCode, ...responseData } = data;
        res.status(statusCode).json(responseData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function updateContLib(req, res) {
    try {
        const data = await updateLib(req.params, req.body);
        const { statusCode, ...responseData } = data;
        res.status(statusCode).json(responseData);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function removeContLib(req, res) {
    try {
        const data = await removeLib(req.params);
        const { statusCode, ...responseData } = data;
        res.status(statusCode).json(responseData);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function restoreContLib(req, res) {
    try {
        const data = await restoreLib(req.params);
        const { statusCode, ...responseData } = data;
        res.status(statusCode).json(responseData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}