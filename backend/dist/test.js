"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
bcryptjs_1.default.hash('my password', 'my salt', ((err), (hash)), {
    // Store hash password in DB
    if(, err) { console.log(hash); }
});
