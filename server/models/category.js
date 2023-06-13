import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        maxLength: 32,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
    },
});

export default mongoose.model("Category", categorySchema);
