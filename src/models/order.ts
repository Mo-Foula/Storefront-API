import Client from "../database"

export type orderModel = {
    id?: number
    user_id: number
    status: string
}

export class Order {
    async index(): Promise<orderModel[]> {
        try {
            const conn = await Client.connect()
            const sql = "SELECT * FROM orders;"
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get orders ${err}`)
        }
    }

    async show(id: number): Promise<orderModel | undefined> {
        try {
            const conn = await Client.connect()
            const sql = "SELECT * FROM orders where id = $1 ;"
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Cannot get orders ${err}`)
        }
    }

    async create(newOrder: orderModel): Promise<orderModel> {
        try {
            const conn = await Client.connect()
            const { user_id: userId, status } = newOrder

            const sql =
                "INSERT INTO orders (user_id,status) VALUES ($1,$2) RETURNING *;"
            const result = await conn.query(sql, [userId, status])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Cannot get orders ${err}`)
        }
    }

    async userOrdersWithCertainStatus(
        userId: number,
        status: string
    ): Promise<orderModel | orderModel[] | undefined> {
        try {
            const conn = await Client.connect()
            const sql =
                "SELECT * FROM orders WHERE user_id = $1 AND status = $2"
            const result = await conn.query(sql, [userId, status])
            conn.release()

            if (status === "completed") {
                return result.rows
            } else {
                return result.rows[0]
            }
        } catch (err) {
            throw new Error(`Cannot get orders ${err}`)
        }
    }

    async completeOrder(userId: number): Promise<orderModel | undefined> {
        try {
            const conn = await Client.connect()
            const sql =
                "UPDATE orders SET status = $1 WHERE user_id = $2 AND status = $3  RETURNING *"
            const result = await conn.query(sql, [
                "completed",
                userId,
                "ongoing",
            ])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Cannot get orders ${err}`)
        }
    }
}
