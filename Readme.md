# *Backend Development with Node.js & Express.js*

# Day 1: Introduction to Express.js, Routing, HTTP Methods, Middleware, Error Handling

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

# Day 2: Serving Static Files, Form Handling & MongoDB Integration

---

## Table of Contents

1. [Serving Static Files](h#serving-static-files)
2. [Form Handling](#form-handling)
3. [MongoDB Setup &amp; Connection](#mongodb-setup--connection)
4. [Mongoose Schemas &amp; Models](#mongoose-schemas--models)
5. [CRUD Operations](#crud-operations)
6. [Complete Project Structure](#complete-project-structure)

---

## Serving Static Files

Static files include HTML, CSS, JavaScript, images, and other assets that don't change dynamically.

### Method 1: Without Folder Prefix

```javascript
app.use(express.static('public'));
```

**Access files:**

* `http://localhost:3000/index.html`
* `http://localhost:3000/style.css`
* `http://localhost:3000/script.js`

Files are served directly from the `public` folder without the folder name in the URL.

### Method 2: With Folder Prefix

```javascript
app.use('/public', express.static('public'));
```

**Access files:**

* `http://localhost:3000/public/index.html`
* `http://localhost:3000/public/style.css`
* `http://localhost:3000/public/script.js`

The `/public` prefix is required in the URL.

**Project Structure:**

```
project/
├── public/
│   ├── index.html
│   ├── style.css
│   └── images/
│       └── logo.png
└── server.js
```

---

## Form Handling

### A) URL-Encoded Form Data

For standard HTML forms (`application/x-www-form-urlencoded`).

```javascript
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse form data

app.post('/form', (req, res) => {
    console.log(req.body);
    res.send('Form Received!');
});
```

**HTML Form Example:**

```html
<form action="/form" method="POST">
    <input type="text" name="username" placeholder="Username">
    <input type="email" name="email" placeholder="Email">
    <button type="submit">Submit</button>
</form>
```

**What `extended: true` means:**

* Allows parsing of nested objects in form data
* Uses the `qs` library for parsing
* Example: `user[name]=John&user[age]=25` becomes `{ user: { name: 'John', age: 25 } }`

### B) Multipart Form Data (File Uploads)

For forms with file uploads (`multipart/form-data`).

**Install Multer:**

```bash
npm install multer
```

**Implementation:**

```javascript
import multer from 'multer';
import path from 'path';

// Configure storage
const storage = multer.diskStorage({
    destination: 'uploads', // Folder where files will be saved
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname); // Get file extension
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage });

// For single file upload
app.use(upload.single('image')); // 'image' is the field name in the form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/form', (req, res) => {
    console.log(req.body); // Form text fields
    console.log(req.file); // Uploaded file info
    res.send('Form Received!');
});
```

**HTML Form for File Upload:**

```html
<form action="/form" method="POST" enctype="multipart/form-data">
    <input type="text" name="username" placeholder="Username">
    <input type="file" name="image">
    <button type="submit">Submit</button>
</form>
```

**File Object Structure:**

```javascript
{
  fieldname: 'image',
  originalname: 'photo.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'uploads',
  filename: 'image-1234567890-987654321.jpg',
  path: 'uploads/image-1234567890-987654321.jpg',
  size: 152348
}
```

**Multiple File Upload Options:**

```javascript
// Single file
upload.single('image')

// Multiple files with same field name
upload.array('photos', 5) // Max 5 files

// Multiple files with different field names
upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'gallery', maxCount: 8 }
])
```

---

## MongoDB Setup & Connection

### What is MongoDB?

MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. Unlike traditional databases with tables and rows, MongoDB uses:

* **Database** → Collection of collections
* **Collection** → Like a table (e.g., "users", "products")
* **Document** → Like a row (individual record)
* **Field** → Like a column (e.g., "name", "email")

### Setting Up MongoDB Atlas (Cloud Database)

1. **Create Account:** Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. **Create Cluster:** Free tier is available
3. **Get Connection String:** Click "Connect" → "Connect your application"
4. **Whitelist IP:** Add your IP address or use `0.0.0.0/0` for all IPs (development only)

### Install Mongoose

Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.

```bash
npm install mongoose
```

### Connection Configuration

**Create `.env` file:**

```
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

**File: `config/db.js`:**

```javascript
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
  
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
};
```

## Mongoose Schemas & Models

### Understanding Schemas & Models

A **Schema** defines the structure of documents in a collection (like a blueprint).

A **Model** is a constructor compiled from a Schema. It represents a collection and provides methods to interact with the database.

**File: `models/Person.js`**

```javascript
import mongoose from "mongoose";

// Define the schema for Person (table structure)
const personSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true  // Field is mandatory
    },
    age: { 
        type: Number, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true  // No duplicate emails
    },
    userOrder: { 
        type: Object, 
        default: {}  // Default value is empty object
    }
}, {
    timestamps: true,  // Adds createdAt and updatedAt fields automatically
    minimize: false    // Don't remove empty objects
});

// Create and export the Person model
// Parameters: (model name, schema)
export const Person = mongoose.model('Person', personSchema);
```

### Schema Options Explained

**Field Options:**

* `type` - Data type (String, Number, Date, Boolean, Array, Object, etc.)
* `required` - Field must have a value
* `unique` - No two documents can have the same value
* `default` - Default value if not provided
* `min/max` - For numbers (e.g., `min: 0, max: 100`)
* `minLength/maxLength` - For strings
* `enum` - Allowed values (e.g., `enum: ['male', 'female', 'other']`)
* `validate` - Custom validation function

**Schema Options:**

* `timestamps: true` - Automatically adds `createdAt` and `updatedAt` fields
* `minimize: false` - Keeps empty objects (by default Mongoose removes them)

---

## CRUD Operations

### Complete Server Implementation

**File: `index.js`**

```javascript
import express from 'express';
import { connectDB } from './config/db.js';
import { Person } from './models/Person.js';

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON body

// Connect to MongoDB
await connectDB();

// Basic Route
app.get('/', (req, res) => {
    res.send("Hello from Express");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
```

### CREATE - Add New Person

```javascript
app.post('/person', async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, age } = req.body;
    
        // Create a new Person document (row in table)
        const newPerson = new Person({
            name,
            age,
            email
        });
    
        // Save the document to the database
        await newPerson.save();
        console.log(newPerson);
    
        res.status(201).json({
            message: "Person Added",
            person: newPerson
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
```

### READ - Get All Persons

```javascript
app.get('/persons', async (req, res) => {
    try {
        // find() method to get all documents from collection
        const persons = await Person.find();
    
        res.json({
            count: persons.length,
            persons
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

**Mongoose Find Methods:**

```javascript
// Get all documents
Person.find()

// Find with conditions
Person.find({ age: { $gte: 18 } }) // Age >= 18
Person.find({ name: "John" })

// Find one document
Person.findOne({ email: "john@example.com" })

// Find by ID
Person.findById("507f1f77bcf86cd799439011")

// Find with limit and sort
Person.find().limit(10).sort({ age: -1 }) // Top 10, oldest first
```

### UPDATE - Modify Existing Person

```javascript
app.put('/person', async (req, res) => {
    try {
        const { id } = req.body;

        // METHOD 1: Find, modify, and save
        // const personData = await Person.findById(id);
        // personData.age = 20;
        // await personData.save();

        // METHOD 2: Find by name (returns first match)
        // const personData = await Person.findOne({ name: "John" });

        // METHOD 3: Find all matching documents
        // const personData = await Person.find({ name: "John" });

        // METHOD 4: findByIdAndUpdate (Recommended)
        const personData = await Person.findByIdAndUpdate(
            id,                    // Document ID
            { age: 25 },          // Update object
            { new: true }         // Return updated document
        );

        if (!personData) {
            return res.status(404).json({ error: "Person not found" });
        }

        console.log(personData);
        res.json({
            message: "Person Updated",
            person: personData
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
```

### DELETE - Remove Person

```javascript
app.delete('/person/:id', async (req, res) => {
    try {
        const { id } = req.params;
    
        // findByIdAndDelete method
        const deletedPerson = await Person.findByIdAndDelete(id);
    
        if (!deletedPerson) {
            return res.status(404).json({ error: "Person not found" });
        }
    
        res.json({
            message: "Person Deleted",
            person: deletedPerson
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
```

**Delete Methods:**

```javascript
// Delete by ID
Person.findByIdAndDelete(id)

// Delete one document
Person.deleteOne({ email: "john@example.com" })

// Delete multiple documents
Person.deleteMany({ age: { $lt: 18 } })

// Find and delete
Person.findOneAndDelete({ name: "John" })
```

---

## Complete Project Structure

```
project/
├── config/
│   └── db.js           # Database connection
├── models/
│   └── Person.js       # Mongoose schema & model
├── public/             # Static files
│   ├── index.html
│   └── style.css
├── uploads/            # File uploads (create automatically)
├── index.js            # Main server file
├── package.json
└── .env                # Environment variables (add to .gitignore)
```

---

## Testing Your API

### Using Postman

1. **CREATE:** POST to `http://localhost:3000/person`
   * Body: JSON → `{"name":"John","email":"john@test.com","age":25}`
2. **READ:** GET to `http://localhost:3000/persons`
3. **UPDATE:** PUT to `http://localhost:3000/person`
   * Body: JSON → `{"id":"507f1f77bcf86cd799439011"}`
4. **DELETE:** DELETE to `http://localhost:3000/person/507f1f77bcf86cd799439011`


# Day 3: Cookies, Sessions, Authentication, REST APIs & Project Scaffolding

---

## Table of Contents

1. [Cookies in Express](#cookies-in-express)
2. [Sessions in Express](#sessions-in-express)
3. [Authentication Methods](#authentication-methods)
4. [Building RESTful APIs](#building-restful-apis)
5. [Project Scaffolding &amp; MVC Pattern](#project-scaffolding--mvc-pattern)

---

## Cookies in Express

### What are Cookies?

**Cookies** are small pieces of data (max 4KB) stored in the user's browser. They are sent with every HTTP request to the server, allowing the server to remember information about the user.

**Common Uses:**

* Remember user preferences (theme, language)
* Track user sessions
* Store shopping cart data
* Analytics and tracking

### Cookie Properties

| Property     | Description                                        | Example                           |
| ------------ | -------------------------------------------------- | --------------------------------- |
| `maxAge`   | Lifetime in milliseconds                           | `3600000`(1 hour)               |
| `expires`  | Expiration date                                    | `new Date(2025, 11, 31)`        |
| `httpOnly` | Cannot be accessed via JavaScript (XSS protection) | `true`                          |
| `secure`   | Only sent over HTTPS                               | `true`                          |
| `sameSite` | CSRF protection                                    | `'strict'`,`'lax'`,`'none'` |
| `path`     | URL path where cookie is valid                     | `'/'`(all paths)                |
| `domain`   | Domain where cookie is valid                       | `'.example.com'`                |
| `signed`   | Cookie is signed (tamper protection)               | `true`                          |

### Implementation

**Install cookie-parser:**

```bash
npm install cookie-parser
```

**File: `Cookies.js`**

```javascript
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

// Middleware to parse cookies
app.use(cookieParser());

// SET Cookie - Create a cookie
app.get("/", (req, res) => {
    // res.cookie(name, value, options)
    res.cookie("name", "priyansh", {
        maxAge: 3600000,      // Cookie expires in 1 hour (in milliseconds)
        httpOnly: true,       // Cannot be accessed by JavaScript (prevents XSS attacks)
        secure: true,         // Only sent over HTTPS (use in production)
        sameSite: 'strict'    // CSRF protection
    });
    res.send("Cookie has been set!");
});

// GET Cookies - Read all cookies
app.get('/fetch', (req, res) => {
    // req.cookies is an object containing all cookies sent by the client
    console.log('Cookies: ', req.cookies);
    res.json({
        message: "Cookies fetched successfully",
        cookies: req.cookies
    });
});

// CLEAR Cookie - Delete a specific cookie
app.get('/clear', (req, res) => {
    // res.clearCookie(name, options)
    res.clearCookie("name");
    res.send("Cookie cleared successfully");
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
```

### Advanced Cookie Features

**Multiple Cookies:**

```javascript
app.get('/set-multiple', (req, res) => {
    res.cookie('username', 'john_doe', { maxAge: 3600000 });
    res.cookie('theme', 'dark', { maxAge: 86400000 }); // 24 hours
    res.cookie('language', 'en', { maxAge: 86400000 });
    res.send("Multiple cookies set");
});
```

**Signed Cookies (Tamper Protection):**

```javascript
// Pass secret key to cookieParser
app.use(cookieParser('my-secret-key-12345'));

// Set signed cookie
app.get('/set-signed', (req, res) => {
    res.cookie('user_id', '12345', { signed: true, httpOnly: true });
    res.send("Signed cookie set");
});

// Read signed cookie
app.get('/read-signed', (req, res) => {
    console.log('Signed Cookies:', req.signedCookies);
    res.json(req.signedCookies);
});
```

### Cookie Security Best Practices

```javascript
// Production-ready cookie settings
const cookieOptions = {
    httpOnly: true,        // Prevent XSS attacks
    secure: true,          // HTTPS only
    sameSite: 'strict',    // CSRF protection
    maxAge: 3600000,       // 1 hour
    signed: true           // Tamper protection
};

res.cookie('session_token', token, cookieOptions);
```

**⚠️ Security Notes:**

* Always use `httpOnly: true` to prevent XSS attacks
* Use `secure: true` in production (HTTPS)
* Use `sameSite: 'strict'` to prevent CSRF attacks
* Never store sensitive data (passwords) in cookies
* Sign cookies to detect tampering

---

## Sessions in Express

### What are Sessions?

**Sessions** store user data on the server (not in the browser). The server sends a **session ID** to the client as a cookie, and uses this ID to retrieve session data on subsequent requests.

**Cookies vs Sessions:**

| Feature          | Cookies                       | Sessions                      |
| ---------------- | ----------------------------- | ----------------------------- |
| Storage Location | Client (browser)              | Server                        |
| Size Limit       | 4KB                           | No practical limit            |
| Security         | Less secure (visible to user) | More secure (data on server)  |
| Performance      | Faster (no server lookup)     | Slower (server lookup needed) |
| Best For         | Small data (preferences)      | Sensitive data (user info)    |

### How Sessions Work

1. User logs in → Server creates session → Stores session data in memory/database
2. Server sends **session ID** to client as a cookie (e.g., `connect.sid=abc123`)
3. Client sends session ID with every request
4. Server uses session ID to retrieve user data

### Implementation

**Install express-session:**

```bash
npm install express-session
```

**File: `Session.js`**

```javascript
import express from 'express';
import session from 'express-session';

const app = express();
const port = 3000;

// Session middleware configuration
app.use(session({
    secret: 'your-secret-key',        // Key to sign session ID cookie (change in production!)
    saveUninitialized: false,         // Don't create session until something is stored
    resave: false,                    // Don't save session if unmodified
    cookie: {
        maxAge: 3600000,              // Session expires in 1 hour
        httpOnly: true,               // Cannot be accessed by JavaScript
        secure: false                 // Set to true in production with HTTPS
    }
}));

app.get("/", (req, res) => {
    res.send("Session Management Server");
});

// CREATE/UPDATE Session - Track page views
app.get('/visit', (req, res) => {
    // req.session is used to access session data
    // page_views is a custom property we create
    if (req.session.page_views) {
        req.session.page_views++;
        res.send(`You visited this page ${req.session.page_views} times`);
    } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
    }
});

// READ Session Data
app.get('/profile', (req, res) => {
    if (req.session.user) {
        res.json({
            message: "User profile",
            user: req.session.user
        });
    } else {
        res.status(401).send("Please login first");
    }
});

// DELETE Session - Logout
app.get('/remove-visit', (req, res) => {
    // req.session.destroy() clears all session data
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Error clearing session");
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        res.send("Session cleared successfully");
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
```

### Session Configuration Options

```javascript
app.use(session({
    // Required Options
    secret: 'keyboard-cat-secret',      // Secret key to sign session ID

    // Session Storage
    saveUninitialized: false,           // false = only save session when modified
    resave: false,                      // false = don't save if unmodified

    // Cookie Options
    cookie: {
        maxAge: 3600000,                // 1 hour in milliseconds
        httpOnly: true,                 // Prevent client-side access
        secure: false,                  // true = HTTPS only (production)
        sameSite: 'strict'              // CSRF protection
    },

    // Session Name
    name: 'sessionId',                  // Cookie name (default: 'connect.sid')

    // Store (default: MemoryStore - not for production!)
    // store: new RedisStore({ client: redisClient })
}));
```

### Session Storage Options

**MemoryStore (Default - Development Only):**

* Fast but not scalable
* Data lost when server restarts
* **Don't use in production!**

**Production Options:**

```bash
# Redis (Recommended)
npm install connect-redis redis

# MongoDB
npm install connect-mongo

# PostgreSQL
npm install connect-pg-simple
```

**Redis Example:**

```javascript
import RedisStore from 'connect-redis';
import { createClient } from 'redis';

const redisClient = createClient();
redisClient.connect();

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
```

### Common Session Operations

```javascript
// Store user data
req.session.user = { id: 1, username: 'john' };

// Read session data
const user = req.session.user;

// Update session data
req.session.user.lastLogin = new Date();

// Delete specific property
delete req.session.user;

// Regenerate session (after login)
req.session.regenerate((err) => {
    req.session.user = userData;
});

// Destroy session (logout)
req.session.destroy((err) => {
    res.clearCookie('connect.sid');
});
```

---

## Authentication Methods

### What is Authentication?

**Authentication** is the process of verifying the identity of a user. It answers: "Are you who you say you are?"

**Authentication vs Authorization:**

* **Authentication** : Verifying identity (login)
* **Authorization** : Verifying permissions (access control)

### Method 1: Session-Based Authentication

**How it Works:**

1. User submits credentials (username/password)
2. Server verifies credentials
3. Server creates session and stores user data
4. Server sends session ID to client as cookie
5. Client sends session ID with every request
6. Server retrieves user data using session ID

**File: `Authentication.js` (Session Method)**

```javascript
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'your-secret-key',        // Change this in production!
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 3600000,              // 1 hour
        httpOnly: true,
        secure: false                 // true in production
    }
}));

// In-memory user storage (use database in production)
const users = [];

app.get("/", (req, res) => {
    res.send("Authentication Server");
});

// REGISTER - Create new user
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Store user (in production, hash password first!)
    users.push({ username, password });
    res.status(201).json({ message: "User registered successfully" });
});

// LOGIN - Authenticate user
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Find user
    const user = users.find(u => u.username === username && u.password === password);
  
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Store user info in session after successful login
    req.session.user = { username: user.username };
    console.log('Session created:', req.session);
  
    res.json({ message: "Login successful" });
});

// PROTECTED ROUTE - Requires authentication
app.get('/dashboard', (req, res) => {
    // Check if user is logged in by verifying session data
    if (!req.session.user) {
        return res.status(401).json({ message: "Please login to access dashboard" });
    }
  
    res.json({
        message: `Welcome, ${req.session.user.username} to your dashboard`,
        user: req.session.user
    });
});

// LOGOUT - Destroy session
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Error logging out" });
        }
        res.clearCookie('connect.sid');
        res.json({ message: "Logged out successfully" });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
```

**Pros:**

* Easy to implement
* Server has full control
* Easy to invalidate sessions

**Cons:**

* Requires server-side storage
* Not ideal for microservices
* Difficult to scale horizontally

---

### Method 2: Token-Based Authentication (JWT)

**What is JWT?**

**JWT (JSON Web Token)** is a compact, self-contained token that contains user information. It consists of three parts:

```
header.payload.signature
```

**Structure:**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE2MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**Parts:**

1. **Header** : Algorithm and token type

```json
   { "alg": "HS256", "typ": "JWT" }
```

1. **Payload** : User data (claims)

```json
   { "username": "john", "iat": 1616239022, "exp": 1616242622 }
```

1. **Signature** : Verification hash

```
   HMACSHA256(base64(header) + "." + base64(payload), secret)
```

**How JWT Authentication Works:**

1. User submits credentials
2. Server verifies credentials
3. Server creates JWT with user data and signs it
4. Server sends JWT to client
5. Client stores JWT (localStorage/cookie)
6. Client sends JWT in `Authorization` header with every request
7. Server verifies JWT signature and extracts user data

**Install Required Packages:**

```bash
npm install bcrypt jsonwebtoken
```

**File: `Authentication.js` (JWT Method)**

```javascript
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;

app.use(express.json());

// Secret key for JWT (store in environment variable!)
const JWT_SECRET = 'priyansh@saxena';

// In-memory user storage (use database in production)
const users = [];

app.get("/", (req, res) => {
    res.send("JWT Authentication Server");
});

// REGISTER - Create new user with hashed password
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password required" });
        }

        // Check if user already exists
        if (users.find(u => u.username === username)) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password using bcrypt (10 = salt rounds)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store user with hashed password
        users.push({ username, password: hashedPassword });
      
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});

// LOGIN - Authenticate user and return JWT
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = users.find(u => u.username === username);
      
        // Verify user exists and password matches
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Create JWT token
        const token = jwt.sign(
            { username },                    // Payload (user data)
            JWT_SECRET,                      // Secret key
            { expiresIn: '1h' }              // Token expires in 1 hour
        );

        res.json({
            message: "Login successful",
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
});

// PROTECTED ROUTE - Requires valid JWT
app.get('/dashboard', (req, res) => {
    try {
        // Get token from Authorization header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Verify and decode token
        const decoded = jwt.verify(token, JWT_SECRET);

        res.json({
            message: `Welcome, ${decoded.username} to your dashboard`,
            user: decoded
        });
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
```

### JWT Authentication Middleware

**Create reusable middleware:**

```javascript
// middleware/auth.js
export const authenticateToken = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
      
        if (!token) {
            return res.status(401).json({ message: "Access denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// Use in routes
app.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}` });
});
```

### Testing Authentication

**Register User:**

```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"secret123"}'
```

**Login:**

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"secret123"}'
```

**Access Protected Route:**

```bash
curl -X GET http://localhost:3000/dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Bcrypt Explained

**What is Bcrypt?**

* Password hashing algorithm
* Intentionally slow (prevents brute-force attacks)
* Automatically handles salt (random data added to password)

**Hashing vs Encryption:**

* **Hashing** : One-way (cannot be reversed) - `password123` → `$2b$10$xyz...`
* **Encryption** : Two-way (can be decrypted) - Not suitable for passwords

**Salt Rounds:**

```javascript
// Higher = more secure but slower
await bcrypt.hash(password, 10);  // 10 rounds (recommended)
await bcrypt.hash(password, 12);  // 12 rounds (more secure)
```

**How Bcrypt Works:**

1. Generate random salt
2. Combine password + salt
3. Hash multiple rounds (10x = 1024 iterations)
4. Store hash (includes salt)

**Example:**

```javascript
// Hashing
const hash = await bcrypt.hash('myPassword123', 10);
// Output: $2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

// Comparing
const isMatch = await bcrypt.compare('myPassword123', hash);
// Output: true
```

### JWT vs Session Authentication

| Feature     | Session-Based                   | JWT (Token-Based)                |
| ----------- | ------------------------------- | -------------------------------- |
| Storage     | Server (memory/DB)              | Client (localStorage/cookie)     |
| Scalability | Harder (needs shared storage)   | Easier (stateless)               |
| Security    | More secure (server-controlled) | Less secure (client-stored)      |
| Performance | Slower (DB lookup)              | Faster (no DB lookup)            |
| Logout      | Easy (destroy session)          | Hard (token still valid)         |
| Best For    | Traditional web apps            | APIs, microservices, mobile apps |

---

## Building RESTful APIs

### What is REST?

**REST (Representational State Transfer)** is an architectural style for building APIs. RESTful APIs use HTTP methods to perform CRUD operations.

**REST Principles:**

1. **Stateless** : Each request contains all necessary information
2. **Client-Server** : Separation of concerns
3. **Uniform Interface** : Consistent API design
4. **Cacheable** : Responses can be cached
5. **Layered System** : Architecture can have multiple layers

### HTTP Methods for CRUD

| Operation  | HTTP Method | Example                    | Description         |
| ---------- | ----------- | -------------------------- | ------------------- |
| Create     | POST        | `POST /api/products`     | Create new resource |
| Read (All) | GET         | `GET /api/products`      | Get all resources   |
| Read (One) | GET         | `GET /api/products/1`    | Get single resource |
| Update     | PUT/PATCH   | `PUT /api/products/1`    | Update resource     |
| Delete     | DELETE      | `DELETE /api/products/1` | Delete resource     |

### HTTP Status Codes

| Code | Meaning               | Usage                                |
| ---- | --------------------- | ------------------------------------ |
| 200  | OK                    | Successful GET, PUT, DELETE          |
| 201  | Created               | Successful POST                      |
| 204  | No Content            | Successful DELETE (no data returned) |
| 400  | Bad Request           | Invalid input                        |
| 401  | Unauthorized          | Authentication required              |
| 403  | Forbidden             | No permission                        |
| 404  | Not Found             | Resource doesn't exist               |
| 500  | Internal Server Error | Server error                         |

### Professional REST API Implementation

**File: `RestApi.js`**

```javascript
import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

// In-memory data storage (use database in production)
let products = [
    { id: 1, name: "Laptop", price: 1000, stock: 10 },
    { id: 2, name: "Phone", price: 500, stock: 25 },
    { id: 3, name: "Tablet", price: 800, stock: 15 }
];

// Base route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the REST API',
        version: '1.0.0',
        endpoints: {
            products: '/api/products',
            singleProduct: '/api/products/:id'
        }
    });
});

// GET all products
app.get('/api/products', (req, res) => {
    // Always send JSON response with status code
    res.status(200).json({
        success: true,
        count: products.length,
        data: products
    });
});

// GET single product by ID
app.get('/api/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);
  
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
            error: `No product with id: ${id}`
        });
    }
  
    res.status(200).json({
        success: true,
        data: product
    });
});

// POST - Create new product
app.post('/api/products/add', (req, res) => {
    // Validate input
    const { name, price, stock } = req.body;
  
    if (!name || !price) {
        return res.status(400).json({
            success: false,
            message: "Please provide name and price"
        });
    }
  
    // Create new product
    const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name,
        price: Number(price),
        stock: stock || 0
    };
  
    products.push(newProduct);
  
    // Return 201 Created status
    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: newProduct
    });
});

