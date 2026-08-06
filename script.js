const reportButton = document.getElementById("reportButton");
const reportForm = document.getElementById("reportForm");
const locationInput = document.getElementById("location");
const descriptionInput = document.getElementById("description");
const reportsList = document.getElementById("reportsList");
const emptyMessage = document.getElementById("emptyMessage");

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
        description: description
    };

    reports.push(newReport);

    localStorage.setItem("reports", JSON.stringify(reports));

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

    reports.forEach(function (report, index) {
        const reportCard = document.createElement("div");
        reportCard.classList.add("report-card");

       reportCard.innerHTML = `
    <h3>${report.location}</h3>
    <p>${report.description}</p>

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
displayReports();
