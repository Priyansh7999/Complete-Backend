import mongoose from "mongoose";

// Define the schema for Person [means table structure]
const personSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true, unique: true},
    userOrder: {type: Object, default:{}} //add proerty with empty data
}, {timestamps: true, minimize: false}) // to automatically add createdAt and updatedAt fields

// Create and export the Person model take 2 parameters: model name and schema [means table name and structure]
export const Person = mongoose.model('Person',personSchema)