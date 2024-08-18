const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route to serve form.js with query parameters
app.get('/form.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.js'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
