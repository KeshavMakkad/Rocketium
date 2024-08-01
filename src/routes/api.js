import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import DataHandler from "./DataHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const filePath = path.resolve(__dirname, "../../data/dummyData.json");
const dataHandler = new DataHandler(filePath);

router.get("/data", async (req, res) => {
    try {
        const { filter, sortBy } = req.query;
        const jsonData = await dataHandler.getData(filter, sortBy);
        res.status(200).json(jsonData);
    } catch (err) {
        console.error("API Error:", err.message);
        res.status(500).json({
            error: "Internal Server Error: " + err.message,
        });
    }
});

export default router;
