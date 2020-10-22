import {Sequelize} from 'sequelize'
import * as dotenv from "dotenv";
dotenv.config()


const db = new Sequelize(process.env.NAME , process.env.USER_DB, process.env.PASSWORD, {
    dialect: 'postgres',
    host: 'localhost',
    define: {
        timestamps: true,
        underscored: true,
    },
})
export default db;