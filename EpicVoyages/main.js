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

//  popular packages
const mainContainer = document.querySelector(".packages-container")

const fetchData = async () => {
  try {
    const packages = await fetch("./json/popularPackages.json")
    if (!packages) {
      throw new Error("Somthing error occured")
    }
    const allPackages = await packages.json()
    const popularPackages = allPackages.trekkingPackages
    mainContainer.innerHTML = ""
    for (let i = 0; i < popularPackages.length; i++) {
      let packageData = popularPackages[i]
      mainContainer.innerHTML += `
        <div class="package-card">
          <div class="p-image-div">
            <img src="${packageData.image}" alt="" />
          </div>
          <div class="p-extra">
            <div class="p-name">${packageData.name}</div>
            <div class="p-short-details">${packageData.description}</div>
            <div class="p-price">${packageData.price}</div>
            </div>
            <button id="explore" class='read-more'>Explore Now</button>
        </div>
        `
    }
  } catch (error) {
    console.log(error)
  }
}
fetchData()

// clientReview-----------------------------------------------------------------------------------
const displayReviews = async () => {
  const reviews = await fetch("./json/reviews.json")
  const allReviews = await reviews.json()
  const clientReviews = allReviews.clientReviews
  const swiperWrapper = document.querySelector(".reviews-wrapper")
  swiperWrapper.innerHTML = ""

  for (let i = 0; i < clientReviews.length; i++) {
    const review = clientReviews[i]
    const backgroundColor = i % 2 === 0 ? "#ADC4CE" : "#C4DFDF"

    swiperWrapper.innerHTML += `
        <div class="review-slide"> 
          <div class="cr-card">
            <div class="cr-review" style="background-color: ${backgroundColor};">
              <p>${review.comment}</p>
            </div>
            <div class="cr-details">
              <div class="cr-userImage">
                <img src="${review.image}" alt="cat" />
              </div>
              <div class="cr-userDetails">
                <h2>${review.name}</h2>
                <h3>${review.job}</h3>
              </div>
            </div>
            <div class="arrow-div" style="background-color: ${backgroundColor}"></div>
          </div>
        </div>
      `
  }

  // Initialize Swiper after adding all review cards
  const swiper = new Swiper(".reviews-swiper", {
    slidesPerView: 3,
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
  })
}
// Call displayReviews to load reviews and initialize Swiper
displayReviews()

// ouroffers--------------------------------------------------------------------------------------
const offerContainer = document.querySelector(".offers-container")

const fetchOffers = async () => {
  try {
    const offers = await fetch("./json/offers.json")
    if (!offers) {
      throw new Error("Somthing error occured")
    }
    const allOffers = await offers.json()
    const getAllOffers = allOffers.offers
    console.log(getAllOffers)
    offerContainer.innerHTML = ""
    for (let i = 0; i < getAllOffers.length; i++) {
      let offerData = getAllOffers[i]
      offerContainer.innerHTML += `
        <div class="of-card">
          <div class="of-image-div">
            <img src="${offerData.icon}" alt="" />
          </div>
          <div class="of-extra">
            <div class="of-name">${offerData.name}</div>
            <div class="of-short-details">${offerData.details}</div>
            </div>
            <button id="offersBtn" class='read-more'>Read More</button>
        </div>
        `
    }
  } catch (error) {
    console.log(error)
  }
}

fetchOffers()

// blogs ------------------------------------------------------------------------------------
const blogContainer = document.querySelector(".blogs-cards-container")

const getAllBlogs = async () => {
  const allBlogs = await fetch("./json/blogs.json")
  const getBlogs = await allBlogs.json()
  const displayBlogs = getBlogs.blogs
  showBlogs(displayBlogs)
}
getAllBlogs()

function showBlogs(displayBlogs) {
  blogContainer.innerHTML = ""
  for (let i = 0; i < 3; i++) {
    const blog = displayBlogs[i]
    blogContainer.innerHTML += `
        <div class="blog-card">
          <div class="image-box">
            <img
              src="${blog.image}"
              alt="image"
            />
          </div>
          <div class="date-posted">
            <div class="date">
              <i class="fa-solid fa-calendar-days"></i>
              ${blog.date}
            </div>
            <div class="postedby">
              <i class="fa-solid fa-user"></i>
              ${blog.writer}
            </div>
          </div>
          <div class="extra-details">
            <div class="blog-name">${blog.title}</div>
            <div class="blog-blogs">
            ${blog.highlight}
            </div>
            <button class="read-more">Read More</button>
          </div>
        </div>
        `
  }
}

//------------------------------------ patnercompanies -----------------------------------------------
const swiperr = new Swiper(".companies-container", {
  slidesPerView: 4,
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
})
