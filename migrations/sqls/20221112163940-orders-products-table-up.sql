CREATE TABLE orders_products (
    order_id INTEGER REFERENCES orders (id) NOT NULL,
    product_id INTEGER REFERENCES products (index) NOT NULL,
    quantity INTEGER DEFAULT 1,
    PRIMARY KEY(order_id, product_id)
);