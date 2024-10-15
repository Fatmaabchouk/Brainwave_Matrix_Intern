import mongoose from "mongoose";

export  const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://abchoukfatma18:abchoukfatma18@cluster0.lju0wb2.mongodb.net/<abchoukfatma18>?retryWrites=true&w=majority')
    .then(() => console.log("DB Connected"));

}