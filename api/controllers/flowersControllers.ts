import { Flower } from "../models/Flower";

export const getFlowers = async (req: any, res: any) => {
  try {
    const flowers = await Flower.find(); // Fetches all objects from the collection
    res.json(flowers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching flowers" });
  }
};
