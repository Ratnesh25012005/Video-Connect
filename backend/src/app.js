import express from "express";
import {createServer} from "node:http";
import {Server} from "socket.io";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import connectToSocket from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js"

dotenv.config();


const app=express();
const server = createServer(app);//app ko server se connect kia
const io = connectToSocket(server)//server ko io se


app.set("port",(process.env.PORT || 8000))
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));


app.use("/api/v1/users",userRoutes);
const url=process.env.MONGODB_URL;

const start = async () =>{
    const connectionDB = await mongoose.connect(url)

    console.log(`Mongo Connect DB Host:${connectionDB.connection.host}`)
    server.listen(app.get("port"), () => {
        console.log("Listening on port 8000")
    });
}

start();