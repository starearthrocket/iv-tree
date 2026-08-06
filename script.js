const reportButton = document.getElementById("reportButton");
const reportForm = document.getElementById("reportForm");
const locationInput = document.getElementById("location");
const descriptionInput = document.getElementById("description");
const reportsList = document.getElementById("reportsList");
const emptyMessage = document.getElementById("emptyMessage");

const reports = [];

reportButton.addEventListener("click", function () {
    reportForm.classList.toggle("hidden");
});

reportForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const location = locationInput.value.trim();
    const description = descriptionInput.value.trim();

    if (location === "" || description === "") {
        alert("Please complete every field.");
        return;
    }

    const newReport = {
        location: location,
        description: description
    };

    reports.push(newReport);
    displayReports();

    reportForm.reset();
    reportForm.classList.add("hidden");
});

function displayReports() {
    reportsList.innerHTML = "";

    if (reports.length === 0) {
        emptyMessage.classList.remove("hidden");
        return;
    }

    emptyMessage.classList.add("hidden");

    reports.forEach(function (report) {
        const reportCard = document.createElement("div");
        reportCard.classList.add("report-card");

        reportCard.innerHTML = `
            <h3>${report.location}</h3>
            <p>${report.description}</p>
        `;

        reportsList.appendChild(reportCard);
    });
}