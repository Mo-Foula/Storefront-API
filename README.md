# Storefront Backend Project

## NPM scripts:

This project is written in TypeScript which needs to be compiled into JavaScript before running

To build the project into 'build' folder and run the javascript files

```
npm run build
```

To run the project from Typescript files
```
npm run start
```

To run the project from Javascript built files
```
npm run start_b
```

To perform migrations
```
npm run db-up

npm run db-down
```
To test the project using the unit tests written in Jasmine

```
npm run test
```

To run eslint with prettier configurations on all project files

```
npm run lint
```

To run eslint with prettier configurations on all project files and make it fix problems

```
npm run lint_f
```

## **Routes**
#### You can view the exported Postman JSON which contains all the routes

### **Users routes:**
![ScreenShot](/screenshots/database%20schemas/users%20table.PNG)
Login on system and receive token
```
localhost:3000/users/login

Type:POST
Payload: {
    "username": "JohnDoe",
    "password":"123456"
}
```

Register on system
```
localhost:3000/users/

Type:POST
Payload: {
    "firstname": "John",
    "lastname": "Doe",
    "username": "Joe12345678",
    "password":"123456"
}
```

Get certain user by id
```
localhost:3000/users/4

Type: GET
Headers: 
    Authorization: Token
```

Get all users
```
localhost:3000/users

Type: GET
Headers: 
    Authorization: Token
```

### **Products routes:**
![ScreenShot](/screenshots/database%20schemas/products%20table.PNG)
Create product
```
localhost:3000/products/

Type: POST
Payload: {
    "name":"RTX 3050",
    "price":11000,
    "category":"gaming"
}
Headers: 
    Authorization: Token
```

Get all products
```
localhost:3000/products

Type: GET
Headers: 
    Authorization: Token
```

Get product by id
```
localhost:3000/products/:id

Type: GET
Headers: 
    Authorization: Token
```

Get products by category
```
localhost:3000/products/category/:category

Type: GET
Headers: 
    Authorization: Token
```

### **Orders routes:**
![ScreenShot](/screenshots/database%20schemas/orders%20table.PNG)
Create order
```
localhost:3000/orders/

Type: POST
Payload: {
    "user_id": 1,
    "status": "ongoing" // or completed
}
Headers: 
    Authorization: Token
```

Get all orders
```
localhost:3000/orders/

Type: GET
Headers: 
    Authorization: Token
```


Get user completed order
```
localhost:3000/orders/user/:userId/completedOrders

Type: GET
Headers: 
    Authorization: Token
```


Get user cart
```
localhost:3000/orders/user/:userId/cart

Type: GET
Headers: 
    Authorization: Token
```


Complete user order
```
localhost:3000/orders/user/:userId/completeOrder

Type: PUT
Headers:
    Authorization: Token
```





### **Orders-products routes:**
![ScreenShot](/screenshots/database%20schemas/orders_products.PNG)
Create order-product (inserts item in order, here we can insert the quantity too as a number but if it is not provided the item increments the quantity of that product in that order by 1 and if the product is inserted for the first time then the quantity is inserted as 1)
```
localhost:3000/orders-products/

Type: POST
Payload: {
    "order_id": 9,
    "product_id": 13
}
Headers: 
    Authorization: Token
```

Get all orders full data
```
localhost:3000/orders-products/

Type: GET
Headers: 
    Authorization: Token
```

Get order products

```
localhost:3000/orders-products/:orderId

Type: GET
Headers: 
    Authorization: Token
```

Get order product full data (checks if item is in order too)

```
localhost:3000/orders-products/:orderId/product/:productId

Type: GET
Headers: 
    Authorization: Token
```

Get user cart products (Full data)
```
localhost:3000/orders-products/user/:userId/cart

Type: GET
Headers: 
    Authorization: Token
```

## Environment variables that should exist in .env file:
```
## Database PG
# development
POSTGRES_HOST=
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=

# test
POSTGRES_HOST_TEST=
POSTGRES_DB_TEST=
POSTGRES_USER_TEST=
POSTGRES_PASSWORD_TEST=

# Authorization
BCRYPT_PASSWORD=
SALT_ROUNDS=
TOKEN_SECRET=


# Environment development or test
ENV=
# ENV is development or test
```

## Connections and ports:
The project was developed with docker postgres ccontainer
```
Node: 3000
Postgres: 5432
```

To setup database:
```
Launch database service or docker container

db-migrate db:create storefront (The name of DB in .env file)
db-migrate up
```


## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

Your first task is to read the requirements and update the document with the following:
- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.    
**Example**: A SHOW route: 'blogs/:id' [GET] 

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.   
**Example**: You can format this however you like but these types of information should be provided
Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 

### 2.  DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder. 

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!
