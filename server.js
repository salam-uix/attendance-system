const express = require('express');
const connectDB = require('./db');
const authenticate = require('./middleware/authenticate');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

const port = 4000


app.get('/private', authenticate, async (req, res) => {

    return res.status(200).json({ message: 'I am a private route' });

});

app.get('/public', (req, res) => {
    res.status(200).json({ message: 'I am public route' });
});

app.get('/', (req, res) => {
    const obj = {
        name: 'Ayman',
        email: 'ayman@example.com',
    };
    res.json(obj);
});

app.use((err, _req, res, _next) => {
    console.log(err);
    const message = err.message ? err.message : 'Server Error Ocurred';
    const status = err.status ? err.status : 500;
    res.status(status).json({ message })
})

connectDB('mongodb://localhost:27017/attendance-db')
    .then(() => {
        console.log('Database connected');
        app.listen(port, () => {
            console.log(`server listening on port ${port}`)
        })
    })
    .catch((e) => {
        console.log(e);
    });