const searchIcon = document.getElementById("search-icon")
const crossIcon = document.getElementById("cross-icon")
const searchBox = document.querySelector(".search-box")
const menuIcon = document.getElementById("menu-icon")
const menuCloseIcon = document.getElementById("menu-close-icon")
const navOptionsAfter = document.querySelector(".nav-options-after")

searchIcon.addEventListener("click", () => {
  searchIcon.style.display = "none"
  crossIcon.style.display = "flex"
  searchBox.style.display = "flex"
})
crossIcon.addEventListener("click", () => {
  searchIcon.style.display = "flex"
  crossIcon.style.display = "none"
  searchBox.style.display = "none"
})
menuIcon.addEventListener("click", () => {
  navOptionsAfter.style.display = "flex"
  menuIcon.style.display = "none"
  menuCloseIcon.style.display = "flex"
})
menuCloseIcon.addEventListener("click", () => {
  navOptionsAfter.style.display = "none"
  menuIcon.style.display = "flex"
  menuCloseIcon.style.display = "none"
})
