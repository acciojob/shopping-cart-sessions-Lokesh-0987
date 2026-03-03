// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM Elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Get cart from sessionStorage
function getCart() {
  const storedCart = window.sessionStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
}

// Save cart to sessionStorage
function saveCart(cart) {
  window.sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render Products
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = `${product.name} - $${product.price}`;

    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.classList.add("add-to-cart-btn");
    button.dataset.id = product.id;

    li.appendChild(span);
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

// Add to Cart
function addToCart(productId) {
  const cart = getCart();

  const product = products.find((p) => p.id === productId);

  if (product) {
    cart.push(product);
    saveCart(cart);
    renderCart();
  }
}

// Clear Cart
function clearCart() {
  saveCart([]); // Important for test case (do NOT remove item)
  renderCart();
}

// Event Listeners
productList.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(e.target.dataset.id);
    addToCart(productId);
  }
});

clearCartBtn.addEventListener("click", clearCart);

// Initial Render
renderProducts();
renderCart();