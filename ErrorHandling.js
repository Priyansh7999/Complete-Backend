import express from 'express';
const app = express()
const port = 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.json('Welcome to the Error Handling Example');
});
// Synchronous error example
app.get('/sync-error', (req, res, next) => {
    try {
        throw new Error('Synchronous error occurred!');
    } catch (error) {
        next(error);
    }
});

// Asynchronous error example
app.get('/async-error', async (req, res, next) => {
    try {
        await Promise.reject(new Error('Asynchronous error occurred!'));
    } catch (error) {
        next(error);
    }
});
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
