import * as fs from 'node:fs/promises';
import { randomUUID } from 'crypto';

// Helper function to construct the file path
const getPath = (path: string): string => {
    return `${process.cwd()}/storage/${path}`;
};

// Function to get the size of a file
export const getFileSize = async (path: string): Promise<number | null> => {
    try {
        const filePath = getPath(path);
        const stat = await fs.stat(filePath);
        return stat.size; // Size in bytes
    } catch (error) {
        console.error(`Error getting file size for ${path}:`, error);
        return null
    }
};

// Function to get the buffer of a file
export const getFileBuffer = async (path: string): Promise<Buffer | null> => {
    try {
        const filePath = getPath(path);
        const buffer = await fs.readFile(filePath);
        return buffer;
    } catch (error) {
        console.error(`Error getting file buffer for ${path}:`, error);
        return null
    }
};



// Function to save a buffer as a file
export const saveBufferAsFile = async (buffer: Buffer): Promise<string> => {
    try {
        const filename = `${randomUUID()}.mp3`;
        const filePath = getPath(filename);

        // Write the buffer to the file
        await fs.writeFile(filePath, buffer);

        return filename;
    } catch (error) {
        console.error(`Error saving buffer as file:`, error);
        throw new Error(`Could not save the buffer as a file.`);
    }