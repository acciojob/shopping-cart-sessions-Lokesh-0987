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

// ALWAYS safely get cart
function getCart() {
  const data = window.sessionStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
}

// ALWAYS safely save cart
function saveCart(cart) {
  window.sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render Products
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");

    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.setAttribute("data-id", product.id);

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

// Add To Cart (CRITICAL FIX)
function addToCart(productId) {
  const cart = getCart(); // always read latest

  const product = products.find(p => p.id === productId);

  if (product) {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price
    }); // push clean object (important for deep equality)

    saveCart(cart);
    renderCart();
  }
}

// Clear Cart
function clearCart() {
  window.sessionStorage.setItem("cart", JSON.stringify([]));
  renderCart();
}

// Event Listeners
productList.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    const id = parseInt(e.target.getAttribute("data-id"));
    addToCart(id);
  }
});

clearCartBtn.addEventListener("click", clearCart);

// Initial Render (DO NOT TOUCH STORAGE HERE)
renderProducts();
renderCart();