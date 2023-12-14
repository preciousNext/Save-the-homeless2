var burgerIcon = document.querySelector(".burger");
var navLinks = document.querySelector("#navLinks");
var section = document.querySelector("section");
burgerIcon.addEventListener("click", function () {
  navLinks.classList.toggle("show");
  burgerIcon.classList.toggle("navbar-active");
  section.classList.toggle("active");
});
