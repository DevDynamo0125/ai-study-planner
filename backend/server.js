const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("AI Study Planner Backend is Running");
});

// Generate Study Plan API
app.post("/generate-plan", (req, res) => {
    const { subjects, hours, weakSubjects } = req.body;

    if (!subjects || !hours) {
        return res.status(400).json({ error: "Invalid input" });
    }

    const baseTime = hours / subjects.length;
    let plan = [];

    subjects.forEach(subject => {
        let time = baseTime;

        if (weakSubjects.includes(subject)) {
            time += 1; // extra focus for weak subjects
        }

        plan.push({
            subject: subject,
            hours: time.toFixed(1)
        });
    });

    res.json({
        success: true,
        studyPlan: plan
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
