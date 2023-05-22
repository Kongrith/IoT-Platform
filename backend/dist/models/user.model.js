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
exports.UserModel = void 0;
// import { Schema, model, connect } from 'mongoose';
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// const uniqueValidator = require("mongoose-unique-validator");
// ดึง environment
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// 2. Create a Schema corresponding to the document interface.
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String },
});
// ป้องกันการลงทะเบียนซ้ำชื่อกัน
// UserSchema.plugin( uniqueValidator, {message: 'username is already taken.'});
// middleware สำหรับ hash password
const saltRounds = Number(process.env.SALT);
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified('password')) {
            user.password = yield bcrypt_1.default.hash(user.password, saltRounds);
        }
        next();
    });
});
// 3. Create a Model.
exports.UserModel = mongoose_1.default.model('users', UserSchema);
// 4. สร้าง Addmin User
checkAdmin();
function checkAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, mongoose_1.connect)(`${process.env.CONNECTION_STRING}`);
        const foundAdmin = yield exports.UserModel.findOne({ username: 'admin' });
        // ถ้าไม่พบชื่อในฐานข้อมูล
        if (!foundAdmin) {
            console.log(`Creating admin acount`);
            const user = new exports.UserModel({
                username: 'admin',
                email: 'admin@gmail.com',
                password: '1234',
                role: 'admin'
            });
            user.save();
        }
    });
}
