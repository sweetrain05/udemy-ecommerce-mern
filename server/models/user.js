import mongoose from "mongoose";
const { Schema } = mongoose;
// 이렇게 하면 mongoose.Schema 이렇게 쓰지 않고 Schema만 적으면 됨.

const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 64,
        },
        address: {
            type: String,
            trim: true,
        },
        role: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
