"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.profile = exports.dashboard = exports.register = exports.login = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb = require("mongodb");
// import { getErrorMessage } from '../utils/errors.util';
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
const userServices = __importStar(require("../services/user.service"));
// import { connect } from 'mongoose';
// import { InputLoginForm, InputRegisterForm } from "../app-types/login.type";
const error_util_1 = require("../utils/error.util");
// import {UserModel, I_UserDocument} from "../models/user.model"
//
dotenv_1.default.config();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        userServices.login(req, res);
    }
    catch (error) {
        console.log(error);
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        userServices.register(req, res);
    }
    catch (err) {
        return res.status(500).send((0, error_util_1.getErrorMessage)(err));
    }
});
exports.register = register;
const dashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('dashboard');
        res.status(200).json({ message: 'Hello from dashboard' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send((0, error_util_1.getErrorMessage)(error));
    }
});
exports.dashboard = dashboard;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('profile');
        res.status(200).json({ message: 'Hello from profile' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send((0, error_util_1.getErrorMessage)(error));
    }
});
exports.profile = profile;
// export const users = async (req: Request, res: Response) => {
//   try {
//       userServices.getSample(req , res)
//   } catch(error) {
//       console.log(error)
//   }
// };
// app.get("/users", (requst:Request, response:Response) => {
//   mongodb.MongoClient.connect(url, (err:string, client:any) => {
//     if (err) throw err;
//     console.log("connected to database successfully...");
//     const db = client.db("IoTPlatform");
//     // Count the total documents
//     // const lengthDatabase = db.collection.countDocuments().then((count_documents:number) =>{
//     //   console.log(count_documents);
//     // }).catch((err:string) => {
//     //   console.log(err);
//     // })  
//     const result = db
//       .collection("users")
//       .find()
//       .toArray((err:string, res:object) => {
//         response.send(res);
//       });
//   });
// });
