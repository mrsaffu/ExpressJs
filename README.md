# 📦 ExpressJS Practice Repository

This repository contains my practice work using **Express.js**. I organized the code in folders, and each folder covers one or more important Express concepts such as creating a server, using HTTP methods, CRUD operations, middleware, authentication, and frontend integration.

---

## 📁 Folder Structure & Descriptions

### `01_CreateServer`

This folder includes the most basic example of how to set up and run a server using Express.js.

✅ **Concepts Practiced:**
- Setting up Express
- Creating and running a simple server
- Listening on a port

---

### `02_HttpMethod`

Here, I practiced different **HTTP methods** used to communicate between client and server.

✅ **Concepts Practiced:**
- `GET` – to fetch data
- `POST` – to create new data
- `PUT` – to update existing data
- `DELETE` – to delete data

🧠 **Definition – HTTP Methods**:
HTTP methods are used by the client to interact with resources on the server. Each method defines a specific action (read, create, update, or delete).

---

### `03_CurdOperation`

This folder shows full **CRUD operations** – Create, Read, Update, Delete – on sample data.

✅ **Concepts Practiced:**
- Handling routes for all 4 operations
- Working with request body and parameters
- Sending appropriate responses

🧠 **Definition – CRUD Operations**:
CRUD stands for **Create, Read, Update, and Delete** – the four basic operations used to manage data in web applications.

---

### `04_AppStructure`

In this folder, I created a clean and scalable folder structure using the **MVC pattern** (Model-View-Controller).

✅ **Concepts Practiced:**
- Separating models, routes, and controllers
- Organizing Express app code for large projects

🧠 **Definition – MVC Architecture**:
MVC stands for **Model-View-Controller**, a design pattern that separates the data (Model), the user interface (View), and the business logic (Controller) for clean and maintainable code.

---

### `05_ExpressApp`

This is a complete full-stack project where I implemented:
- A connected frontend (`01FronteEnd`)
- Authentication and Authorization (`Authentication_autho`)
- Secure backend API using Express

✅ **Concepts Practiced:**
- Connecting frontend to backend
- Creating protected routes using JWT
- Creating reusable middleware
- Structuring app with controllers, routes, models, and utils

---

## 🧠 Key Concepts and Definitions

### ✅ Express.js
A fast and lightweight Node.js web application framework used to build RESTful APIs and web servers.

---

### ✅ HTTP Methods
Used to define the type of operation a client wants to perform:
- **GET**: Read data
- **POST**: Create new data
- **PUT**: Update data
- **DELETE**: Remove data

---

### ✅ Middleware
Functions that run **between** the request and the final route handler. Middleware can:
- Modify request/response objects
- End the request-response cycle
- Call the next middleware in the stack

Examples include:
- Logging
- Authentication checks
- Error handling

---

### ✅ CRUD Operations
These are the four basic operations used in database systems:
- **Create**: Add new data
- **Read**: Get existing data
- **Update**: Change existing data
- **Delete**: Remove data

---

### ✅ Token (JWT)
A **JSON Web Token (JWT)** is a secure way to transmit user data between the client and server. It's commonly used for user authentication.

- After login, a token is generated and sent to the client.
- The client includes the token in future requests to access protected routes.

---

### ✅ Authentication
The process of verifying the identity of a user. For example, using login credentials and JWT to make sure the user is who they say they are.

---

### ✅ Authorization
After a user is authenticated, **authorization** determines what they are allowed to do (e.g., admin-only routes).

---

### ✅ Schema
A **schema** defines the structure of the data in a MongoDB collection using Mongoose. It includes:
- Field names
- Data types
- Validation rules

Example:
```js
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

---

### ✅ Model
A **model** is created from a schema using Mongoose. It acts as a blueprint for interacting with a specific MongoDB collection (e.g., `users`, `products`).

🔸 Models allow us to:
- Create new documents
- Find, update, or delete documents
- Apply validation and hooks

**Example:**
```js
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const User = mongoose.model('User', UserSchema);


---

### ✅ ODM (Object Data Modeling)

**ODM** stands for **Object Data Modeling**. It is a way to interact with a database using JavaScript objects instead of raw queries.

In Node.js, we use **Mongoose** as an ODM for MongoDB.

**Benefits of ODM:**
- Defines schemas for documents
- Provides methods to query and manipulate data
- Enforces validation rules
- Improves code readability and organization

---

### ✅ RESTful APIs

A **RESTful API** is an architectural style for designing web services that use standard HTTP methods.

**Common RESTful Endpoints:**

| Action        | Method | Endpoint Example        |
|---------------|--------|--------------------------|
| Get all users | GET    | `/api/users`             |
| Get one user  | GET    | `/api/users/:id`         |
| Create user   | POST   | `/api/users`             |
| Update user   | PUT    | `/api/users/:id`         |
| Delete user   | DELETE | `/api/users/:id`         |

**Benefits of REST:**
- Easy to understand and implement
- Decouples frontend and backend
- Scalable and maintainable

---

### ✅ Route Parameters

**Route parameters** are used to capture values from the URL.

**Example:**
```js
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID is ${userId}`);
});


### ✅ Status Codes

**HTTP status** codes tell the client what happened with their request.

| Code | Meaning                       |
| ---- | ----------------------------- |
| 200  | OK – Request succeeded        |
| 201  | Created – Resource created    |
| 400  | Bad Request – Invalid data    |
| 401  | Unauthorized – Not logged in  |
| 403  | Forbidden – No permission     |
| 404  | Not Found – Resource missing  |
| 500  | Server Error – Internal issue |


### ✅ Error Handling
** Express allows you to create a global error handler middleware.

**Example:**

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});
