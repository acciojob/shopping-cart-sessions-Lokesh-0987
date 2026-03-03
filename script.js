// Product data
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

// Always return array
function getCart() {
  const cart = window.sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Always store full updated cart
function saveCart(cart) {
  window.sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render Products
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${product.name} - $${product.price}
      <button data-id="${product.id}">Add to Cart</button>
    `;

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

// FIXED addToCart
function addToCart(productId) {
  let cart = getCart(); // Always fetch latest

  const product = products.find(p => p.id === productId);

  if (product) {
    cart.push(product); // Append
    saveCart(cart);     // Save full array
    renderCart();
  }
}

// Clear Cart
function clearCart() {
  saveCart([]);   // Important: don't removeItem
  renderCart();
}

// Event Listeners
productList.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    const productId = parseInt(e.target.dataset.id);
    addToCart(productId);
  }
});

clearCartBtn.addEventListener("click", clearCart);

// Initial Load
renderProducts();
renderCart();