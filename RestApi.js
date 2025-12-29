import express from 'express';
const app = express()
const port = 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.json('Welcome to the REST API');
});

// GET all product data
app.get('/api/products', (req, res) => {
    const products =[
        {id:1,name:"laptop",price:1000},
        {id:2,name:"phone",price:500},
        {id:3,name:"tablet",price:800},
    ]
    // when ever use rest api send a json response
    res.status(200).json(products)
});
// GET single product data
app.get('/api/products/:id',(req,res)=>{
    const products =[
        {id:1,name:"laptop",price:1000},
        {id:2,name:"phone",price:500},
        {id:3,name:"tablet",price:800},
    ]
    const id = req.params.id;
    const product = products.find(p=>p.id==Number(id));
    if(!product){
        res.status(404).json({
            message:"Product Not Found"
        })
    }else{
        res.status(200).json(product)
    }
})


// POST create a new product
app.post('/api/products/add',(req,res)=>{
    const newProduct = req.body;
    newProduct.id = Date.now();
    res.status(201).json(newProduct)
})

// PUT update a product
app.put('/api/products/update/:id',(req,res)=>{
    const id = req.params.id;
    const updatedData = req.body;
    updatedData.id = Number(id);
    res.status(200).json(updatedData)
})

// DELETE a product
app.delete('/api/products/delete/:id',(req,res)=>{
    const products =[
        {id:1,name:"laptop",price:1000},
        {id:2,name:"phone",price:500},
        {id:3,name:"tablet",price:800},
    ]
    const id = req.params.id;
    const updatedList = products.filter(p=>p.id!==Number(id));
    res.status(200).json(updatedList)
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
