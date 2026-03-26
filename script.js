// Food data – Biryani, Pizza, Extra only (no salad)
const foodData = [
  {
    id: 1,
    name: "Chicken Biryani",
    price: 220,
    category: "biryani",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  },
  {
    id: 2,
    name: "Hyderabadi Dum Biryani",
    price: 280,
    category: "biryani",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  },
  {
    id: 3,
    name: "Cheese Pizza",
    price: 320,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
  },
  {
    id: 4,
    name: "Pepperoni Pizza",
    price: 380,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
  },
  {
    id: 5,
    name: "Garlic Bread",
    price: 120,
    category: "extra",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  },
  {
    id: 6,
    name: "Chicken Wings",
    price: 180,
    category: "extra",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  },
];

let cart = [];
let currentFilter = "all";
let currentSort = "default";

// Render food list (no side headers, only top bar)
function renderFoodList() {
  const foodList = document.getElementById("foodList");
  const search = document.getElementById("searchInput").value.trim().toLowerCase();

  const filtered = foodData.filter(item => {
    const matchesFilter = currentFilter === "all" || item.category === currentFilter;
    const matchesSearch = item.name.toLowerCase().includes(search);
    return matchesFilter && matchesSearch;
  });

  if (currentSort === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  }

  foodList.innerHTML = filtered.map(item => `
    <div class="food-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="food-info">
        <div class="food-title">${item.name}</div>
        <div class="food-desc">${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</div>
        <div class="food-price">₹${item.price}</div>
        <div class="cart-actions">
          <button class="btn-add" onclick="addToCart(${item.id})">Add to Cart</button>
          <button class="btn-remove" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    </div>
  `).join("");
}

// Add to cart
function addToCart(id) {
  const item = foodData.find(f => f.id === id);
  const index = cart.findIndex(c => c.id === id);
  if (index === -1) {
    cart.push({...item, qty: 1});
  } else {
    cart[index].qty += 1;
  }
  updateCart();
}

// Remove from cart
function removeFromCart(id) {
  const index = cart.findIndex(c => c.id === id);
  if (index !== -1) {
    cart[index].qty -= 1;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
  }
  updateCart();
}

// Update cart display
function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");
  const cartCountEl = document.getElementById("cartCount");
  const totalPriceEl = document.getElementById("totalPrice");

  const totalQty = cart.reduce((sum, it) => sum + it.qty, 0);
  const totalAmt = cart.reduce((sum, it) => sum + it.qty * it.price, 0);

  cartCountEl.textContent = totalQty;
  totalPriceEl.textContent = totalAmt;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cartItems.innerHTML = cart.map(it => `
      <div class="cart-item">
        <span class="cart-item-name">${it.name} × ${it.qty}</span>
        <span class="cart-item-price">₹${it.qty * it.price}</span>
      </div>
    `).join("");
  }

  cartTotalEl.textContent = totalAmt;
}

// Toggle cart modal
function toggleCart() {
  const modal = document.getElementById("cartModal");
  modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

// Search input
document.getElementById("searchInput").addEventListener("input", renderFoodList);

// Filter buttons
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    currentFilter = e.target.dataset.filter;
    renderFoodList();
  });
});

// Sort select
document.getElementById("sortSelect").addEventListener("change", e => {
  currentSort = e.target.value;
  renderFoodList();
});

// Initialize
renderFoodList();
