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
