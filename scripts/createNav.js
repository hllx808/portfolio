document.addEventListener("DOMContentLoaded", function() {
  fetch("../components/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-container").innerHTML = data;

      // Call function to highlight active link after navbar is loaded
      highlightActiveNav();
    })
    .catch((error) => console.error("Error loading navbar:", error));
});

function highlightActiveNav() {
  let currentPage = window.location.pathname.split("/").pop();
  if (!currentPage) currentPage = "index.html"; // Default to home page

  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}
