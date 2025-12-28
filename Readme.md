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

1. [Serving Static Files](https://claude.ai/chat/2405334a-278c-4a1a-932e-4d69314a1995#serving-static-files)
2. [Form Handling](https://claude.ai/chat/2405334a-278c-4a1a-932e-4d69314a1995#form-handling)
3. [MongoDB Setup &amp; Connection](https://claude.ai/chat/2405334a-278c-4a1a-932e-4d69314a1995#mongodb-setup--connection)
4. [Mongoose Schemas &amp; Models](https://claude.ai/chat/2405334a-278c-4a1a-932e-4d69314a1995#mongoose-schemas--models)
5. [CRUD Operations](https://claude.ai/chat/2405334a-278c-4a1a-932e-4d69314a1995#crud-operations)
6. [Complete Project Structure](https://claude.ai/chat/2405334a-278c-4a1a-932e-4d69314a1995#complete-project-structure)

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
