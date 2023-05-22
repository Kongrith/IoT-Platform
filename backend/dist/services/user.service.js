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
exports.getSample = exports.register = exports.login = void 0;
const user_model_1 = require("../models/user.model");
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.CONNECTION_STRING);
function login(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        try {
            yield (0, mongoose_1.connect)(`${process.env.CONNECTION_STRING}`);
            const foundUser = yield user_model_1.UserModel.findOne({ username: username });
            // ถ้าไม่พบชื่อในฐานข้อมูล
            if (!foundUser) {
                // console.log(`User Not Found!`)
                return res.status(404).send({ message: 'Please recheck your username' });
            }
            //                        password-from-user, password-from-database
            const isMatch = bcrypt_1.default.compareSync(password, foundUser.password);
            if (isMatch) {
                // ตัวอย่าง foundUser
                // _id: new ObjectId("6464887d82f516d44576b76e"),
                // username: 'po',
                //  email: 'po@gmail.com',
                // password: '123456',
                // __v: 0
                console.log(`${foundUser.username} connected to the system.`);
                const payload = {
                    _id: (_a = foundUser._id) === null || _a === void 0 ? void 0 : _a.toString(),
                    username: foundUser.username,
                };
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3600s", });
                /*{
                    "message": "OK",
                    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiY2FydG9vbiIsImlhdCI6MTY4NDI1NTMxNywiZXhwIjoxNjg0MjU4OTE3fQ.MhbpRCDKxGsVQV1fJu19aHjQ-SwQArFFpIuf0rn6wuU",
                    "token_type": "bearer",
                    "expires_in": 3600
                }*/
                return res.status(200).json({ message: 'Logged in successfully ', access_token: token, token_type: "bearer", expires_in: 3600 });
            }
            else {
                // throw new Error('Password is not correct');
                return res.status(404).send({ message: 'Password is not correct' });
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.login = login;
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        // let user = await UserModel.findOne({ email });
        // if (user) return res.status(400).send("User already registered.");
        try {
            // run().catch(err => console.log(err));
            yield (0, mongoose_1.connect)(`${process.env.CONNECTION_STRING}`);
            const foundUser = yield user_model_1.UserModel.findOne({ username: username });
            if (foundUser) {
                return res.status(404).send({ message: 'Already exist username' });
            }
            run();
            function run() {
                return __awaiter(this, void 0, void 0, function* () {
                    // await connect(`${process.env.CONNECTION_STRING}`);  // Connect to MongoDB
                    const user = new user_model_1.UserModel({
                        username: username,
                        email: email,
                        password: password,
                        role: 'user'
                    });
                    user.save();
                    // .then(response => {
                    //   response.json({
                    //     message: `added user:${username} ${email} to the cloud mongodb successfully  ...`
                    //   })
                    // })
                    //   .catch(error => {
                    //     response.json({
                    //       message: 'An error occured!'
                    //     })
                    //   })
                    res.status(200).json({ message: 'Registration successful ' });
                });
            }
        }
        catch (error) {
            // throw error;
            console.log(error);
        }
    });
}
exports.register = register;
// ดึงข้อมูล token
// export const getToken = () => {
//   const token = sessionStorage.getItem("token") || undefined
//   // ถ้ามีกล่อง token สามารถดึงข้อมูลมาได้
//   if (typeof token !== "undefined") {
//     return JSON.parse(token); // แปฃง string เป็น JSON
//   } else {
//     return false;
//   }
// };
// export const authHeader = (): I_AuthHeader => {
//   const token = getTokenFromCookies();
//   return {
//     headers: {
//       Authorization: "Bearer " + token,
//     },
//   };
//  };
//
// let db_user = process.env.DATABASE_USER;
// let db_pass = process.env.DATABASE_PASSWORD;
// let db_host = process.env.DATABASE_HOST;
// let db_port = 27017;
// const url = `mongodb://${db_user}:${db_pass}@${db_host}:${db_port}/?readPreference=primary&ssl=false`;
// console.log(url);
// const url = 'mongodb://toon:1234@localhost:27017/IoTPlatform?ssl=false'
// console.log(url)
const mongodb = require("mongodb");
function getSample(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('userssssss');
            yield mongodb.MongoClient.connect(process.env.CONNECTION_STRING, (err, client) => {
                if (err)
                    throw err;
                console.log("connected to database successfully...");
                const db = client.db("IoTPlatform").then((com) => { console.log(com); }).catch((err) => { console.log(err); });
                const result = db
                    .collection("users")
                    .find()
                    .toArray((err, res) => {
                    response.send({ message: res });
                });
                // const MongoClient = require('mongodb').MongoClient;
                // const client = new MongoClient(url, { useNewUrlParser: true });
                // console.log('s')
                // // connect mongodb database on docker
                // await client.connect((err:any) => {
                //   const collection = client.db('IoTPlatform').collection('users');
                //   console.log('ss')
                //   // perform actions on the collection object
                //   const cursor = client
                //   .db('IoTPlatform')
                //   .collection('users')
                //   .find()
                //   console.log('sss')
                //   const results = cursor.toArray();
                //   if (results.length > 0) { 
                //     console.log(`Found ${results.length} listing(s):`);
                //   }
            });
        }
        catch (error) {
            return response.status(500).send({ message: error });
        }
    });
}
exports.getSample = getSample;
