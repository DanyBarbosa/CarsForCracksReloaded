const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get('/random-number', (req, res) => {
//     const randomNumber = Math.floor(Math.random() * 12) + 1;
//     res.json({ number: randomNumber });
// });

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});