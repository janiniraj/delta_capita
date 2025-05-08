import { writeFileSync, readFileSync, existsSync } from "fs";
import { IStorage } from "./IStorage";

/**
 * File-based JSON storage that implements IStorage
 */
export class JSONFileStorage implements IStorage {
    constructor(private filePath: string) {}

    save<T>(data: T[]): void {
        writeFileSync(this.filePath, JSON.stringify(data, null, 2), "utf-8");
    }

    load<T>(): T[] {
        if (!existsSync(this.filePath)) return [];

        const content = readFileSync(this.filePath, "utf-8").trim();
        if (!content) return [];

        try {
            return JSON.parse(content);
        } catch (err) {
            console.error("Invalid JSON in storage file:", err);
            return [];
        }
    }
}
