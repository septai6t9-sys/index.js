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
        const rawData = await response.json();

        // Safe extraction: Keys chaye kisi bhi format me ho, hum unki values nikal rahe hain
        const getVal = (key) => rawData[key] || rawData[key.toLowerCase()] || rawData[key.toUpperCase()] || "N/A";

        // Sirf wahi fields bhejenge jo screen par dikhani hai
        const finalData = {
            "CREDIT": getVal("CREDIT"),
            "STATUS": getVal("STATUS"),
            "COUNT": getVal("COUNT"),
            "QUERY": getVal("QUERY"),
            "MOBILE": getVal("MOBILE"),
            "NAME": getVal("NAME"),
            "FNAME": getVal("FNAME"),
            "ADDRESS": getVal("ADDRESS"),
            "ALT": getVal("ALT"),
            "CIRCLE": getVal("CIRCLE"),
            "ID": getVal("ID"),
            "EMAIL": getVal("EMAIL"),
            "POWERED BY": "!5h44N" // Custom branding
        };

        res.json(finalData);

    } catch (err) {
        res.status(500).json({ error: "API Unreachable" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
