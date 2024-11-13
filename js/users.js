const API_URLS = {
  BASE: "https://fakestoreapi.com/",
  ALL_CATEGORIES: "https://fakestoreapi.com/products/categories",
  PRODUCTS_BY_CATEGORIES: "https://fakestoreapi.com/products/category/",
  GET_SINGLE_PRODUCT: "https://fakestoreapi.com/products/",
  GET_ALL_USERS: "https://fakestoreapi.com/users",
  GET_SINGLE_USER: "https://fakestoreapi.com/users/",
};

const KATE_ID = 9;
let kateUser = ["user", "passw"];

// GET ALL USERS
async function getAllUsers() {
  let data;
  const res = await fetch(API_URLS.GET_ALL_USERS);
  data = await res.json();
}

function fillLoginForm() {
  document.getElementById("userEmail").value = kateUser[0];
  document.getElementById("userPassw").value = kateUser[1];
}

async function getUserAcc() {
  let data;
  const res = await fetch(API_URLS.GET_SINGLE_USER + KATE_ID);
  data = await res.json();
  kateUser[0] = data.email;
  kateUser[1] = data.password;
  console.log(kateUser);
  localStorage.setItem("email", kateUser[0]);
  localStorage.setItem("password", kateUser[1]);
  fillLoginForm();
}

getUserAcc();
