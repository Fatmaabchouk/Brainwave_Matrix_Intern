import mongoose from "mongoose";

export  const connectDB = async() =>{
     await mongoose.connect('mongodb+srv://abchoukfatma19:fatmafatma@cluster0.scoou.mongodb.net/?retryWrites=true&w=majority')
  
    .then(() => console.log("DB Connected"));

}