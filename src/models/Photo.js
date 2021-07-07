import { Schema, model } from "mongoose";
const mongoosePaginate = require("mongoose-paginate-v2");

//Tabla de Photos
const photoSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        descriptionPhoto: {
            type: String,
            required: true,
            trim: true,
        },
        imageUrl: {
            type: String,
            required: true,
            trim: true,
        },
        publicId: {
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
photoSchema.plugin(mongoosePaginate);
export default model("Photo", photoSchema);
