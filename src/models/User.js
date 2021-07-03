import { Schema, model } from "mongoose";
const mongoosePaginate = require("mongoose-paginate-v2");

//Tabla de usuarios
const userShema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);
//paginacion plugin
userShema.plugin(mongoosePaginate);
export default model("User", userShema);
