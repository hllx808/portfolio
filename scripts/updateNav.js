document.addEventListener("DOMContentLoaded", function() {
  let currentPage = window.location.pathname.split("/").pop();
  if (!currentPage) currentPage = "index.html"; // Default page

  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
});
