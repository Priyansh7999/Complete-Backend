import express from 'express';
import session from 'express-session';              
const app = express()
const port = 3000;
// install session first using npm i express-session
app.use(session({
    secret: 'your-secret-key', // replace with a strong secret key
    saveUninitialized: true, // don't create session until something stored
    resave: false, // don't save session if unmodified
}))
app.get("/",(req,res)=>{
    res.send("Cookies");
})
app.get('/visit',(req,res)=> {
    // req.session is used to access session data and page_views is a custom property
    if(req.session.page_views){
        req.session.page_views++;
        res.send(`You visited this page ${req.session.page_views} times`);
    }else{
        req.session.page_views=1;
        res.send("Welcome to this page for the first time!");
    }
});
app.get('/remove-visit',(req,res)=>{
    // req.session.destroy() is used to clear the session data
    req.session.destroy();
    res.send("Session cleared");
});




// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})