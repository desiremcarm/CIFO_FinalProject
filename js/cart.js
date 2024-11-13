const API_URLS = {
  BASE: "https://fakestoreapi.com/",
  ALL_CATEGORIES: "https://fakestoreapi.com/products/categories",
  PRODUCTS_BY_CATEGORIES: "https://fakestoreapi.com/products/category/",
  GET_SINGLE_PRODUCT: "https://fakestoreapi.com/products/",
  GET_ALL_USERS: "https://fakestoreapi.com/users",
  GET_CART_FROM_USER: "https://fakestoreapi.com/carts/5",
};

let prod = [];

// Get cart
async function getSingleUserCart() {
  let data;
  const res = await fetch(API_URLS.GET_CART_FROM_USER);
  data = await res.json();
  console.log(data);
}

async function getSingleProductFromID(id) {
  let data;
  const res = await fetch(API_URLS.GET_SINGLE_PRODUCT);
  data = await res.json();
  console.log(data);
}

getSingleUserCart();
