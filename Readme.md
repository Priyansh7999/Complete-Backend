in this we are going to learn full backend 

1. Download the node and express
2. initialise the node and git
3. install express
4. Create a express server(server.js)
const express=require('express');

const app=express()

const port=3000;

// Define a simple route

app.get("/",(req,res)=>{

    res.send("Hello, World!");

})

// Start the server

app.listen(port, () => {

    console.log(`Example app listening on port ${port}`)

})

4.
