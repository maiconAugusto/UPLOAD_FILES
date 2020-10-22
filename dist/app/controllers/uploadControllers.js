"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const upload_1 = __importDefault(require("../models/upload"));
exports.default = {
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield upload_1.default.create(req.body);
            return res.status(201).json({ data: response });
        });
    },
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield upload_1.default.findAll();
            return res.status(200).json({ data: response });
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield upload_1.default.update(req.body, { where: { id: id } });
            return res.status(200).json({ data: 'Updated successfully' });
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const response = yield upload_1.default.findOne({ where: { id: id } });
            if (!response) {
                return res.status(400).json({ data: 'File not found' });
            }
            yield upload_1.default.destroy({ where: { id: id } });
            return res.status(200).json({ data: 'Removed' });
        });
    }
};
