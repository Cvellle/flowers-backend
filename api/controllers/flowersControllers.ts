import { Flower } from "../models/Flower";
import { Request, RequestHandler, Response } from "express";

export const getFlowers = async (req: any, res: any) => {
  try {
    const flowers = await Flower.find();
    res.json({ items: flowers });
  } catch (error: any) {
    console.error("CRASH LOG:", error); // Check your terminal/console where the backend runs
    res.status(500).json({ message: error.message });
  }
};

export const getFlowerById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const flower = await Flower.findById(id);

    if (!flower) {
      res.status(404).json({ message: "Flower not found" });
      return;
    }

    res.json(flower);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
