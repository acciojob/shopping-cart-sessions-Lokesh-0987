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

// Get cart safely
function getCart() {
  const stored = window.sessionStorage.getItem("cart");
  return stored ? JSON.parse(stored) : [];
}

// Save cart safely
function saveCart(cart) {
  window.sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render products
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");

    const btn = document.createElement("button");
    btn.textContent = "Add to Cart";
    btn.className = "add-to-cart-btn";
    btn.dataset.id = product.id;

    li.append(`${product.name} - $${product.price}`);
    li.appendChild(btn);

    productList.appendChild(li);
  });
}

// Render cart
function renderCart() {
  cartList.innerHTML = "";

  const cart = getCart();

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add to cart
function addToCart(productId) {
  const cart = getCart();

  const product = products.find((p) => p.id === productId);

  if (product) {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
    });

    saveCart(cart);
    renderCart();
  }
}

// Clear cart
function clearCart() {
  saveCart([]); // Important: do NOT removeItem
  renderCart();
}

// Event delegation
productList.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const id = parseInt(e.target.dataset.id);
    addToCart(id);
  }
});

clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();