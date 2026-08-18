const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/phone', async (req, res) => {
    const num = req.query.num || req.query.number;

    if (!num) return res.status(400).json({ error: "Number required" });

    try {
        const apiUrl = `https://bronx-papa-27y2.onrender.com/api/custom/num?key=free&num=${num}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        // 1. Unwanted fields (LIMIT, KEY OWNER, REMAINING, etc.) ko hata kar clean object banayein
        const cleanedData = {
            CREDIT: data.CREDIT,
            STATUS: data.STATUS,
            COUNT: data.COUNT,
            QUERY: data.QUERY,
            MOBILE: data.MOBILE,
            NAME: data.NAME,
            FATHERNAME: data.FNAME,
            ADDRESS: data.ADDRESS,
            ALT: data.ALT,
            CIRCLE: data.CIRCLE,
            ID: data.ID,
            EMAIL: data.EMAIL,
            "POWERED BY": "!5h44N" // Aapka custom credit name
        };

        // 2. Sirf filtered data frontend ko bhejें
        res.json(cleanedData);

    } catch (err) {
        res.status(500).json({ error: "API Unreachable" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
