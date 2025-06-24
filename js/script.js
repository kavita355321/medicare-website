function validateRegistration() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!name || !email || !phone || !password || !confirmPassword) {
    alert("Please fill all fields.");
    return false;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return false;
  }

  alert("Registration Successful!");
  return true;
}

//login

function validateLogin() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return false;
  }

  // Example: simple hardcoded user check (you can later replace with real data)
  if (email === "user@example.com" && password === "1234") {
    alert("Login successful!");
    return true;
  } else {
    alert("Invalid credentials!");
    return false;
  }
}


//contact
function validateContact() {
  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const message = document.getElementById("contactMessage").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all the fields.");
    return false;
  }

  alert("Thanks for contacting us! We’ll get back to you soon.");
  return true;
}


//search
/*const medicines = [
  {
    id: "med1",
    name: "Paracetamol",
    description: "Used for fever and pain relief",
    price: 20,
    image: "images/medicine1.jpg"
  },
  {
    id: "med2",
    name: "Ibuprofen",
    description: "Anti-inflammatory and painkiller",
    price: 40,
    image: "images/medicine2.jpg"
  },
  {
    id: "med3",
    name: "Cough Syrup",
    description: "Soothes dry and wet cough",
    price: 60,
    image: "images/medicine3.jpg"
  }
];*/


function searchMedicine() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const resultsContainer = document.getElementById("medicineResults");
  resultsContainer.innerHTML = "";

  const filtered = medicines.filter(med =>
    med.name.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    resultsContainer.innerHTML = "<p>No medicines found.</p>";
    return;
  }

  filtered.forEach(med => {
    const card = `
      <div class="medicine-card">
        <img src="${med.image}" alt="${med.name}">
        <h3>${med.name}</h3>
        <p>${med.description}</p>
      </div>`;
    resultsContainer.innerHTML += card;
  });
}

//Script to load medicines
window.onload = function () {
  const container = document.getElementById("medicine-list");
  if (!container) return;

  medicines.forEach(med => {
    container.innerHTML += `
      <div class="medicine-card">
        <img src="${med.image}" alt="${med.name}">
        <h3>${med.name}</h3>
        <p>${med.description}</p>
        <p><strong>₹${med.price}</strong></p>
        <button onclick="viewDetails('${med.id}')">View Details</button>
      </div>
    `;
  });
};

function viewDetails(id) {
  localStorage.setItem("selectedMedicine", id);
  window.location.href = "medicine.html";
}

//cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = cart.length;
  }
}

// Call this on page load
window.onload = function () {
  updateCartCount();

  // existing code for homepage medicine rendering, if applicable
  const container = document.getElementById("medicine-list");
  if (container && typeof medicines !== 'undefined') {
    medicines.forEach(med => {
      container.innerHTML += `
        <div class="medicine-card">
          <img src="${med.image}" alt="${med.name}">
          <h3>${med.name}</h3>
          <p>${med.description}</p>
          <p><strong>₹${med.price}</strong></p>
          <button onclick="viewDetails('${med.id}')">View Details</button>
        </div>
      `;
    });
  }
};


function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const countEl = document.getElementById("cart-count");
  if (countEl) {
    countEl.textContent = cart.length;
  }
}

window.addEventListener('load', updateCartCount);

//Update Cart Counter Instantly After “Add to Cart”
function addToCart(medId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(medId);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Medicine added to cart!");
  updateCartCount();  // 🔁 Instant update
}

/*function placeOrder() {
  if (!localStorage.getItem("cart") || JSON.parse(localStorage.getItem("cart")).length === 0) {
    alert("Your cart is empty!");
    return;
  }
  localStorage.removeItem("cart");  // Clear cart
  window.location.href = "order.html";  // Redirect to success page
}*/

function placeOrder() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Clear the cart
  localStorage.removeItem("cart");

  // Redirect to order success page
  window.location.href = "order.html";
}

/*back to home btn*/
/*window.onload = function () {
  const orderId = Math.floor(Math.random() * 100000);
  document.getElementById("order-id").innerText = `#MDC${orderId}`;
};*/
