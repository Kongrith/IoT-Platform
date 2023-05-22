// const mongoose = require("mongoose");
// const config = { autoIndex: true, useNewUrlParser: true };
// const connectionString = "mongodb://localhost:27017";

// mongoose
//   .connect(connectionString, config)
//   .then(() => console.log("connected to mongodb successfully"))
//   .catch((err) => console.log("error", err));

// // schema
// const studentSchema = new mongoose.Schema({
//   id: String,
//   name: String,
//   class: String,
//   hobbies: [String],
//   isStudying: { type: Boolean, default: false },
//   score: { type: Number, default: 0 },
// });

// const Student = mongoose.model("student", studentSchema); // นำ schema มาสร้าง class student
// // สร้าง object จาก class students
// async function createStudent() {
//   const student = Student({
//     id: "0001",
//     name: "kongrith",
//     hobbies: ["golf"],
//     class: "6/1",
//     score: 51,
//   });
//   const data = await student.save();
//   console.log("##################");
// }

// const getStudent = async (condition) => {
//   const students = await Student.find(condition)
//     .sort({ id: -1 })
//     .limit(2)
//     .select({ name: 1, class: 1, score: 1 });
//   console.log(students);
//   console.log("#### EOL ####");
// };

// // createStudent();
// const qeury = { class: "6/1" };
// getStudent(qeury);
