const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/phone', async (req, res) => {
    // Frontend se 'num' ya 'number' dono mein se jo bhi aaye use extract kar lega
    const num = req.query.num || req.query.number;

    if (!num) return res.status(400).json({ error: "Number required" });

    try {
        // Backticks (`) ka use dhyan se karein
        const apiUrl = `https://bronx-papa-27y2.onrender.com/api/custom/num?key=free&num=${num}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "API Unreachable" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
