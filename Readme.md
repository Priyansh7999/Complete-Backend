# 📚 Backend Development with Node.js & Express.js

This repository contains everything I learnedfor Backend Development using Node.js and Express.js.

## Table of Contents

1. [Setup &amp; Installation](#setup--installation)
2. [Basic Express Server](#basic-express-server)
3. [Routing in Express](#routing-in-express)
4. [Modular Code Structure](#modular-code-structure)
5. [HTTP Methods](#http-methods)
6. [Middleware](#middleware)
7. [Error Handling](#error-handling)

---

## Setup & Installation

### Step 1: Download Node.js

Download and install Node.js from [nodejs.org](https://nodejs.org)

### Step 2: Initialize Node.js Project

```bash
npm init -y
```

### Step 3: Initialize Git Repository

```bash
git init
```

### Step 4: Install Express

```bash
npm install express
```

---

## Basic Express Server

Create a `server.js` file with basic server setup:

```javascript
const express = require('express');

const app = express();
const port = 3000;

// Define a simple route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
```

**Run the server:**

```bash
node server.js
```

---

## Routing in Express

### Static Routes

```javascript
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.get('/about', (req, res) => {
    res.send('This is the about page.');
});

app.get("/welcome", (req, res) => {
    res.send("Welcome to Express JS");
});
```

### Dynamic Routes with URL Parameters

**Single Parameter:**

```javascript
app.get('/user/:username', (req, res) => {
    const username = req.params.username;
    res.send(`Welcome, ${username}!`);
});
```

**Multiple Parameters:**

```javascript
app.get('/things/:name/:id', (req, res) => {
    const { name, id } = req.params;
    res.send(`This is ${name} with id ${id}`);
});
```

### Query String Parameters

```javascript
app.get('/search', (req, res) => {
    const keyword = req.query.keyword;
    res.send(`You searched: ${keyword}!`);
});
```

**Example URL:** `http://localhost:3000/search?keyword=express`

### 404 Route (Catch-all)

Always place this at the bottom of your routes:

```javascript
app.use((req, res) => {
    res.status(404).send('Sorry, the route you are looking for does not exist.');
});
```

---

## Modular Code Structure

### Using Controllers

Create `controller.js`:

```javascript
export const userLogin = (req, res) => {
    res.send("This is user login route");
}

export const userSignup = (req, res) => {
    res.send("This is user signup route");
}
```

Use in `server.js`:

```javascript
import { userLogin, userSignup } from './controller.js';

app.get('/user/login', userLogin); 
app.get('/user/signup', userSignup);
```

### Using Express Router

Create `route.js`:

```javascript
import express from 'express';
import { userLogin, userSignup } from './controller.js';

const router = express.Router();

router.get('/login', userLogin);
router.get('/signup', userSignup);

export default router;
```

Use in `server.js`:

```javascript
import router from './route.js';

app.use('/user', router);
```

**Access routes:**

- `http://localhost:3000/user/login`
- `http://localhost:3000/user/signup`

---

## HTTP Methods

### POST Request (Create)

```javascript
app.use(express.json()); // Middleware to parse JSON bodies

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    res.json({
        message: `User ${name} with email ${email} created successfully!`
    });
});
```

**Test with:**

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com"}'
```

### PUT Request (Update)

```javascript
app.use(express.json());

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    res.json({
        message: `User with id ${id} updated to name: ${name}, email: ${email}`
    });
});
```

### DELETE Request (Delete)

```javascript
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    res.json({
        message: `User with id ${id} deleted successfully!`
    });
});
```

---

## Middleware

Middleware functions have access to the request object (`req`), response object (`res`), and the next middleware function (`next`).

### Global Middleware

Runs on every request:

```javascript
app.use((req, res, next) => {
    console.log(`Start`);
    res.on('finish', () => {
        console.log(`End`);
    }); 
    next();
});
```

### Route-Specific Middleware

```javascript
app.use('/welcome', (req, res, next) => {
    console.log(`${req.method} request received for ${req.url} at ${new Date().toISOString()}`);
    next();
});
```

### Execution Flow

```javascript
app.use((req, res, next) => {
    console.log(`Start`);
    res.on('finish', () => {
        console.log(`End`);
    }); 
    next();
});

app.get("/", (req, res) => {
    console.log(`Middle`);
    res.send("Hello, World!");
});
```

**Console output:**

```
Start
Middle
End
```

---

## Error Handling

### Creating an Error

```javascript
app.get("/error", (req, res) => {
    throw new Error("Something went wrong!");
});
```

### Error-Handling Middleware

Always place this after all routes:

```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error!');
});
```

**Note:** Error-handling middleware has 4 parameters: `(err, req, res, next)`

---

## Complete Server Example

```javascript
import express from 'express';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Start`);
    res.on('finish', () => {
        console.log(`End`);
    }); 
    next();
});

// Routes
app.get("/", (req, res) => {
    console.log(`Middle`);
    res.send("Hello, World!");
});

app.get("/error", (req, res) => {
    throw new Error("Something went wrong!");
});

// 404 Handler
app.use((req, res) => {
    res.status(404).send('Sorry, the route you are looking for does not exist.');
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error!');
});

// Start Server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
```

---
