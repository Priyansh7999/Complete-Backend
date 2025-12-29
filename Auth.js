import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const app = express()
const port = 3000;
app.use(express.json())

// Method 1: Session and Cookies based Authentication
// app.use(cookieParser());
// app.use(session({
//     secret: 'your-secret-key', // replace with a strong secret key
//     saveUninitialized: true, // don't create session until something stored
//     resave: false, // don't save session if unmodified
// }));

// app.get("/",(req,res)=>{
//     res.send("Authentication");
// })
// const users=[];
// app.post('/register',async (req,res)=>{
//     const {username,password}=req.body;
//     users.push({username,password});
//     res.send("User registered");
// });

// app.post('/login',async (req,res)=>{
//     const {username,password}=req.body;
//     const user=users.find(u=>u.username===username && u.password===password);
//     if(!user){
//         return res.send("Invalid credentials");
//     }
//     // Storing user info in session after successful login
//     req.session.user=user;
//     console.log(req.session);
//     res.send("Login successful");
// });

// app.get('/dashboard',(req,res)=>{
//     // Checking if user is logged in by verifying session data
//     if(!req.session.user){
//         return res.send("Please login to access dashboard");
//     }else{
//         res.send(`Welcome, ${req.session.user.username} to your dashboard`);
//     }
// });



// Method 2: Token based Authentication (Using JWT)

app.get("/",(req,res)=>{
    res.send("Authentication");
})
const users=[];
app.post('/register',async (req,res)=>{
    const {username,password}=req.body;
    const hasedPassword = await bcrypt.hash(password,10);
    users.push({username,password:hasedPassword});
    res.send("User registered");
});

app.post('/login',async (req,res)=>{
    const {username,password}=req.body;
    const user=users.find(u=>u.username===username);
    if(!user || !(await bcrypt.compare(password,user.password))){
        return res.send("Not Authorized");
    }
    const token = jwt.sign({username},'priyansh@saxena',{expiresIn:'1h'});
    res.json({message:"Login successful",token});
});

app.get('/dashboard',(req,res)=>{
    try {
        const token = req.header('Authorization')
    const decodeToken = jwt.verify(token,'priyansh@saxena');
    if(!decodeToken){
        return res.send("Not Authorized");
    }else{
        res.send(`Welcome, ${decodeToken.username} to your dashboard`);
    }
    } catch (error) {
        res.send("Not Authorized");
    }
    
});


// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})