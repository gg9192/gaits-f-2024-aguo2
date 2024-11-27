import pg from 'pg'
const { Client } = pg
const client = new Client()

try {
    const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    console.log(res.rows[0].message) // Hello world!
 } catch (err) {
    console.error(err);
 } finally {
    await client.end()
 }


await client.end()
