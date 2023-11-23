const express = require('express');
const path = require('path');
const fetch = require('node-fetch')

const port = 3000;
const app = express();

app.use('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/api/:city', async (req, res) => {
    const apiURL = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${req.params.city}`;
    try {
    const response = await fetch(apiURL)

        if (!response.ok) {
            throw new Error(`Failed to fetch data from Wikipedia. Status ${response.status}`);
        }
        
        const data = await response.json();
        res.send(data);
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
});

app.listen(port, () => {
    console.log('App listening on ' + port);
})