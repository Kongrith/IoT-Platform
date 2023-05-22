"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import dotenv from "dotenv";
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb = require("mongodb");
// import * as authController from './controllers/authController';
const homeRoute_1 = __importDefault(require("./routes/homeRoute"));
// import mongoose from "mongoose";
// import { auth } from "./middleware/auth";
const app = (0, express_1.default)();
const bodyParser = require("body-parser");
// mongodb config
const MongoClient = require("mongodb").MongoClient;
// Environment
// const dotenv = require('dotenv');           // ไฟล์ .env ต้องอยู่ level เดียวกันกับ package.json
// dotenv.config();
let BACKEND_PORT = process.env.BACKEND_PORT || 5500; // 👉️ "5500"
// Middleware
const whitelist = ["http://localhost:3000", "http://localhost:8081", "http://localhost:4000"]; // 👇️ specify origins to allow
// ✅ Enable pre-flight requests
app.options("*", (0, cors_1.default)());
const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};
// app.use(express.json());
app.use((0, cors_1.default)(corsOptions));
app.use(bodyParser.json());
// All routing here
app.use('/', homeRoute_1.default);
app.post('/login', homeRoute_1.default);
app.post('/register', homeRoute_1.default);
app.use('/about', homeRoute_1.default);
app.use('/dashboard', homeRoute_1.default);
app.use('/profile', homeRoute_1.default);
// app.use('/users', router);
app.listen(BACKEND_PORT, () => {
    console.log(`🟢 Server is running at http://localhost:${BACKEND_PORT}`);
});
