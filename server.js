import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { db } from "./app/config/db.config.js";
import { config } from "dotenv";
config();
import colors from "colors";
import User from './app/models/user.model.js';
import bcrypt from "bcryptjs";



const tz = process.env.TZ || 'America/Argentina/Cordoba';
const app = express();
const entorno = process.env.NODE_ENV || 'dev';

let corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

app.use(morgan(entorno));

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

import './app/models/library.model.js';
import './app/models/book.model.js';
import './app/models/user.model.js';
import './app/models/relations.model.js';

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Bienvenido a la api de libros. Hecha por Fabrizio Ferroni." });
});

// Import routes
import authRoutes from "./app/routes/auth.routes.js";
import userRoutes from "./app/routes/user.routes.js";
import libraryRoutes from "./app/routes/library.routes.js";
import bookRoutes from "./app/routes/book.routes.js";

app.use("/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", libraryRoutes);
app.use("/api", bookRoutes);

app.use((req, res, next) => {
    req.timezone = tz; // Establece la zona horaria deseada
    next();
});

// set port, listen for requests
const server_port = process.env.API_PORT || 8080;

// Verifica si el usuario ya fue creado previamente
let userCreated = false;
const syncAndCreateUser = async() => {
    try {
        const userRegister = await User.findOne({ where: { username: "admin" } });
        if (userRegister) {
            userCreated = true;
        }

        // Verifica si el usuario ya fue creado previamente
        if (!userCreated) {
            await User.create({
                name: "Admin",
                lastname: "Library",
                username: "admin",
                password: bcrypt.hashSync("admin", 8)
            });
            console.log('Usuario creado con éxito');
            userCreated = true; // Marca el estado de creación como true para futuras ejecuciones
        }
    } catch (error) {
        console.error('Error al sincronizar y crear el usuario:', error);
    }
};
const init = async() => {
    try {
        await db.sync({ force: false });
        syncAndCreateUser();
        app.listen(server_port, () => console.log(`El servidor se ejecuta en el puerto: ${server_port} sin problemas`.green));
    } catch (error) {
        console.error(`Error trying to connect to the server: ${error}`.bgRed.white)
    }
}

init();