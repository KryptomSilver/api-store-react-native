import { Schema, model } from "mongoose";
const mongoosePaginate = require("mongoose-paginate-v2");

//Tabla de Productos
const productSchema = new Schema(
  {
    nameProduct: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
    precioProduct: {
      type: Number,
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
productSchema.plugin(mongoosePaginate);
export default model("Product", productSchema);
