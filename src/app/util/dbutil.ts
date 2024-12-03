
import pg from 'pg'

export default function getClient():pg.Client  {
    const portAsString:string = process.env.DB_PORT == undefined ? '' : process.env.DB_PORT

    const { Client } = pg
    const client = new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: parseInt(portAsString),
        database: 'GAITS-project' // Connect to the new database
    })
    return client
}