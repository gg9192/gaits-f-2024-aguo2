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
            CREATE TABLE FlashCards (
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
            "History",
            "Geography",
            "Literature",
            "Philosophy",
            "Economics",
            "Computer Science"
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

async function seedFakeCards() {
    const cards = [{
        "question": "What is a variable in programming?",
        "answer": "A variable is a storage location identified by a name that holds data that can be changed during program execution."
    },
    {
        "question": "What is the difference between a compiled and an interpreted language?",
        "answer": "Compiled languages are converted into machine code before execution (e.g., C++), while interpreted languages are executed line-by-line by an interpreter (e.g., Python)."
    },
    {
        "question": "What is the difference between an array and a linked list?",
        "answer": "An array has a fixed size and stores elements in contiguous memory locations, while a linked list is dynamic and stores elements as nodes with pointers."
    },
    {
        "question": "What is a hash table?",
        "answer": "A hash table is a data structure that maps keys to values using a hash function for efficient lookups."
    },
    {
        "question": "What is Big-O notation?",
        "answer": "Big-O notation describes the worst-case complexity of an algorithm in terms of input size, indicating how its runtime or space requirements grow."
    },
    {
        "question": "What is the difference between breadth-first search (BFS) and depth-first search (DFS)?",
        "answer": "BFS explores all neighbors level by level, while DFS explores as far as possible down each branch before backtracking."
    },
    {
        "question": "What is a process in an operating system?",
        "answer": "A process is an instance of a program in execution, including its code, data, and resources."
    },
    {
        "question": "What is the purpose of a kernel in an operating system?",
        "answer": "The kernel manages system resources and acts as an interface between hardware and software."
    },
    {
        "question": "What is the difference between TCP and UDP?",
        "answer": "TCP is connection-oriented, ensuring reliable data transmission, while UDP is connectionless, prioritizing speed over reliability."
    },
    {
        "question": "What is an IP address?",
        "answer": "An IP address is a unique identifier for a device on a network, used for routing data."
    },
    {
        "question": "What is the difference between SQL and NoSQL databases?",
        "answer": "SQL databases are relational and use structured query language, while NoSQL databases are non-relational and often more flexible in structure."
    },
    {
        "question": "What is a primary key in a database?",
        "answer": "A primary key is a unique identifier for a record in a table."
    },
    {
        "question": "What is machine learning?",
        "answer": "Machine learning is a subset of AI where systems learn patterns from data and make decisions or predictions."
    },
    {
        "question": "What is overfitting in machine learning?",
        "answer": "Overfitting occurs when a model performs well on training data but poorly on unseen data because it has learned noise instead of the underlying pattern."
    },
    {
        "question": "What is the Agile methodology?",
        "answer": "Agile is a software development approach that emphasizes iterative progress, collaboration, and flexibility."
    },
    {
        "question": "What is version control?",
        "answer": "Version control is a system for tracking changes to files, enabling collaboration and revision history (e.g., Git)."
    },
    {
        "question": "What is the purpose of a CPU cache?",
        "answer": "A CPU cache stores frequently used data and instructions close to the processor to speed up access times."
    },
    {
        "question": "What is the difference between RAM and ROM?",
        "answer": "RAM is volatile memory used for temporary data storage, while ROM is non-volatile memory used for permanent storage."
    },
    {
        "question": "What is encryption?",
        "answer": "Encryption is the process of converting data into a coded format to protect it from unauthorized access."
    },
    {
        "question": "What is a firewall?",
        "answer": "A firewall is a network security system that monitors and controls incoming and outgoing traffic based on predetermined security rules."
    }]
    let client = new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: 'GAITS-project' // Connect to the new database
    });
    try {
        await client.connect()
        for (const pair of cards) {
            const q = pair.question
            const ans = pair.answer
            const query = `insert into FlashCards (Question, Answer,FlashcardSetFK) values ('${q}','${ans}',1)`
            await client.query(query);
        }
        console.log('cards seeded successfully')
    }
    catch (err) {
        console.log('there was an error seeding flashcards' + err.message)
    }
    finally {
        client.end()
    }    
    
}


async function setUpDB() {
    await migrateDB();
    await seedFakeSets()
    await seedFakeCards()
}

setUpDB()