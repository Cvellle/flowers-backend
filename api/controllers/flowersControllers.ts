import { Flower } from "../models/Flower";

export const getFlowers = async (req: any, res: any) => {
  try {
    const flowers = await Flower.find();
    res.json({ items: flowers });
  } catch (error: any) {
    console.error("CRASH LOG:", error); // Check your terminal/console where the backend runs
    res.status(500).json({ message: error.message });
  }
};

import { Request, Response } from "express";

export const getFlowerById = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const { id } = req.params;
    const flower = await Flower.findById(id);

    if (!flower) {
      return res.status(404).json({ message: "Flower not found" });
    }

    return res.json(flower);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
