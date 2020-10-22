"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes = express_1.Router();
const multer_1 = __importDefault(require("multer"));
const uploadControllers_1 = __importDefault(require("./app/controllers/uploadControllers"));
const index_1 = __importDefault(require("./storage/index"));
const multer_2 = __importDefault(require("./config/multer"));
const upload = multer_1.default(multer_2.default);
routes.get('/list', uploadControllers_1.default.index);
routes.post('/upload', upload.single('file'), index_1.default.uploadFile, uploadControllers_1.default.store);
routes.put('/upload-update/:path_buket/:id', upload.single('file'), index_1.default.updateFile, uploadControllers_1.default.update);
routes.delete('/remove-upload/:path_buket/:id', index_1.default.removeFile, uploadControllers_1.default.delete);
exports.default = routes;
