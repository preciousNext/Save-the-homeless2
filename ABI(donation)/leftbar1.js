document.getElementById("toggleButton").addEventListener("click", function () {
  var toggleButton = document.getElementById("toggleButton");
  var bodyElement = document.querySelector("body");
  if (bodyElement.classList.contains("night-mode")) {
    bodyElement.classList.remove("night-mode");
    toggleButton.innerHTML = '<i id = "sn" class = "fas fa-sun"><i/>';
  } else {
    bodyElement.classList.add("night-mode");
    toggleButton.innerHTML = '<i id = "mn" class = "fas fa-moon"><i/>';
  }
});
// static//
document.getElementById("content1").classList.add("const");
function showContent(contentId) {
  var contents = document.querySelectorAll(".content");
  contents.forEach(function (content) {
    content.classList.remove("const");

    var selectedContent = document.getElementById(contentId);
    selectedContent.classList.add("const");
  });
}

var burgerIcon = document.querySelector(".burger");
var navLinks = document.querySelector("#navLinks");
var section = document.querySelector("section");
burgerIcon.addEventListener("click", function () {
  navLinks.classList.toggle("show");
  burgerIcon.classList.toggle("navbar-active");
  section.classList.toggle("active");
});
