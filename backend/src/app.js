import express from "express";
import {createServer} from "node:http";
import {Server} from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import connectToSocket from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js"




const app=express();
const server = createServer(app);//app ko server se connect kia
const io = connectToSocket(server)//server ko io se


app.set("port",(process.env.PORT || 8000))
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));

app.use("/api/v1/users",userRoutes);


const start = async () =>{
    const connectionDB = await mongoose.connect("mongodb+srv://singh12bhandari_db_user:9u1F8jbHJQ10UW7J@cluster0.ihmc245.mongodb.net/")

    console.log(`Mongo Connect DB Host:${connectionDB.connection.host}`)
    server.listen(app.get("port"), () => {
        console.log("Listening on port 8000")
    });
}

start();