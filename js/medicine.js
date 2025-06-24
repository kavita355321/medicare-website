window.onload = function () {
  const medId = localStorage.getItem("selectedMedicine");
  const med = medicines.find(m => m.id === medId);
  if (!med) return;

  document.getElementById("med-details").innerHTML = `
    <h2>${med.name}</h2>
    <div class="details-container">
      <img src="${med.image}" alt="${med.name}">
      <div class="info">
        <p><strong>Description:</strong> ${med.description}</p>
        <p><strong>Price:</strong> ₹${med.price}</p>
        <button onclick="addToCart('${med.id}')">Add to Cart</button>
      </div>
    </div>
  `;
};

function addToCart(medId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(medId);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Medicine added to cart!");
}

//cart
function addToCart() {
  const selectedId = localStorage.getItem("selectedMedicine");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(selectedId);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Medicine added to cart!");
}