// PUT - Update entire product
app.put('/api/products/update/:id', (req, res) => {
    const id = Number(req.params.id);
    const { name, price, stock } = req.body;
  
    const index = products.findIndex(p => p.id === id);
  
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }
  
    // Update product (PUT replaces entire resource)
    products[index] = {
        id,
        name: name || products[index].name,
        price: price !== undefined ? Number(price) : products[index].price,
        stock: stock !== undefined ? Number(stock) : products[index].stock
    };
  
    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: products[index]
    });
});

// PATCH - Partial update (bonus)
app.patch('/api/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const updates = req.body;
  
    const product = products.find(p => p.id === id);
  
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }
  
    // Apply partial updates
    Object.assign(product, updates);
  
    res.status(200).json({
        success: true,
        message: "Product partially updated",
        data: product
    });
});

// DELETE - Remove product
app.delete('/api/products/delete/:id', (req, res) => {
    const id = Number(req.params.id);
    const initialLength = products.length;
  
    products = products.filter(p => p.id !== id);
  
    if (products.length === initialLength) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }
  
    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        data: { id }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
```

### REST API Best Practices

**1. Use Proper HTTP Methods:**

```javascript
// ✅ Correct
POST /api/products        // Create
GET /api/products         // Read all
GET /api/products/:id     // Read one
PUT /api/products/:id     // Update
DELETE /api/products/:id  // Delete

// ❌ Wrong
GET /api/createProduct
GET /api/deleteProduct/:id
```

**2. Use Plural Nouns for Resources:**

```javascript
// ✅ Correct
/api/products
/api/users

// ❌ Wrong
/api/product
/api/user
```

**3. Consistent Response Format:**

```javascript
// Success response
{
    "success": true,
    "data": {...},
    "message": "Operation successful"
}

// Error response
{
    "success": false,
    "error": "Error message",
    "message": "User-friendly message"
}
```

**4. Use Status Codes Correctly:**

```javascript
res.status(200).json({...})  // Success
res.status(201).json({...})  // Created
res.status(400).json({...})  // Bad request
res.status(404).json({...})  // Not found
res.status(500).json({...})  // Server error
```

**5. Implement Pagination:**

```javascript
app.get('/api/products', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
  
    const paginatedProducts = products.slice(startIndex, endIndex);
  
    res.json({
        success: true,
        page,
        limit,
        totalPages: Math.ceil(products.length / limit),
        data: paginatedProducts
    });
});
```

**6. Add Filtering & Sorting:**

```javascript
app.get('/api/products', (req, res) => {
    let result = [...products];
  
    // Filter by price
    if (req.query.minPrice) {
        result = result.filter(p => p.price >= Number(req.query.minPrice));
    }
  
    // Sort
    if (req.query.sort) {
        const sortField = req.query.sort;
        result.sort((a, b) => a[sortField] - b[sortField]);
    }
  
    res.json({ success: true, data: result });
});

