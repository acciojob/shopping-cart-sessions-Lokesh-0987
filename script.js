// Product Data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");


// SAFE getCart with exception handling
function getCart() {
  try {
    const data = window.sessionStorage.getItem("cart");
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    // If corrupted or invalid JSON
    window.sessionStorage.setItem("cart", JSON.stringify([]));
    return [];
  }
}


// SAFE saveCart
function saveCart(cart) {
  try {
    window.sessionStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Session storage error:", error);
  }
}


// Render Products
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");

    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.dataset.id = product.id;

    li.append(`${product.name} - $${product.price} `);
    li.appendChild(button);

    productList.appendChild(li);
  });
}


// Render Cart
function renderCart() {
  cartList.innerHTML = "";

  const cart = getCart();

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}


// Add to Cart (CRITICAL FIX)
function addToCart(productId) {
  let cart = getCart();

  const product = products.find((p) => p.id === productId);

  if (product) {
    cart = [...cart, {
      id: product.id,
      name: product.name,
      price: product.price
    }];

    saveCart(cart);
    renderCart();
  }
}


// Clear Cart
function clearCart() {
  saveCart([]);
  renderCart();
}


// Event Listeners
productList.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    const id = parseInt(e.target.dataset.id);
    addToCart(id);
  }
});

clearCartBtn.addEventListener("click", clearCart);


// DO NOT RESET STORAGE HERE
renderProducts();
renderCart();