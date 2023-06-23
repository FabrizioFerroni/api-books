import { DataTypes } from "sequelize";
import { db } from "../config/db.config.js";

const User = db.define(
    "user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(150),
            allowNull: true,
            unique: true
        },
        password: {
            type: DataTypes.STRING(60),
            allowNull: false
        }
    }, {
        timestamps: true
    }
)

export default User;