// Usage: /api/products?minPrice=500&sort=price
```

---

## Project Scaffolding & MVC Pattern

### What is Project Scaffolding?

**Project Scaffolding** is the process of automatically generating a basic project structure with folders, files, and configuration. It helps you start projects faster with best practices built-in.

### MVC Pattern

**MVC (Model-View-Controller)** is a design pattern that separates application logic into three interconnected components:

```
┌─────────────┐
│    View     │  ← What user sees (HTML/Frontend)
└──────┬──────┘
       │
┌──────▼──────┐
│ Controller  │  ← Handles requests, business logic
└──────┬──────┘
       │
┌──────▼──────┐
│    Model    │  ← Database operations, data logic
└─────────────┘
```

**Components:**

1. **Model** : Database schema, data validation, business logic
2. **View** : HTML templates, JSON responses (for APIs)
3. **Controller** : Request handling, calling models, sending responses

### Professional Project Structure

```
project/
├── config/
│   ├── db.js              # Database connection
│   └── env.js             # Environment variables
├── controllers/
│   ├── userController.js  # User-related logic
│   └── productController.js
├── models/
│   ├── User.js            # User schema
│   └── Product.js         # Product schema
├── routes/
│   ├── userRoutes.js      # User routes
│   └── productRoutes.js   # Product routes
├── middleware/
│   ├── auth.js            # Authentication middleware
│   ├── errorHandler.js    # Error handling
│   └── validator.js       # Input validation
├── utils/
│   ├── helpers.js         # Utility functions
│   └── logger.js          # Logging
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── views/                 # Template files (if using)
│   └── index.ejs
├── tests/                 # Test files
│   ├── user.test.js
│   └── product.test.js
├── .env                   # Environment variables (don't commit!)
├── .gitignore
├── package.json
├── README.md
└── server.js              # Entry point
```

### Implementing MVC Pattern

**1. Model (`models/Product.js`):**

```javascript
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0 },
    category: { type: String, required: true }
}, { timestamps: true });

