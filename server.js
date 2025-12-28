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

// Serving Stataic files 
    // for serving a with file name only
    // app.use(express.static('public')); 
    // for serving files with folder name as prefix 
    // app.use('/public',express.static('public'));

// Handling Form Data
    // a) raw form urlencoded data
    // app.use(express.json());
    // app.use(express.urlencoded({extended:true})); // to parse form data
    // app.post('/form',(req,res)=>{
    //     console.log(req.body);
    //     res.send('Form Received!');
    // })
    // b) multipart/form-data (file uploads)
    // import multer from 'multer';
    // const storage = multer.diskStorage({
    //     destination:'uploads',
    //     filename:(req,file,cb)=>{
    //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //         const ext = path.extname(file.originalname);
    //         cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    //     }
    // });
    // const upload = multer({storage});
    // app.use(upload.single('image')); // for parsing multipart/form-data
    // app.use(express.json());
    // app.use(express.urlencoded({extended:true}));
    // app.post('/form',(req,res)=>{
    //     console.log(req.body);
    //     console.log(req.file); // uploaded file info
    //     res.send('Form Received!');
    // })




// catch-all invalid route (404 Handling) always at bottom
    app.use((req, res) => {
        res.status(404).send('Sorry, the route you are looking for does not exist.');
    });

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})