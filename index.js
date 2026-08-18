const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/phone', async (req, res) => {
    const { num } = req.query;
    if (!num) return res.status(400).json({ error: "Number required" });

    try {
        const response = await fetch('https://bronx-papa-27y2.onrender.com/api/custom/num?key=free&num=9876543210');
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "API Unreachable" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
