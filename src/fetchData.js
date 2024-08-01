import { get } from "axios";
import { promises as fs } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const url = process.env.DUMMY_DATA_URL;
const dataPath = join(__dirname, "../data/dummyData.json");

const fetchData = async () => {
    try {
        const response = await get(url);

        if (response.status !== 200) {
            throw new Error(`Unexpected response status: ${response.status}`);
        }

        await fs.writeFile(dataPath, JSON.stringify(response.data, null, 2));
        console.log("Data successfully fetched and saved.");
    } catch (err) {
        if (err.response) {
            console.error(
                `HTTP error: ${err.response.status} ${err.response.statusText}`
            );
        } else if (err.code === "ENOENT") {
            console.error(`File system error: ${err.message}`);
        } else {
            console.error("Error fetching or saving data:", err.message);
        }
    }
};

fetchData();
