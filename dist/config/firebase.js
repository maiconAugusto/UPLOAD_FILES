"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data = require('./serviceAccountKey.json');
const firebase_admin_1 = __importDefault(require("firebase-admin"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(data),
    storageBucket: "gs://upload-7195b.appspot.com"
});
let bucket = firebase_admin_1.default.storage().bucket();
exports.default = bucket;
