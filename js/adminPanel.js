const API_URLS = {
  BASE: "https://fakestoreapi.com/",
  ALL_CATEGORIES: "https://fakestoreapi.com/products/categories",
  PRODUCTS_BY_CATEGORIES: "https://fakestoreapi.com/products/category/",
  GET_SINGLE_PRODUCT: "https://fakestoreapi.com/products/",
  GET_ALL_USERS: "https://fakestoreapi.com/users",
  GET_SINGLE_USER: "https://fakestoreapi.com/users/",
  GET_ALL_PRODUCTS: "https://fakestoreapi.com/products",
};

let userEmail;
let allTabs = [0, 0, 0];

const ENUM_KIND = {
  0: "Products",
  1: "Categories",
  2: "Users",
};

// Greet user
function greetUser() {
  userEmail = localStorage.getItem("email");
  document.getElementById("userHello").innerText =
    "Welcome, " + userEmail + "!";
  console.log(userEmail);
}

// GET ALL USERS
async function getAllUsers() {
  let data;
  const res = await fetch(API_URLS.GET_ALL_USERS);
  data = await res.json();
  addProductsToList(data, ENUM_KIND[2]);
}

// GET ALL CATEGORIES
async function getAllCategories() {
  let data;
  const res = await fetch(API_URLS.ALL_CATEGORIES);
  data = await res.json();
  addProductsToList(data, ENUM_KIND[1]);
}

// GET ALL PRODUCTS
async function getAllProducts() {
  let data;
  let cond = "title";
  const res = await fetch(API_URLS.GET_ALL_PRODUCTS);
  data = await res.json();
  addProductsToList(data, ENUM_KIND[0]);
}

function fillAllTabs() {
  for (let index = 0; index < allTabs.length; index++) {
    allTabs[index] = "cat_" + index;
  }
  addListenersToTabs();
}

function addListenersToTabs() {
  for (let index = 0; index < allTabs.length; index++) {
    console.log(allTabs[index]);
    let currentId = allTabs[index];
    document.getElementById(currentId).addEventListener("click", function () {
      dataController(currentId);
    });
  }
}

function changeSelectedLabel(id) {
  console.log(id);
  for (let index = 0; index < allTabs.length; index++) {
    //0
    if (id === allTabs[index]) {
      document.getElementById(allTabs[index]).classList.add("tabSelected");
    } else {
      document.getElementById(allTabs[index]).classList.remove("tabSelected");
    }
  }
}

function clearPanel() {
  let panel = document.getElementById("tableRows");
  panel.innerHTML = "";
}

function dataController(id) {
  switch (id) {
    case "cat_0":
      changeSelectedLabel(id);
      getAllProducts();
      break;
    case "cat_1":
      changeSelectedLabel(id);
      getAllCategories();
      break;
    case "cat_2":
      changeSelectedLabel(id);
      getAllUsers();
      break;
    default:
      break;
  }
}

// Adds the product images to the UI
function addProductsToList(data, kind) {
  let panel = document.getElementById("tableRows");
  const template = document.querySelector("#listItemTemplate").content;
  clearPanel();

  for (let index = 0; index < data.length; index++) {
    const clone = template.cloneNode(true);
    if (kind === "Products") {
      clone.querySelector("a").textContent = data[index].title;
    } else if (kind === "Categories") {
      clone.querySelector("a").textContent = data[index];
    } else if (kind === "Users") {
      clone.querySelector("a").textContent = data[index].email;
    }

    panel.appendChild(clone);
  }
}

getAllProducts();
greetUser();
fillAllTabs();
