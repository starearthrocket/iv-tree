const reportButton = document.getElementById("reportButton");
const reportForm = document.getElementById("reportForm");
const locationInput = document.getElementById("location");
const descriptionInput = document.getElementById("description");
const reportsList = document.getElementById("reportsList");
const emptyMessage = document.getElementById("emptyMessage");
const reportCount = document.getElementById("reportCount");
const searchInput = document.getElementById("searchInput");
const clearReportsButton = document.getElementById("clearReportsButton");

const reports = JSON.parse(localStorage.getItem("reports")) || [];

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
    description: description,
    date: new Date().toLocaleString()
};

    reports.push(newReport);

    localStorage.setItem("reports", JSON.stringify(reports));

    displayReports();

    reportForm.reset();
    reportForm.classList.add("hidden");
});

function displayReports() {
    reportsList.innerHTML = "";

    const searchTerm = searchInput.value.trim().toLowerCase();

   const filteredReports = reports
    .filter(function (report) {
        return report.location.toLowerCase().includes(searchTerm);
    })
    .reverse();
 reportCount.textContent =
    filteredReports.length === 1
        ? "1 report"
        : `${filteredReports.length} reports`;

    if (filteredReports.length === 0) {
        emptyMessage.classList.remove("hidden");
        return;
    }

    emptyMessage.classList.add("hidden");

    filteredReports.forEach(function (report) {
    const index = reports.indexOf(report);
        const reportCard = document.createElement("div");
        reportCard.classList.add("report-card");

reportCard.innerHTML = `
    <h3>${report.location}</h3>

    <p>${report.description}</p>

    <p class="reportDate">
        Reported: ${report.date}
    </p>

    <button class="deleteButton">
        Delete
    </button>
`;

             reportsList.appendChild(reportCard);
             const deleteButton = reportCard.querySelector(".deleteButton");

deleteButton.addEventListener("click", function () {

    reports.splice(index, 1);

    localStorage.setItem(
        "reports",
        JSON.stringify(reports)
    );

    displayReports();

});
    });

}


clearReportsButton.addEventListener("click", function () {

    const confirmed = confirm("Delete all reports?");

    if (!confirmed) {
        return;
    }

    reports.length = 0;

    localStorage.setItem(
        "reports",
        JSON.stringify(reports)
    );

    displayReports();

});

searchInput.addEventListener("input", displayReports);

displayReports();
