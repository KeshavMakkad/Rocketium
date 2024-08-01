import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DataHandler {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async _readJsonFile() {
        try {
            const data = await fs.readFile(this.filePath, "utf8");
            return JSON.parse(data);
        } catch (err) {
            throw new Error(
                "Error reading or parsing data file: " + err.message
            );
        }
    }

    _filterData(data, filters) {
        if (!filters) return data;

        const filterPairs = filters.split(",").map((pair) => pair.split(":"));
        return data.filter((item) =>
            filterPairs.every(([key, value]) =>
                item[key]
                    ?.toString()
                    .toLowerCase()
                    .includes(value.toLowerCase())
            )
        );
    }

    _sortData(data, sortBy) {
        if (!sortBy) return data;

        const sortFields = sortBy.split(",").map((field) => {
            const [key, order = "asc"] = field.trim().split(":");
            return {
                key,
                order: (order || "asc").toLowerCase() === "desc" ? -1 : 1,
            };
        });

        return data.sort((a, b) => {
            for (const { key, order } of sortFields) {
                if (a[key] < b[key]) return -1 * order;
                if (a[key] > b[key]) return 1 * order;
            }
            return 0;
        });
    }

    async getData(filter, sortBy) {
        const data = await this._readJsonFile();
        const filteredData = this._filterData(data, filter);
        return this._sortData(filteredData, sortBy);
    }
}

export default DataHandler;
