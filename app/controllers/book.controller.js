import { getAll, getAllDeleted, getById, create, update, remove, restore } from "../services/book.services.js";

export async function getAllCont(req, res) {
    try {
        const userId = 1;
        const data = await getAll(userId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function getAllDelCont(req, res) {
    try {
        const userId = 1;
        const data = await getAllDeleted(userId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getByIdCont(req, res) {
    try {
        const id = req.params.id;
        const userId = 1;
        const data = await getById(id, userId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function createCont(req, res) {
    try {
        const { title, isbn, author, year, libraryId } = req.body;
        const book = {
            isbn: isbn,
            title: title,
            author: author,
            year: year,
            libraryId: libraryId,
            userId: 1,
        }
        const data = await create(book);
        res.status(201).json({ message: 'Se creo con éxito el libro', data: data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function updateCont(req, res) {
    try {
        const id = req.params.id;
        if (!id || id === undefined) {
            res.status(400).json({ message: 'No se puede actualizar el libro sin id' });
            return;
        }

        const { title, isbn, author, year, libraryId } = req.body;
        const book = {
            isbn: isbn,
            title: title,
            author: author,
            year: year,
            libraryId: libraryId,
            userId: 1,
        }
        const data = await update(id, book);
        if (data) {
            res.status(200).json({ message: 'Se actualizo con éxito el libro' });
        } else {
            res.status(400).json({ message: 'No se pudo actualizar el libro' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function removeCont(req, res) {
    try {
        const id = req.params.id;
        if (!id || id === undefined) {
            res.status(400).json({ message: 'No se puede eliminar el libro sin id' });
            return;
        }
        const data = await remove(id);
        if (data) {
            res.status(200).json({ message: 'Se elimino con éxito el libro' });
        } else {
            res.status(400).json({ message: 'No se pudo eliminar el libro' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function restoreCont(req, res) {
    try {
        const id = req.params.id;
        if (!id || id === undefined) {
            res.status(400).json({ message: 'No se puede eliminar el libro sin id' });
            return;
        }
        const data = await restore(id);
        if (data) {
            res.status(200).json({ message: 'Se restauro con éxito el libro' });
        } else {
            res.status(400).json({ message: 'No se pudo restaurar el libro' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}