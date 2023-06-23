import { getAllLib, getAllDeletedLib, getByIdLib, createLib, updateLib, removeLib, restoreLib } from "../services/library.services.js";

export async function getAllContLib(req, res) {
    try {
        const userId = 1;
        const data = await getAllLib(userId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function getAllDelContLib(req, res) {
    try {
        const userId = 1;
        const data = await getAllDeletedLib(userId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getByIdContLib(req, res) {
    try {
        const id = req.params.id;
        const userId = 1;
        const data = await getByIdLib(id, userId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function createContLib(req, res) {
    try {
        const { name, location, phone } = req.body;
        const library = {
            name: name,
            location: location,
            phone: phone,
            userId: 1,
        }
        const data = await createLib(library);
        res.status(201).json({ message: 'Se creo con éxito la biblioteca', data: data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function updateContLib(req, res) {
    try {
        const id = req.params.id;
        if (!id || id === undefined) {
            res.status(400).json({ message: 'No se puede actualizar la biblioteca sin id' });
            return;
        }

        const { name, location, phone } = req.body;
        const library = {
            name: name,
            location: location,
            phone: phone,
            userId: 1,
        }
        const data = await updateLib(id, library);
        if (data) {
            res.status(200).json({ message: 'Se actualizo con éxito la biblioteca' });
        } else {
            res.status(400).json({ message: 'No se pudo actualizar la biblioteca' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function removeContLib(req, res) {
    try {
        const id = req.params.id;
        if (!id || id === undefined) {
            res.status(400).json({ message: 'No se puede eliminar la biblioteca sin id' });
            return;
        }
        const data = await removeLib(id);
        if (data) {
            res.status(200).json({ message: 'Se elimino con éxito la biblioteca' });
        } else {
            res.status(400).json({ message: 'No se pudo eliminar la biblioteca' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function restoreContLib(req, res) {
    try {
        const id = req.params.id;
        if (!id || id === undefined) {
            res.status(400).json({ message: 'No se puede restaurar la biblioteca sin id' });
            return;
        }
        const data = await restoreLib(id);
        if (data) {
            res.status(200).json({ message: 'Se restauro con éxito la biblioteca' });
        } else {
            res.status(400).json({ message: 'No se pudo restaurar la biblioteca' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}