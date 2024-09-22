const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Route to get styles.json
app.get('/styles', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'styles.json'));
});

// Route to update styles.json
app.post('/update-styles', (req, res) => {
    const updatedStyles = req.body;

    fs.writeFile(path.join(__dirname, 'public', 'styles.json'), JSON.stringify(updatedStyles, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Failed to update styles.');
        }
        res.send('Styles updated successfully.');
    });
});

// Catch-all route to serve form.js with query parameters
app.get('/form.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.js'));
});

app.get('/contactus.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contactus.js'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
