function generatePlan() {
    let subjects = document.getElementById("subjects").value.split(",");
    let hours = parseInt(document.getElementById("hours").value);
    let weak = document.getElementById("weak").value.split(",");

    let output = document.getElementById("output");
    output.innerHTML = "";

    if (!subjects || subjects.length === 0 || isNaN(hours)) {
        output.innerHTML = "<p>Please enter all details.</p>";
        return;
    }

    subjects = subjects.map(s => s.trim()).filter(s => s !== "");
    weak = weak.map(s => s.trim());

    let totalSubjects = subjects.length;
    let baseTime = hours / totalSubjects;

    let studyPlan = "<ul>";

    subjects.forEach(sub => {
        let time = baseTime;

        if (weak.includes(sub)) {
            time += 1; // extra 1 hour for weak subjects
        }

        studyPlan += `<li><strong>${sub}:</strong> ${time.toFixed(1)} hours</li>`;
    });

    studyPlan += "</ul>";

    output.innerHTML = studyPlan;
}
