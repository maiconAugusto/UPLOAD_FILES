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
const firebase_1 = __importDefault(require("../config/firebase"));
const fs_1 = require("fs");
exports.default = {
    uploadFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.file === undefined) {
                return next();
            }
            const metadata = {
                metadata: {
                    firebaseStorageDownloadTokens: req.file.filename
                },
                contentType: 'image/png',
                cacheControl: 'public, max-age=31536000',
            };
            yield firebase_1.default.upload(req.file.path, {
                gzip: true,
                metadata: metadata,
            });
            let file = yield Promise.resolve("https://firebasestorage.googleapis.com/v0/b/" + firebase_1.default.name + "/o/" + encodeURIComponent(req.file.filename) + "?alt=media&token=" + req.file.filename);
            req.body = {
                file_url: file,
                path_buket: req.file.filename
            };
            fs_1.unlink(req.file.path, () => { });
            next();
        });
    },
    updateFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { path_buket } = req.params;
            const metadata = {
                metadata: {
                    firebaseStorageDownloadTokens: req.file.filename
                },
                contentType: 'image/png',
                cacheControl: 'public, max-age=31536000',
            };
            firebase_1.default.deleteFiles({
                prefix: path_buket
            }, function (err) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!err) {
                        yield firebase_1.default.upload(req.file.path, {
                            gzip: true,
                            metadata: metadata,
                        });
                        let file = yield Promise.resolve("https://firebasestorage.googleapis.com/v0/b/" + firebase_1.default.name + "/o/" + encodeURIComponent(req.file.filename) + "?alt=media&token=" + req.file.filename);
                        req.body = {
                            file_url: file,
                            path_buket: req.file.filename
                        };
                        fs_1.unlink(req.file.path, () => { });
                        next();
                    }
                });
            });
        });
    },
    removeFile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { path_buket } = req.params;
            firebase_1.default.deleteFiles({
                prefix: path_buket
            }, function (err) {
                if (!err) {
                    return next();
                }
                return res.status(400).json({ data: 'Not found!' });
            });
        });
    }
};