// Add methods to schema
productSchema.methods.isInStock = function() {
    return this.stock > 0;
};

// Static methods
productSchema.statics.findByCategory = function(category) {
    return this.find({ category });
};

export const Product = mongoose.model('Product', productSchema);
```

**2. Controller (`controllers/productController.js`):**

```javascript
import { Product } from '../models/Product.js';

// GET all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET single product
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
      
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
      
        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// CREATE product
export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE product
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
      
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
      
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: product
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
      
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
      
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
```

**3. Routes (`routes/productRoutes.js`):**

```javascript
import express from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

// Routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
```

**4. Main Server (`server.js`):**

```javascript
import express from 'express';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Connect to database
await connectDB();

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'API is running' });
});

app.use('/api/products', productRoutes);

// Error handling
app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: err.message
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
```

### Express Generator (Automated Scaffolding)

**Install Express Generator:**

```bash
npm install -g express-generator
```

**Generate Project:**

```bash
# Basic project
express myapp

# With EJS template engine
express --view=ejs myapp

# With Pug template engine
express --view=pug myapp

# Without view engine (API only)
express --no-view myapp
```

**Generated Structure:**

```
myapp/
├── bin/
│   └── www              # Server startup script
├── public/
│   ├── images/
│   ├── javascripts/
│   └── stylesheets/
│       └── style.css
├── routes/
│   ├── index.js
│   └── users.js
├── views/
│   ├── error.ejs
│   └── index.ejs
├── app.js               # Main application file
└── package.json
```

**Install Dependencies & Run:**

```bash
cd myapp
npm install
npm start
```

### Middleware Structure

**Create `middleware/auth.js`:**

```javascript
import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
      
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }
      
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }
        next();
    };
};
```

**Usage:**

```javascript
import { authenticate, authorize } from './middleware/auth.js';

