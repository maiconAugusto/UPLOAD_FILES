"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../database/index"));
const sequelize_1 = __importDefault(require("sequelize"));
const files = index_1.default.define('files', {
    id: {
        allowNull: false,
        type: sequelize_1.default.UUID,
        defaultValue: sequelize_1.default.UUIDV4,
        primaryKey: true,
    },
    file_url: {
        type: sequelize_1.default.STRING,
        allowNull: true,
    },
    path_buket: {
        type: sequelize_1.default.STRING,
        allowNull: true,
    },
});
files.sync({ force: false });
exports.default = files;
