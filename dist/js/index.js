var activeSection;
var activeNav;

function toggleSection(e) {
  var target = document.querySelector(this.dataset.target);
  if (target.style.display !== "block") target.style.display = "block";
  if (!this.classList.contains("active")) this.classList.add("active");

  if (this !== activeNav) {
    activeSection.style.display = "none";
    activeNav.classList.remove("active");
    activeSection = target;
    activeNav = this;
  }
}

function bindButtons() {
  activeSection= document.querySelector("#projects");
  activeNav = document.querySelector(".nav-link");
  document.querySelectorAll(".nav-link").forEach(function(el){
    el.addEventListener("click", toggleSection);
  });
}

if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
  bindButtons();
} else {
  document.addEventListener('DOMContentLoaded', bindButtons);
}
