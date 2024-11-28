const pg = require('pg');
require('dotenv').config();
const { Client } = pg;

async function migrateDB() {
    let client = new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: 'postgres' // Connect to the default database initially
    });

    try {
        await client.connect();

        // Drop and recreate the database
        await client.query('DROP DATABASE IF EXISTS "GAITS-project"');
        await client.query('CREATE DATABASE "GAITS-project"');

        console.log('Database GAITS-project created.');

        // Close the initial connection
        await client.end();

        // Reconnect to the newly created database
        client = new Client({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: 'GAITS-project' // Connect to the new database
        });

        await client.connect();

        // Create tables in the new database
        const createTablesSQL = `
            -- Create the FlashcardSets table
            CREATE TABLE FlashcardSets (
                PK SERIAL PRIMARY KEY,          -- Primary Key
                CreatedAt DATE NOT NULL DEFAULT CURRENT_DATE, -- Default to current date if not provided
                SetName VARCHAR(255) NOT NULL   -- Name of the flashcard set
            );

            -- Create the FlashCard table
            CREATE TABLE FlashCard (
                PK SERIAL PRIMARY KEY,                -- Primary Key
                FlashcardSetFK INT NOT NULL,          -- Foreign Key referencing FlashcardSets
                Question TEXT NOT NULL,               -- The question text
                Answer TEXT NOT NULL,                 -- The answer text
                QuestionTTS TEXT,                     -- Optional text-to-speech question data
                AnswerTTS TEXT,                       -- Optional text-to-speech answer data
                CONSTRAINT fk_flashcardset FOREIGN KEY (FlashcardSetFK)
                REFERENCES FlashcardSets (PK)         -- Define the foreign key relationship
                ON DELETE CASCADE                     -- Delete flashcards if their set is deleted
            );
        `;

        await client.query(createTablesSQL);
        console.log('Tables created successfully.');
    } catch (err) {
        console.error('Error during migration:', err);
    }
    finally {
        await client.end();
    }
}


async function seedFakeSets() {
    let client = new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: 'GAITS-project' // Connect to the new database
    });
    try {

    }
    catch {

    }
    finally {}
}

migrateDB();
