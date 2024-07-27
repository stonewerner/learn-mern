import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Project } from "./models/projectModel.js";
import projectRoute from "./routes/projectRoute.js";
import cors from "cors";

const app = express();
app.use(express.json()); //convert body of all requests to json

app.use(cors()); //default is to allow all origins

//other cors option
//app.use(
//    cors({
//        origin: 'http://localhost:3000',
//        methods: ['GET', 'POST', 'PUT', 'DELETE'],
//        allowedHeaders: ['Content-Type'],
//    })
//);


// Route root
app.get("/", (req, res) => {
    console.log(req);
    return res.status(200).send("Welcome!");
});

app.use("/projects", projectRoute); //our middleware to use your project routes


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to db");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });

    })
    .catch((error) => {
        console.log(error);
    });
