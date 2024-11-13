let dropdownCategories = [];
let dropdownIDs = [];

const API_URLS = {
  BASE: "https://fakestoreapi.com/",
  ALL_CATEGORIES: "https://fakestoreapi.com/products/categories",
  PRODUCTS_BY_CATEGORIES: "https://fakestoreapi.com/products/category/",
  GET_SINGLE_PRODUCT: "https://fakestoreapi.com/products/",
};

// GET ALL CATEGORIES
async function getAllCategories() {
  let data;
  const res = await fetch(API_URLS.ALL_CATEGORIES);
  data = await res.json();
  getDropdownCategories(data);
}

// GET PRODUCT BY CATEGORY
async function getProductsPerCategory(id) {
  let categoryItem = dropdownIDs.indexOf(id);
  let correctId = dropdownCategories[categoryItem];
  let data;
  const res = await fetch(API_URLS.PRODUCTS_BY_CATEGORIES + correctId);
  data = await res.json();
  console.log(data);
  addProdImagesToUI(data); // Create images and append them to the UI
}

// GET PRODUCT DETAILS BY ID
async function retrieveItemDetails(itemId) {
  let data;
  const res = await fetch(API_URLS.GET_SINGLE_PRODUCT + itemId);
  data = await res.json();
  console.log(data);
  fillProductDetailModal(data);
}

// ******** UI RELATED **********

// Close modal from X or from keyboard
function closeModalFromExternal() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProductDetailModal();
    }
  });
}

// Close modal
function closeProductDetailModal() {
  document.querySelector(".modal").classList.remove("is-active");
  document.querySelector("#modalHolder").innerHTML = "";
}

function fillProductDetailModal(data) {
  let template = document.querySelector("#productDetails").content;
  let modalTarget = document.getElementById("modalHolder");
  const clone = template.cloneNode(true);

  clone.querySelector("#productName").textContent = data.title;
  clone.querySelector("#productDesc").textContent = data.description;
  clone.querySelector("#productPrice").textContent = data.price + "$";
  clone.querySelector("img").src = data.image;
  clone.querySelector("#productCategory").textContent =
    "Category: " + data.category;
  clone.querySelector("#productRating").textContent = "⭐" + data.rating.rate;

  clone
    .querySelector(".modal-close")
    .addEventListener("click", closeProductDetailModal);
  clone
    .querySelector(".modal-background")
    .addEventListener("click", closeProductDetailModal);

  modalTarget.appendChild(clone);

  // Open modal once is filled
  openProductDetailModal();
}

// Open modal
function openProductDetailModal() {
  document.querySelector(".modal").classList.add("is-active");
}

// Clear UI Image products before adding the new ones
function clearUIImages() {
  let cardContainer = document.getElementById("imgHolder");
  cardContainer.innerHTML = "";
}

// Creates an IMG html node
function createImages() {
  let img = document.createElement("img");
  return img;
}

// Adds the product images to the UI
function addProdImagesToUI(data) {
  clearUIImages();
  let imgHolder = document.getElementById("imgHolder");
  const template = document.querySelector("#cardsTemplate").content;

  for (let index = 0; index < data.length; index++) {
    const clone = template.cloneNode(true);
    let itemId = data[index].id;
    clone.querySelector("img").src = data[index].image;
    clone.querySelector("img").classList.add("new-card");
    clone.querySelector(".content #Title").textContent = data[index].title;
    clone.querySelector(".content #Price").textContent =
      data[index].price + "$";
    clone.querySelector(".content #Rating").textContent =
      "⭐" +
      data[index].rating.rate +
      " from " +
      data[index].rating.count +
      " reviews";
    clone.querySelector("button").addEventListener("click", function () {
      retrieveItemDetails(itemId);
    });

    imgHolder.appendChild(clone);
  }
}

// Create the ID array for each dropdown category
function createDropdownCategories() {
  for (let index = 0; index < dropdownCategories.length; index++) {
    dropdownIDs.push("Category" + index);
  }
  fillDropdownCategories(dropdownCategories);
}

// Create <a> with their own config and append them to dropdown
function fillDropdownCategories(categories) {
  let holder = document.getElementById("dropdown-holder");
  for (let index = 0; index < categories.length; index++) {
    let a = document.createElement("a");
    a.innerText =
      categories[index].charAt(0).toUpperCase() + categories[index].slice(1);
    a.classList.add("navbar-item");
    a.setAttribute("id", dropdownIDs[index]);
    holder.appendChild(a);
  }
  setUIListeners(); // Add listeners
}

// Saves all categories in local array
function getDropdownCategories(data) {
  for (let index = 0; index < data.length; index++) {
    dropdownCategories.push(data[index]);
  }
  createDropdownCategories();
}

// Handles the click on the menu options for Home and Categories
function clickUIController(id) {
  paintUnpaintSelected(id);
  getProductsPerCategory(id);
}

// Paints or unpaints the category selection on the UI menu
function paintUnpaintSelected(id) {
  for (let index = 0; index < dropdownIDs.length; index++) {
    if (id === dropdownIDs[index]) {
      document.getElementById(dropdownIDs[index]).classList.add("is-selected");
    } else {
      document
        .getElementById(dropdownIDs[index])
        .classList.remove("is-selected");
    }
  }
}

// Adds listener to home button
function addListenerToHomeButton() {
  document.getElementById("home-btn").addEventListener("click", function () {
    clickUIController(this.id);
  });
}

// Adds listeners to all categories in the dropdown
function addListenersToCategories() {
  for (let index = 0; index < dropdownIDs.length; index++) {
    let currentId = dropdownIDs[index];
    document.getElementById(currentId).addEventListener("click", function () {
      clickUIController(currentId);
    });
  }
}

function setUIListeners() {
  addListenersToCategories();
  addListenerToHomeButton();
}

/**
 *
 * CALL ALL NEEDED FUNCTIONS
 *
 */

getAllCategories(); // To ask for the categories and initialize UI menu behavior
closeModalFromExternal();
