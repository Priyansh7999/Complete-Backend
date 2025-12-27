import express from 'express';

const app = express()
const port = 3000;

// Define a simple route
app.get("/",(req,res)=>{
    res.send("Hello, World!");
})


// Define additional routes
    // app.get('/about', (req, res) => {
    //     res.send('This is the about page.');
    // });


// Dynamic route with URL parameter
    // app.get('/user/:username', (req, res) => {
    //     const username=req.params.username;
    //     res.send(`Welcome, ${username}!`);
    // });

// Route with query parameter
    // app.get('/search', (req, res) => {
    //     const keyword=req.query.keyword;
    //     res.send(`You Search, ${keyword}!`);
    // }); 

// using Controllers (Module Route Handling)
    import { userLogin,userSignup } from './controller.js';
    // app.get('/user/login', userLogin); 
    // app.get('/user/signup', userSignup);

// Using Express Router (Modular Route Handling)
    import router from './route.js';
    app.use('/user', router);





// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})