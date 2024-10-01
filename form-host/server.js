const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


app.get('/contactus.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contactus.js'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
