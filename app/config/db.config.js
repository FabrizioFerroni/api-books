import Sequelize from "sequelize";
import { config } from "dotenv";
config();

export const db = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: false
});