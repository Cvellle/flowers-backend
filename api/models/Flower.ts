import { Schema, model } from "mongoose";
import { IFlower } from "../types/FlowerTypes";

const flowerSchema = new Schema<IFlower>(
  {
    name: { type: String, required: true },
    latinName: { type: String, required: true },
    genus: { type: String, required: true },
    pictureUrl: { type: String, required: true },
    authorId: { type: String, required: true },
    sightingsNum: { type: Number, default: 0 },
  },
  {
    collection: "flowers",
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

export const Flower = model<IFlower>("Flower", flowerSchema);
