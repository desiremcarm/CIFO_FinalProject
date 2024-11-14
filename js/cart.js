const API_URLS = {
  BASE: "https://fakestoreapi.com/",
  ALL_CATEGORIES: "https://fakestoreapi.com/products/categories",
  PRODUCTS_BY_CATEGORIES: "https://fakestoreapi.com/products/category/",
  GET_SINGLE_PRODUCT: "https://fakestoreapi.com/products/",
  GET_ALL_USERS: "https://fakestoreapi.com/users",
  GET_CART_FROM_USER: "https://fakestoreapi.com/carts/2",
};

let prodId = [];
let prodQuantity = [];
let totalPrice = 0;

// Get cart
async function getSingleUserCart() {
  let data;
  const res = await fetch(API_URLS.GET_CART_FROM_USER);
  data = await res.json();
  let dataCollection = [];
  dataCollection.push(data);
  getProductData(dataCollection);
}

function getProductData(data) {
  for (let index = 0; index < data[0].products.length; index++) {
    prodId.push(data[0].products[index].productId);
    prodQuantity.push(data[0].products[index].quantity);
  }
  getSingleProductFromID();
}

async function getSingleProductFromID() {
  for (let index = 0; index < prodId.length; index++) {
    let data;
    const res = await fetch(API_URLS.GET_SINGLE_PRODUCT + prodId[index]);
    data = await res.json();
    createCart(data);
  }
}

function getTotalPrice(price, quantity) {
  console.log(price);
  let pricexQuantity = price * quantity;
  totalPrice += pricexQuantity;
}

function createCart(data) {
  let dataCollection = [];
  dataCollection.push(data);

  let cartHolder = document.getElementById("cartHolder");
  const template = document.querySelector("#cartTemplate").content;

  for (let index = 0; index < dataCollection.length; index++) {
    const clone = template.cloneNode(true);
    clone.querySelector("#productName").textContent = dataCollection[0].title;
    clone.querySelector("#productPrice").textContent =
      dataCollection[0].price + "$";
    clone.querySelector("#productQuantity").textContent =
      "Quantity: " + prodQuantity[index];
    clone.querySelector("img").src = dataCollection[0].image;

    getTotalPrice(dataCollection[0].price, prodQuantity[index]);

    cartHolder.appendChild(clone);
  }

  console.log(totalPrice);
  document.querySelector("#totalPrice").textContent =
    "Total price: " + totalPrice + "$";
}

function emptyCart() {
  let cartHolder = document.getElementById("cartHolder");
  cartHolder.innerHTML = "";
  totalPrice = 0;
  let cartMsg = document.getElementById("cartEmpty");
  document.querySelector("#totalPrice").textContent =
    "Total price: " + totalPrice + "$";
  cartMsg.textContent = "Your cart is empty";
}

window.onload = function () {
  getSingleUserCart();
  document.querySelector("#buyBtn").addEventListener("click", emptyCart);
};
