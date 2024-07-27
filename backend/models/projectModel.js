import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);



export const Project = mongoose.model("Project", projectSchema);
