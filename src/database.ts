import dotenv from "dotenv"
import { Pool } from "pg"

dotenv.config()

const {
    ENV,
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_HOST_TEST,
    POSTGRES_DB_TEST,
    POSTGRES_USER_TEST,
    POSTGRES_PASSWORD_TEST,
} = process.env

let pool

if (ENV === "test") {
    console.log("Testing database")
    pool = {
        host: POSTGRES_HOST_TEST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER_TEST,
        password: POSTGRES_PASSWORD_TEST,
    }
} else if (ENV == "development") {
    console.log("Development database")
    pool = {
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    }
}

const client = new Pool(pool)

export default client
