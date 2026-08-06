const reportButton = document.getElementById("reportButton");
const reportForm = document.getElementById("reportForm");
const locationInput = document.getElementById("location");
const descriptionInput = document.getElementById("description");

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

    alert("Thank you! Your report has been submitted.");

    reportForm.reset();
    reportForm.classList.add("hidden");
});