// Protect route
router.get('/profile', authenticate, getProfile);

// Admin only route
router.delete('/users/:id', authenticate, authorize('admin'), deleteUser);
```

### Environment Variables

**Install dotenv:**

```bash
npm install dotenv
```

**Create `.env` file:**

```
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mydb
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=1h
```

**Load in `server.js`:**

```javascript
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET;
```

**Add to `.gitignore`:**

```
node_modules/
.env
.env.local
.env.production
```

### Complete MVC Example

**Full Project Setup:**

**`config/db.js`:**

```javascript
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
```

**`server.js`:**

```javascript
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Connect to database
await connectDB();

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'API is running',
        version: '1.0.0'
    });
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
```

---

## Key Takeaways

### Cookies

✅ Small data stored in browser (max 4KB)

✅ Sent with every request

✅ Use `httpOnly`, `secure`, `sameSite` for security

✅ Good for: preferences, tracking, session IDs

### Sessions

✅ Data stored on server, ID sent to client

✅ More secure than cookies

✅ Use Redis/MongoDB in production (not MemoryStore)

✅ Good for: user authentication, shopping carts

### Authentication

✅  **Session-based** : Server stores user data, good for traditional apps

✅  **JWT** : Stateless tokens, good for APIs and mobile apps

✅ Always hash passwords with bcrypt

✅ Use HTTPS in production

### REST APIs

✅ Use proper HTTP methods (GET, POST, PUT, DELETE)

✅ Return consistent JSON responses

✅ Use correct status codes

✅ Implement pagination, filtering, sorting

✅ Follow naming conventions (plural nouns)

### MVC Pattern

✅  **Model** : Database logic

✅  **View** : Presentation (templates/JSON)

✅  **Controller** : Request handling

✅ Separates concerns, makes code maintainable

### Project Structure

✅ Organize code into folders (models, controllers, routes)

✅ Use environment variables for secrets

✅ Implement middleware for reusable logic

✅ Use Express Generator for quick setup
