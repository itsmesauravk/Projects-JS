const searchIcon = document.getElementById("search-icon")
const crossIcon = document.getElementById("cross-icon")
const searchBox = document.querySelector(".search-box")
const menuIcon = document.getElementById("menu-icon")
const menuCloseIcon = document.getElementById("menu-close-icon")
const navOptionsAfter = document.querySelector(".nav-options-after")
const header = document.getElementById("header")

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

// this will change the background of the navbar when scrolled
function updateNavbarBackground() {
  if (window.scrollY > 600) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
}
window.addEventListener("scroll", updateNavbarBackground)

// for swiperJS
const swiperWrapper = document.querySelector(".swiper-wrapper")
const swiperSlide = document.querySelector(".swiper-slide")

const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
})

const gettingData = () => {
  fetch("./banner.json")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      data.banners.forEach(item => {
        const slide = document.createElement("div")
        slide.classList.add("swiper-slide")
        slide.style.backgroundImage = `url('${item.image}')`

        swiperWrapper.appendChild(slide)
        slide.innerHTML = `
        <div id='data-container'>
          <div id='heading'>${item.details.heading}</div>
          <div id='subheading'>${item.details.subheading} </div> 
          <button id='banner-btn'>Get Started </button>
        </div>
        `
      })
      swiper.update()
    })
}

gettingData()
