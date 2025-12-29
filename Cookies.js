import express from 'express';
import cookieParser from 'cookie-parser';
const app = express()
const port = 3000;

// install cookie-parser first using npm i cookie-parser
app.use(cookieParser());
app.get("/",(req,res)=>{
    // res.cookie(name,value,options) set a cookie in the browser
    res.cookie("name","priyansh",{maxAge:3600000,httpOnly:true, secure:true, });
    res.send("Cookies");
})


app.get('/fetch',(req,res)=>{
    // req.cookies is an object that contains all cookies sent by the client
    console.log('Cookies: ', req.cookies);
    res.send(req.cookies);
})

app.get('/clear',(req,res)=>{
    // res.clearCookie(name,options) clear a cookie in the browser
    res.clearCookie("name");
    res.send("Cookie cleared");
});
// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})