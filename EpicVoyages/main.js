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
  fetch("./json/banner.json")
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

//adventure idea -----------------------------------------------------------------------------
const adventureContainer = document.querySelector(".a-container")

const adventureIdea = async () => {
  try {
    const response = await fetch("./json/adventure.json")
    if (!response.ok) {
      throw new Error("Network is not responding correctly")
    }
    const ideas = await response.json()
    const adventureOptions = ideas.adventureIdeas
    adventureCard(adventureOptions)
  } catch (error) {
    console.error("Error fetching or parsing data:", error)
  }
}

adventureIdea()

function adventureCard(adventureOptions) {
  adventureContainer.innerHTML = ""
  for (let i = 0; i < 4; i++) {
    let option = adventureOptions[i]

    adventureContainer.innerHTML += `
    <div class="a-card">
      <div class="a-image">
        <img
          src="${option.image}"
          alt=" image"
        />
      </div>
      <div class="a-details">
        <div class="a-details-name">${option.name}</div>
        <div class="a-details-short">
         <p>
         ${option.details}
          </p>
        </div>
      </div>
    <button id='a-read-more' class='read-more'>Read More</button>
  </div>`
  }
}

// featured products js -------------------------------------------------------------------------
const container = document.querySelector(".f-container")

const featuredItems = async () => {
  try {
    const response = await fetch("./json/featuredProduct.json")
    if (!response.ok) {
      throw new Error("Network is not responding correctly")
    }
    const products = await response.json()
    const featuredProducts = products.featuredProducts
    showDataInCard(featuredProducts)
  } catch (error) {
    console.error("Error fetching or parsing data:", error)
  }
}

featuredItems()

// show data in card
function showDataInCard(featuredProducts) {
  container.innerHTML = ""
  for (let i = 0; i < 4; i++) {
    let product = featuredProducts[i]

    container.innerHTML += `
        <div class="f-card">
          <div class="f-card-image">
            <img src="${product.image}" alt="image" />
          </div>
          <div class="f-card-details">
            <p id="card-name">${product.name}</p>
            <p id="card-price">$${product.price}</p>
            <p id="card-rating">${product.rating}</p>
          </div>
          <div class="f-card-btns">
            <button type="submit" class="btn add-to-cart">
              <i class="fa-solid fa-cart-shopping"></i>
            </button>
            <button type="submit" class="btn watch-card">
              <i class="fa-solid fa-eye"></i>
            </button>
            <button type="submit" class="btn share-card">
              <i class="fa-solid fa-share"></i>
            </button>
          </div>
        </div>`
  }
}
