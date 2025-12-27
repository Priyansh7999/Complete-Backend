import express from 'express';

const app = express()
const port = 3000;

// Middleware

app.use((req,res,next)=>{
    console.log(`Start`);
    res.on('finish',()=>{
        console.log(`End`);
    }); 
    next();
})

// app.use('/welcome',(req,res,next)=>{
//     console.log(`${req.method} request received for ${req.url} at ${new Date().toISOString()}`);
//     next();
// })

// Define a simple route
app.get("/",(req,res)=>{
    console.log(`Middle`);
    res.send("Hello, World!");
})
app.get("/error",(req,res)=>{
    throw new Error("Something went wrong!");
})
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.send('Internal Server Error!');
});

// app.get("/welcome",(req,res)=>{
//     res.send("welcome to express js");
// })

// Define additional routes
    // app.get('/about', (req, res) => {
    //     res.send('This is the about page.');
    // });


// Dynamic route with URL parameter
    // app.get('/user/:username', (req, res) => {
    //     const username=req.params.username;
    //     res.send(`Welcome, ${username}!`);
    // });

    // how to handle multiple route parameters
        // app.get('/things/:name/:id',(req,res)=>{
        //     const {name,id}=req.params;
        //     res.send(`This is ${name} with id ${id}`);
        // })


// Route with query parameter
    // app.get('/search', (req, res) => {
    //     const keyword=req.query.keyword;
    //     res.send(`You Search, ${keyword}!`);
    // }); 

// using Controllers (Module Route Handling)
    // import { userLogin,userSignup } from './controller.js';
    // app.get('/user/login', userLogin); 
    // app.get('/user/signup', userSignup);

// Using Express Router (Modular Route Handling)
    // import router from './route.js';
    // app.use('/user', router);


// POST Request Handling
    // app.use(express.json());// Middleware to parse JSON bodies
    // app.post('/users',(req,res)=>{
    //     const {name,email}=req.body;
    //     res.json({
    //         message:`User ${name} with email ${email} created successfully!`
    //     })
    // })

// PUT Request Handling
    // app.use(express.json());// Middleware to parse JSON bodies
    // app.put('/users/:id',(req,res)=>{
    //     const id=req.params.id;
    //     const {name,email}=req.body;
    //     res.json({
    //         message:`User with id ${id} updated to name: ${name}, email: ${email}`
    //     })
    // })

// DELETE Request Handling
    // app.delete('/users/:id',(req,res)=>{
    //     const id=req.params.id;
    //     res.json({
    //         message:`User with id ${id} deleted successfully!`
    //     })
    // }) 











// catch-all invalid route (404 Handling) always at bottom
    app.use((req, res) => {
        res.status(404).send('Sorry, the route you are looking for does not exist.');
    });

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})