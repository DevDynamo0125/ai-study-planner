async function generatePlan() {
    const subjects = document.getElementById("subjects").value
        .split(",")
        .map(s => s.trim())
        .filter(s => s !== "");

    const hours = parseInt(document.getElementById("hours").value);

    const weakSubjects = document.getElementById("weak").value
        .split(",")
        .map(s => s.trim())
        .filter(s => s !== "");

    const output = document.getElementById("output");
    output.innerHTML = "";

    if (subjects.length === 0 || isNaN(hours)) {
        output.innerHTML = "<p>Please enter all details.</p>";
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/generate-plan", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                subjects: subjects,
                hours: hours,
                weakSubjects: weakSubjects
            })
        });

        const data = await response.json();

        let studyPlanHTML = "<ul>";

        data.studyPlan.forEach(item => {
            studyPlanHTML += `<li><strong>${item.subject}:</strong> ${item.hours} hours</li>`;
        });

        studyPlanHTML += "</ul>";

        output.innerHTML = studyPlanHTML;

    } catch (error) {
        output.innerHTML = "<p>Server error. Please try again.</p>";
        console.error(error);
    }
}
