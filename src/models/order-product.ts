import Client from "../database"

export type orderProductModel = {
    order_id: number
    product_id: number
    quantity?: number
}

export class OrderProduct {
    private product_inner_join =
        "INNER JOIN products AS p ON orders_products.product_id=p.index"
    private order_inner_join =
        "INNER JOIN orders AS o ON orders_products.order_id=o.id"
    private user_inner_join = `INNER JOIN users AS u ON o.user_id=u.id`

    private product_fields = "name, price, category"
    private order_fields = "user_id , status"
    private user_fields = "username,firstname,lastname"
    private order_product_fields = "order_id,product_id, ,quantity"

    private product_order_user_fields = `
    order_id,product_id,quantity,name,price,category,user_id,status,username,firstname,lastname`

    async index(): Promise<orderProductModel[]> {
        try {
            const conn = await Client.connect()
            const sql = ` 
            SELECT ${this.product_order_user_fields} FROM orders_products
            ${this.product_inner_join} ${this.order_inner_join} ${this.user_inner_join}
            ;`
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get orders_products ${err}`)
        }
    }

    async show(
        newOrderProduct: orderProductModel
    ): Promise<orderProductModel | undefined> {
        try {
            const conn = await Client.connect()
            const { order_id, product_id } = newOrderProduct
            const sql = ` 
            SELECT ${this.product_order_user_fields} FROM orders_products
            ${this.product_inner_join} ${this.order_inner_join} ${this.user_inner_join}
            where order_id = $1 AND product_id = $2 
            ;`
            try {
                const result = await conn.query(sql, [order_id, product_id])
                conn.release()
                return result.rows[0]
            } catch (err) {
                return undefined
            }
        } catch (err) {
            throw new Error(`Cannot get orders_products ${err}`)
        }
    }

    async showUserCartProducts(
        userId: number
    ): Promise<orderProductModel[] | undefined> {
        try {
            const conn = await Client.connect()

            // Get order Id
            // Search orderId in this table
            // Get full product information

            const sql = `
            SELECT ${this.product_fields},order_id FROM orders_products 
            ${this.product_inner_join} 
            WHERE order_id = (SELECT id FROM orders WHERE user_id = $1 AND status = 'ongoing' )
            ;`
            const result = await conn.query(sql, [userId])
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get orders_products ${err}`)
        }
    }

    async showOrderProducts(orderId: number): Promise<orderProductModel[]> {
        try {
            const conn = await Client.connect()
            const sql = `SELECT ${this.product_fields} FROM orders_products 
            ${this.product_inner_join}
            where order_id = $1 
            ;`
            try {
                const result = await conn.query(sql, [orderId])
                conn.release()
                return result.rows
            } catch (err) {
                return []
            }
        } catch (err) {
            throw new Error(`Cannot get orders_products ${err}`)
        }
    }

    async create(
        newOrderProduct: orderProductModel
    ): Promise<orderProductModel> {
        try {
            const conn = await Client.connect()
            const { order_id, product_id, quantity } = newOrderProduct

            const sql = `INSERT INTO orders_products (order_id,product_id,quantity) 
            VALUES ($1,$2,$3)  
            ON CONFLICT (order_id,product_id) DO UPDATE 
			  SET quantity = orders_products.quantity + 1   RETURNING *;`
            const result = await conn.query(sql, [
                order_id,
                product_id,
                quantity ?? 1,
            ])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Cannot get orders_products ${err}`)
        }
    }
}
