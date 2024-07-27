import express from "express";
import { Project } from "../models/projectModel.js";

const router = express.Router();

// Route to create a project
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);
        return res.status(200).json(project);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message});
    }
});

// Route to update a project
router.put("/:id", async (req, res) => {
    try {
        if (
            !req.body.title || //all the required fields in model
            !req.body.state
        ) {
            return res.status(400).send({
                message: "Project title and state required."
            });
        }
        const { id } = req.params;
        const result = await Project.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).json({ message: "Project not found"});
        }
        return res.status(200).send({ message: "Project updated successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message});
    }
});

// Route to delete a project
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Project.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "Project not found"});
        }
        return res.status(200).send({ message: "Project deleted successfully"});

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message});
    }
});

export default router;