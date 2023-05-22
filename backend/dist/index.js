"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb = require("mongodb");
const homeRoute_1 = __importDefault(require("./routes/homeRoute"));
const app = (0, express_1.default)();
const bodyParser = require("body-parser");
// Environment
// const dotenv = require('dotenv');           // ไฟล์ .env ต้องอยู่ level เดียวกันกับ package.json
// dotenv.config();
// console.log(process.env.DB_USER);           // 👉️ "bobby_hadz"
// console.log(process.env.ENV);               // 👉️ "test"
// console.log(process.env.PORT);              // 👉️ "9999"
let BACKEND_PORT = process.env.BACKEND_PORT || 5500; // 👉️ "5500"
// mongodb config
const MongoClient = require("mongodb").MongoClient;
let db_user = process.env.DATABASE_USER || 'toon';
let db_pass = process.env.DATABASE_PASSWORD || '1234';
let db_host = process.env.DATABASE_HOST || 'localhost';
let db_port = 27017;
// กรณีรันใน localhost: >> mongodb://toon:1234@localhost:27017/products?ssl=false
// กรณีรันใน docker:    >> mongodb://toon:1234@mongodb:27017/products?ssl=false
// mongodb://toon:1234@localhost:27017/?authSource=IoTPlatform
// const url = `mongodb://${db_user}:${db_pass}@${db_host}:${db_port}/?readPreference=primary&ssl=false`;
// console.log(url);
const url = 'mongodb://admin:1234@localhost:27017/?readPreference=primary&ssl=false';
console.log(url);
// Middleware
// 👇️ specify origins to allow
const whitelist = ["http://localhost:3000", "http://localhost:8081", "http://localhost:4000"];
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
// connect mongodb database on docker
// mongodb.MongoClient.connect(url, (err:string, client:any) => {
//   console.log('loging .....')
//   if (err) throw err;
//   console.log("connected to database successfully...");
//   const db = client.db("IoTPlatform");
//   const result = db
//     .collection("users")
//     .find()
//     .toArray((err:string, res:Response) => {
//       // res.send(res);
//       console.log(res)
//     });
// })
// async function main(){
//   const client = new MongoClient(url);
//   try {
//       // Connect to the MongoDB cluster
//       await client.connect();
//       // Make the appropriate DB calls
//       await  listDatabases(client);
//   } catch (e) {
//       console.error(e);
//   } finally {
//       await client.close();
//   }
// }
// main().catch(console.error);
// async function listDatabases(client:any){
//   databasesList = await client.db().admin().listDatabases();
//   console.log("Databases:");
//   databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// connect cloud database
// mongoose.set("strictQuery", true); // to suppress
// mongoose
//   .connect(url)
//   .then(() =>
//     console.log(
//       "[SERVER] APP connected cloud mongoose database, successfully ..."
//     )
//   )
//   .catch((err) => console.log(err));
// console.log(process.env.CONNECTION_STRING)
// connect cloud database
// mongoose.set("strictQuery", true); // to suppress
// mongoose
//   .connect(process.env.CONNECTION_STRING, {
//     useNewUrlParser: true,
//     useUnifiedTopology: false,
//   })
//   .then(() =>
//     console.log(
//       "[SERVER] APP connected cloud mongoose database, successfully ..."
//     )
//   )
//   .catch((err) => console.log(err));
// console.log(process.env.CONNECTION_STRING)
//
// import mongoose from 'mongoose';
// export interface I_UserDocument extends mongoose.Document {
//  name: string;
//  password: string;
// }
// const UserSchema: mongoose.Schema<I_UserDocument> = new mongoose.Schema({
//  name: { type: String, unique: true },
//  password: { type: String },
// });
// const UserModel = mongoose.model<I_UserDocument>('User1', UserSchema);
//
// const geeting = (name: string) => {
//   console.log(`Hello ${name} from TypeScript.`);
// };
// geeting('Cartoon');
// //
// แก้ปัญหาติด CORS
// https://medium.com/neverrest/cors-%E0%B8%A3%E0%B8%A7%E0%B8%A1%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%81%E0%B8%81%E0%B9%89%E0%B9%84%E0%B8%82%E0%B8%9B%E0%B8%B1%E0%B8%8D%E0%B8%AB%E0%B8%B2-cors-%E0%B8%97%E0%B8%B5%E0%B9%88-web-developer-%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%88%E0%B8%AD-5afb6a9e742f
// const users = require("..src/")
// const products = require("./db");
// const fs = require("fs");
// const path = require("path");
// const dirPath = path.join(__dirname, "../public/images/");
//
// app.get('/', (req: Request, res) => {
//   res.send('Express + TypeScript Server');
// });
// app.post('/login', authController.login);                   // route login
// app.post('/register', authController.register);                   // route login
// All routing here
app.use('/', homeRoute_1.default);
app.post('/login', homeRoute_1.default);
app.post('/register', homeRoute_1.default);
app.use('/about', homeRoute_1.default);
app.use('/dashboard', homeRoute_1.default);
app.use('/profile', homeRoute_1.default);
app.use('/users', homeRoute_1.default);
//
// app.get("/users", (requst:Request, response:Response) => {
//   console.log("/users");
//   async  mongodb.MongoClient.connect(url, (err:any, client:any) => {
//     if (err) throw err;
//     console.log("connected to database successfully...");
//     const db = client.db("IoTPlatform");
//     const result = db
//       .collection("users")
//       .find()
//       .toArray((err:any, res:any) => {
//         response.send(res);
//       });
//     // console.log("###", client.send());
//   });
// });
// router.use("/", homeRoute);
// app.route("/login").post(authController.login)
// router.get('/', (req: Request, res: Response) => {
//     res.send('Express + TypeScript Server')
// })
// router.post('/login',  authController.login);
// router.post('/register',  authController.register);
// router.get('/about');
// app.use('/', homeRoute)
// router.get('/login', loginRoute);
// router.get('/register', registerRoute);
// 
app.listen(BACKEND_PORT, () => {
    console.log(`🟢 Server is running at http://localhost:${BACKEND_PORT}`);
});
