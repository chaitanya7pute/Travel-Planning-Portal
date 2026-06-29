import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let itineraries = [
    {
        id: 1,
        destination: "Goa, India",
        duration: "4 Days",
        budget: 15000,
        activities: "Scuba Diving, Beach Party, Fort Aguada Tour"
    },
    {
        id: 2,
        destination: "Manali, India",
        duration: "5 Days",
        budget: 22000,
        activities: "Solang Valley Skiing, Paragliding, Old Manali Cafes"
    }
];

app.get('/', (req, res) => {
    res.json({ success: true, message: "Travel Service portal backend active." });
});

app.get('/api/trips', (req, res) => {
    res.status(200).json({ success: true, data: itineraries });
});

app.post('/api/trips', (req, res) => {
    const { destination, duration, budget, activities } = req.body;

    if (!destination || !duration || !budget) {
        return res.status(400).json({ success: false, message: "Missing required properties." });
    }

    const newTrip = {
        id: itineraries.length + 1,
        destination,
        duration,
        budget: Number(budget),
        activities: activities || "Leisure Exploring"
    };

    itineraries.push(newTrip);
    res.status(201).json({ success: true, data: newTrip });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Travel System active on port ${PORT}`));