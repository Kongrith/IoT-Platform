// import dotenv from "dotenv";
import express, { Application, Express, Request, Response } from 'express';
import cors from "cors";
const mongodb = require("mongodb");
// import * as authController from './controllers/authController';
import router from './routes/homeRoute'
// import mongoose from "mongoose";
// import { auth } from "./middleware/auth";

const app: Express = express();
const bodyParser = require("body-parser")

// mongodb config
const MongoClient = require("mongodb").MongoClient;

// Environment
// const dotenv = require('dotenv');           // ไฟล์ .env ต้องอยู่ level เดียวกันกับ package.json
// dotenv.config();
let BACKEND_PORT = process.env.BACKEND_PORT || 5500;    // 👉️ "5500"

// Middleware
const whitelist = ["http://localhost:3000", "http://localhost:8081", "http://localhost:4000"]; // 👇️ specify origins to allow

// ✅ Enable pre-flight requests
app.options("*", cors());

const corsOptions = {
  credentials: true,
  origin: (origin: any, callback: any) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());


// All routing here
app.use('/', router);
app.post('/login', router)
app.post('/register', router)
app.use('/about', router);
app.use('/dashboard', router);
app.use('/profile', router);
// app.use('/users', router);

app.listen(BACKEND_PORT, () => {
  console.log(`🟢 Server is running at http://localhost:${BACKEND_PORT}`)
})

