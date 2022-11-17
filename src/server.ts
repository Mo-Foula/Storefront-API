import express from 'express'
import bodyParser from 'body-parser'

import routes from './routes/index'
import db from './database'

const app: express.Application = express()
const address = 'localhost:3000'
// const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

async function testDB() {
    try {
        const conn = await db.connect()
        conn.release()
        console.log('Database connection is ok')
    } catch (err) {
        throw new Error(`Database failed to connect`)
    }
}

testDB()

routes(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

/*
su postgres
psql -h 127.0.0.1 -U backend postgres

\l List databases
\c Connect to a database
\dt Display Tables in a database
\q Quit out of psql to normal terminal



createuser postgres --interactive
psql postgres
*/

export default app
