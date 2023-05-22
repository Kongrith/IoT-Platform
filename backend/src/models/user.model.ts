// import { Schema, model, connect } from 'mongoose';
import mongoose, { connect } from 'mongoose';
import bcrypt from 'bcrypt';
// const uniqueValidator = require("mongoose-unique-validator");

// ดึง environment
import dotenv from "dotenv";
dotenv.config();

// 1. Create an interface representing a document in MongoDB.
export interface I_UserDocument extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    role?: string
}

// 2. Create a Schema corresponding to the document interface.
const UserSchema: mongoose.Schema<I_UserDocument> = new mongoose.Schema({
username: { type: String, unique: true, required: true },
email: { type: String, required: true },
password: { type: String, required: true },
role: { type: String },
});


// ป้องกันการลงทะเบียนซ้ำชื่อกัน
// UserSchema.plugin( uniqueValidator, {message: 'username is already taken.'});

// middleware สำหรับ hash password
const saltRounds:number = Number(process.env.SALT)
UserSchema.pre('save', async function (next) {
 const user = this;
 if (user.isModified('password')) {
   user.password = await bcrypt.hash(user.password, saltRounds);
 }
 next();
});

// 3. Create a Model.
export const UserModel = mongoose.model<I_UserDocument>('users', UserSchema);

// 4. สร้าง Addmin User
checkAdmin()
async function checkAdmin():Promise<void>{
  await connect(`${process.env.CONNECTION_STRING}`)
  const foundAdmin = await UserModel.findOne({ username: 'admin'})
  
  // ถ้าไม่พบชื่อในฐานข้อมูล
  if (!foundAdmin) {
      console.log(`Creating admin acount`)
      const user = new UserModel({
        username: 'admin',
        email: 'admin@gmail.com',
        password: '1234',
        role: 'admin'
      });

      user.save()
  }
}

 


