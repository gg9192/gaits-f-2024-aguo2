const pg = require('pg');
require('dotenv').config();
const { Client } = pg;

function dateToTimeStamp(d) {
    // 2004-10-19 10:23:54
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}

async function migrateDB() {
    console.log('amdjw')
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
                CreatedAt TIMESTAMP NOT NULL,
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
    await client.connect()
    try {
        const subjects = [
            "Mathematics",
            "Physics",
            "Chemistry",
            "Biology",
            "Computer Science",
            "History",
            "Geography",
            "Literature",
            "Philosophy",
            "Economics"
          ];
        const d = new Date();
        for (const subject of subjects) {
            console.log(`seeding ${subject}, ${dateToTimeStamp(d)}`)
            const sql = `INSERT INTO FlashcardSets (CreatedAt, SetName) VALUES ('${dateToTimeStamp(d)}', '${subject}');`
            await client.query(sql);
            d.setHours(d.getHours() + 1);
        }
        console.log('Tables seeded successfully.');
    }
    catch (err) {
        console.error('Error during seed:', err);
    }
    finally {
        await client.end();
    }
}

async function setUpDB() {
    await migrateDB();
    await seedFakeSets()
}

setUpDB()