import  express from"express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import { foodRouter } from "./routes/foodRoute.js";




//app config
const app = express()
const port = 4000

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json() )
app.use(cors() )
//db connection
connectDB();
//api endpoints

app.use("/api/food",foodRouter)
app.use('/uploads', express.static('uploads'));
app.use("/imagess",express.static('uploads'))




app.get("/" , (req,res)=>{
    res.send("API Working ")
} ) 

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`);

} )
//mongodb+srv://abchoukfatma18:@Introuvable1@cluster0.lju0wb2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0