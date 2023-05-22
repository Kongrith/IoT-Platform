// https://www.appsloveworld.com/nodejs/100/131/typeerror-expressjwt-is-not-a-function
import { Request, Response } from 'express';
import dotenv from "dotenv";
const mongodb = require("mongodb");
// import { getErrorMessage } from '../utils/errors.util';

const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
import * as userServices from '../services/user.service';
import { connect } from 'mongoose';
import { InputLoginForm, InputRegisterForm } from "../app-types/login.type";
import { getErrorMessage } from '../utils/error.util';

import {UserModel, I_UserDocument} from "../models/user.model"

//
dotenv.config();



// type ของ User Profile
type User = {
  id: number,
  username: string,
  email: string,
  password: string
}

export const login = async (req: Request, res: Response) => {
  try {
      userServices.login(req , res)
  } catch(error) {
      console.log(error)
  }
};

export const register= async (req: Request, res: Response) => {
  try {
    userServices.register(req , res)
  } catch (err) {
    return res.status(500).send(getErrorMessage(err));
  }
} 


export const dashboard = async (req: Request, res: Response) => {
  try {
      console.log('dashboard')
      res.status(200).json({ message: 'Hello from dashboard'})
  } catch(error) {
      console.log(error)
      return res.status(500).send(getErrorMessage(error));
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
      console.log('profile')
      res.status(200).json({ message: 'Hello from profile'})
  } catch(error) {
      console.log(error)
      return res.status(500).send(getErrorMessage(error));
  }
};

export const users = async (req: Request, res: Response) => {
  try {
      userServices.getSample(req , res)
  } catch(error) {
      console.log(error)
  }
};




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