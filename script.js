/* jshint esversion: 6 */

/* DOM element references */
const reportButton = document.getElementById("reportButton");
const reportForm = document.getElementById("reportForm");
const locationInput = document.getElementById("location");
const descriptionInput = document.getElementById("description");
const reportsList = document.getElementById("reportsList");
const emptyMessage = document.getElementById("emptyMessage");
const reportCount = document.getElementById("reportCount");
const searchInput = document.getElementById("searchInput");
const clearReportsButton = document.getElementById("clearReportsButton");
const mapContainer = document.getElementById("mapContainer");
const contactForm = document.querySelector(".contact-form");

/* Load any previously saved reports from localStorage */
const reports = JSON.parse(localStorage.getItem("reports")) || [];


/* Toggle the tree report form when the Report a Tree button is clicked */
reportButton.addEventListener("click", function () {
    reportForm.classList.toggle("hidden");
});


/* Validate and save a new tree report */
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
        date: new Date().toLocaleString(),
        mapTop: 20 + Math.random() * 60,
        mapLeft: 20 + Math.random() * 60
    };

    reports.push(newReport);

    localStorage.setItem("reports", JSON.stringify(reports));

    displayReports();
    displayMapPins();

    reportForm.reset();
    reportForm.classList.add("hidden");
});


/* Display saved reports and apply the current search filter */
function displayReports() {
    reportsList.innerHTML = "";

    clearReportsButton.classList.toggle(
        "hidden",
        reports.length === 0
    );

    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredReports = reports
        .filter(function (report) {
            return report.location.toLowerCase().includes(searchTerm);
        })
        .reverse();

    if (filteredReports.length === 1) {
        reportCount.textContent = "1 report";
    } else {
        reportCount.textContent = `${filteredReports.length} reports`;
    }

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

        /* Delete the selected report and refresh the report/map views */
        deleteButton.addEventListener("click", function () {
            reports.splice(index, 1);

            localStorage.setItem(
                "reports",
                JSON.stringify(reports)
            );

            displayReports();
            displayMapPins();
        });
    });
}


/* Delete every saved report after user confirmation */
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
    displayMapPins();
});


/* Refresh displayed reports whenever the search value changes */
searchInput.addEventListener("input", displayReports);


/* Rebuild map markers so they stay synchronised with saved reports */
function displayMapPins() {
    const oldPins = mapContainer.querySelectorAll(".map-pin");

    oldPins.forEach(function (pin) {
        pin.remove();
    });

    reports.forEach(function (report) {
        const pin = document.createElement("img");

        pin.title = report.location;
        pin.src = "assets/icons/map-icon-new.png";
        pin.classList.add("map-pin");
        pin.alt = `Reported ivy-covered tree at ${report.location}`;

        pin.style.top = `${report.mapTop}%`;
        pin.style.left = `${report.mapLeft}%`;

        mapContainer.appendChild(pin);
    });
}


/* Display saved reports and map markers when the page first loads */
displayReports();
displayMapPins();


/* Provide confirmation feedback when the contact form is submitted */
contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    alert("Thank you! Your message has been sent.");

    contactForm.reset();
});