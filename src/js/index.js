var activeSection;
var activeNav;

function toggleSection(e) {
  // Add an active class to the clicked nav item and display its relative content section
  var target = document.querySelector(this.dataset.target);
  if (target.style.display !== "block") target.style.display = "block";
  if (!this.classList.contains("active")) this.classList.add("active");

  // Hide the already active content section.
  if (this !== activeNav) {
    activeSection.style.display = "none";
    activeNav.classList.remove("active");
    activeSection = target;
    activeNav = this;
  }
}

function bindButtons() {
  // Initialize the global states used to track active section and nav link.
  activeSection= document.querySelector("#projects");
  activeNav = document.querySelector(".nav-link");

  document.querySelectorAll(".nav-link").forEach(function(el){
    el.addEventListener("click", toggleSection);
  });
}

// http://youmightnotneedjquery.com/#ready
if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
  bindButtons();
} else {
  document.addEventListener('DOMContentLoaded', bindButtons);
}
