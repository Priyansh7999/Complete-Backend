import express from 'express';
import { connectDB } from './config/db.js';
import { Person } from './models/Person.js';

const app = express()
const port = 3000;
app.use(express.json()); // middleware to parse json body
// Connect to MongoDB 
// for this we use config folder that has db.js file that has the connection logic
await connectDB();

// CURD Opewrations Routes
app.get('/', (req, res) => {
    res.send("Hello from Express");
});

// Create Person Route - to add a new person to the database
app.post('/person', async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, age } = req.body;
        // Create a new Person document[means row in table]
        const newPerson = new Person({
            name,
            age,
            email
        })
        // Save the document to the database[means save the row in table]
        await newPerson.save();
        console.log(newPerson);
        res.send("Person Added");
    } catch (error) {
        res.send(error.message);
    }
})

// Update Person Route - to update an existing person in the database
app.put('/person', async (req, res) => {
    // const { name } = req.body;
    // find method to find the document and update it
    // const personData = await Person.find({ name })

    // findOne method to find a single document and update it if 2 have same name then first created will be updated
    // const personData = await Person.findOne({ name })

    // findById method to find a document by its unique _id and update it
    // const {id}=req.body;
    // const personData = await Person.findById(id);
    // personData.age=20;
    // await personData.save(); // save the updated document

    // findByIdAndUpdate method to find a document by its unique _id and update it directly
    const {id}=req.body;
    const personData = await Person.findByIdAndUpdate(id, { age: 25 }, { new: true });
    console.log(personData);
    res.send("Person Updated");
})

// Delete Person Route - to delete an existing person from the database
app.delete('/person/:id', async (req, res) => {
    const { id } = req.params;
    // findByIdAndDelete method to find a document by its unique _id and delete it directly
    await Person.findByIdAndDelete(id);
    res.send("Person Deleted");
})

// Get All Persons Route - to get all persons from the database
app.get('/persons', async (req, res) => {
    const persons = await Person.find(); // find method to get all documents
    res.json(persons);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});