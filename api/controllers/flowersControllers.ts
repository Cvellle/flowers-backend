import { Flower } from "../models/Flower";
import { Request, Response } from "express";

export const getFlowers = async (req: any, res: any) => {
  try {
    const flowers = await Flower.find();
    res.json({ items: flowers });
  } catch (error: any) {
    console.error("CRASH LOG:", error); // Check your terminal/console where the backend runs
    res.status(500).json({ message: error.message });
  }
};

export const getFlowerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Safety check: if id is a string "undefined", return 400 immediately
    if (!id || id === "undefined") {
      return res.status(400).json({ message: "No flower ID provided" });
    }

    const flower = await Flower.findById(id);

    if (!flower) {
      return res.status(404).json({ message: "Flower not found" });
    }

    res.json(flower);
  } catch (error) {
    // This catches the 'CastError' if 'id' is a random string
    res.status(500).json({ message: "Invalid ID format or Server Error" });
  }
};
