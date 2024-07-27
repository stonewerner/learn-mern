import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Project } from "./models/projectModel.js";

const app = express();
app.use(express.json()); //convert body of all requests to json

// Route root
app.get("/", (req, res) => {
    console.log(req);
    return res.status(200).send("Welcome!");
});

// Route to create a project
app.post("/projects", async (req, res) => {
    try {
        if (
            !req.body.title || //all the required fields in model
            !req.body.state
        ) {
            return res.status(400).send({
                message: "Project title and state required."
            });
        }
        const newProject = {
            title: req.body.title,
            state: req.body.state,
            notes: req.body.notes,
        };
        const project = await Project.create(newProject);
        return res.status(200).send(project);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message});
    }
});

// Route to get all projects
app.get("/projects", async (req, res) => {
    try {
        const projects = await Project.find({});
        return res.status(200).json({
            count: projects.length,
            data: projects
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message});
    }
});

// Route to get a single project by id
app.get("/projects/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);
        return res.status(200).json(project);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message});
    }
})

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
