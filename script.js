const reportButton = document.getElementById("reportButton");
const reportForm = document.getElementById("reportForm");

reportForm.classList.add("hidden");

reportButton.addEventListener("click", function () {
    reportForm.classList.toggle("hidden");
});