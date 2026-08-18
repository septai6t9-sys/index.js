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

        // Safe cleanup: Jo keys nahi chahiye bas unko delete kar rahe hain
        delete data.LIMIT;
        delete data.limit;
        delete data["KEY OWNER"];
        delete data.key_owner;
        delete data.REMAINING;
        delete data.remaining;
        delete data.DAILYREMAINING;
        delete data.dailyremaining;
        delete data.USED;
        delete data.used;
        delete data.PERSECONDLIMIT;
        delete data.persecondlimit;
        delete data.CREATED;
        delete data.created;
        delete data.EXPIRY;
        delete data.expiry;

        // Custom branding update
        if (data["POWERED BY"]) data["POWERED BY"] = "!5h44N";
        if (data.powered_by) data.powered_by = "!5h44N";

        res.json(data);

    } catch (err) {
        res.status(500).json({ error: "API Unreachable" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
