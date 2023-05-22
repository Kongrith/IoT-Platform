const mongodb = require("mongodb");
import { UserModel, I_UserDocument } from "../models/user.model"
// import { InputLoginForm, InputRegisterForm } from "../app-types/login.type";
import { connect } from 'mongoose';
import bcrypt from 'bcrypt';
const jwt = require("jsonwebtoken");

import dotenv from "dotenv";
// import { getErrorMessage } from "../utils/error.util";
dotenv.config();

console.log(process.env.CONNECTION_STRING)
export async function login(req: any, res: any){
  const {username, password} = req.body
  try {
      await connect(`${process.env.CONNECTION_STRING}`)
      const foundUser = await UserModel.findOne({ username: username})
      
      // ถ้าไม่พบชื่อในฐานข้อมูล
      if (!foundUser) {
          return res.status(404).send( { message:'Please recheck your username'})
      } 
      
      //                        password-from-user, password-from-database
      const isMatch = bcrypt.compareSync(password, foundUser.password);
      if (isMatch) {
          // ตัวอย่าง foundUser
          // _id: new ObjectId("6464887d82f516d44576b76e"),
          // username: 'po',
          //  email: 'po@gmail.com',
          // password: '123456',
          // __v: 0

          console.log(`${foundUser.username} connected to the system.`)

          const payload = {
              _id: foundUser._id?.toString(),
              username: foundUser.username,
          }

          const token = jwt.sign( payload, process.env.JWT_SECRET, { expiresIn: "3600s", });
          /*{
              "message": "OK",
              "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiY2FydG9vbiIsImlhdCI6MTY4NDI1NTMxNywiZXhwIjoxNjg0MjU4OTE3fQ.MhbpRCDKxGsVQV1fJu19aHjQ-SwQArFFpIuf0rn6wuU",
              "token_type": "bearer",
              "expires_in": 3600
          }*/
          return res.status(200).json({ message: 'Logged in successfully ', access_token: token, token_type: "bearer", expires_in: 3600})

      } else {
          // throw new Error: Password is not correct
          return res.status(404).send( { message:'Password is not correct'})
      }

  } catch(error) {
    console.log(error)
  }
}

export async function register(req: any, res: any): Promise<void> {
  const { username, email, password } = req.body;

  try {
    await connect(`${process.env.CONNECTION_STRING}`)
    const foundUser = await UserModel.findOne({ username: username})
    
    if (foundUser){
        return res.status(404).send( { message:'Already exist username'})
    }
    run()

    async function run() {
      const user = new UserModel({
        username: username,
        email: email,
        password: password,
        role: 'user'
      });

      user.save()      
      res.status(200).json({ message: 'Registration successful '})
    }
  } catch (error) {
    // throw error;
    console.log(error)
  }
}

//
export async function getSample(request: any, response: any){
  try {
    await mongodb.MongoClient.connect(process.env.CONNECTION_STRING, (err:any, client:any) => {
      if (err) throw err;
      console.log("connected to database successfully...");
      const db = client.db("IoTPlatform").then((com:any)=>{console.log(com)}).catch((err:any)=>{console.log(err)})
      const result = db
        .collection("users")
        .find()
        .toArray((err:any, res:any) => {
          response.send({ message: res });
        });
    })
  } catch(error) {
      return response.status(500).send( { message:error})
  }
}

