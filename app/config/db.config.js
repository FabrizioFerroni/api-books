import Sequelize from "sequelize";
import colors from "colors";
import { config } from "dotenv";
config();

export const db = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: console.log
});

export const testDbConnection = async() => {
    try {
        await db.authenticate();
        console.log("Connection has been established successfully.".bgGreen.white);
    } catch (error) {
        console.error("Unable to connect to the database: \n".bgRed.black, error);
    }
};