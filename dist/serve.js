"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./database/index"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
class Serve {
    constructor() {
        this.server = express_1.default();
        this.dataBase();
    }
    dataBase() {
        index_1.default.authenticate();
    }
    middlaware() {
        this.server.use(cors_1.default());
        this.server.use(express_1.default.json());
        this.server.use(express_1.default.urlencoded({ extended: true }));
        this.server.use(express_1.default.json());
    }
    router() {
        this.server.use(router_1.default);
    }
}
exports.default = new Serve().server;
