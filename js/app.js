import {
  addItem,
  basketCount,
  basketTotal,
  categories,
  filterProducts,
  formatPrice,
  products,
  updateQuantity,
} from "./catalog.js";

const STORAGE_KEY = "medicare-demo-basket-v2";
const state = {
  basket: loadBasket(),
  category: "All",
  query: "",
};

const elements = {
  basketBody: document.querySelector("#basket-body"),
  basketCount: document.querySelector("#basket-count"),
  basketDialog: document.querySelector("#basket-dialog"),
  basketTotal: document.querySelector("#basket-total"),
  categoryFilter: document.querySelector("#category-filter"),
  closeBasket: document.querySelector("#close-basket"),
  contactForm: document.querySelector("#contact-form"),
  contactStatus: document.querySelector("#contact-status"),
  menuButton: document.querySelector("#menu-button"),
  nav: document.querySelector("#site-nav"),
  openBasket: document.querySelector("#open-basket"),
  productGrid: document.querySelector("#product-grid"),
  resultCount: document.querySelector("#result-count"),
  searchInput: document.querySelector("#product-search"),
  toast: document.querySelector("#toast"),
};

function loadBasket() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(value)) return [];
    return value.filter(
      (item) =>
        typeof item?.id === "string" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    );
  } catch {
    return [];
  }
}

function saveBasket() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.basket));
}

function buildProductCard(product) {
  const article = document.createElement("article");
  article.className = "product-card";

  const artwork = document.createElement("div");
  artwork.className = "product-art";
  artwork.setAttribute("aria-hidden", "true");
  artwork.textContent = product.icon;

  const label = document.createElement("span");
  label.className = "eyebrow product-label";
  label.textContent = product.label;

  const title = document.createElement("h3");
  title.textContent = product.name;

  const category = document.createElement("p");
  category.className = "product-category";
  category.textContent = product.category;

  const description = document.createElement("p");
  description.className = "product-description";
  description.textContent = product.description;

  const footer = document.createElement("div");
  footer.className = "product-footer";

  const price = document.createElement("strong");
  price.textContent = formatPrice(product.price);

  const button = document.createElement("button");
  button.className = "button button-secondary";
  button.type = "button";
  button.dataset.addProduct = product.id;
  button.textContent = "Add to demo basket";

  footer.append(price, button);
  article.append(artwork, label, title, category, description, footer);
  return article;
}

function renderProducts() {
  const matches = filterProducts(products, state.query, state.category);
  elements.productGrid.replaceChildren(...matches.map(buildProductCard));
  elements.resultCount.textContent = `${matches.length} ${matches.length === 1 ? "item" : "items"}`;

  if (!matches.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No products match those filters. Try a different search.";
    elements.productGrid.append(empty);
  }
}

function renderBasket() {
  elements.basketCount.textContent = basketCount(state.basket);
  elements.basketBody.replaceChildren();

  if (!state.basket.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Your demo basket is empty.";
    elements.basketBody.append(empty);
  } else {
    state.basket.forEach((basketItem) => {
      const product = products.find((item) => item.id === basketItem.id);
      if (!product) return;

      const row = document.createElement("div");
      row.className = "basket-row";

      const details = document.createElement("div");
      const title = document.createElement("strong");
      title.textContent = product.name;
      const price = document.createElement("span");
      price.textContent = `${formatPrice(product.price)} each`;
      details.append(title, price);

      const controls = document.createElement("div");
      controls.className = "quantity-controls";
      controls.setAttribute("aria-label", `Quantity for ${product.name}`);

      const decrease = document.createElement("button");
      decrease.type = "button";
      decrease.dataset.quantity = String(basketItem.quantity - 1);
      decrease.dataset.productId = product.id;
      decrease.setAttribute("aria-label", `Decrease ${product.name} quantity`);
      decrease.textContent = "−";

      const quantity = document.createElement("span");
      quantity.setAttribute("aria-live", "polite");
      quantity.textContent = basketItem.quantity;

      const increase = document.createElement("button");
      increase.type = "button";
      increase.dataset.quantity = String(basketItem.quantity + 1);
      increase.dataset.productId = product.id;
      increase.setAttribute("aria-label", `Increase ${product.name} quantity`);
      increase.textContent = "+";

      controls.append(decrease, quantity, increase);
      row.append(details, controls);
      elements.basketBody.append(row);
    });
  }

  elements.basketTotal.textContent = formatPrice(basketTotal(state.basket, products));
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.hidden = false;
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    elements.toast.hidden = true;
  }, 2400);
}

function initialiseFilters() {
  categories(products).forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    elements.categoryFilter.append(option);
  });
}

elements.productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add-product]");
  if (!button) return;
  state.basket = addItem(state.basket, button.dataset.addProduct);
  saveBasket();
  renderBasket();
  showToast("Added to your demo basket.");
});

elements.basketBody.addEventListener("click", (event) => {
  const button = event.target.closest("[data-quantity]");
  if (!button) return;
  state.basket = updateQuantity(
    state.basket,
    button.dataset.productId,
    Number(button.dataset.quantity),
  );
  saveBasket();
  renderBasket();
});

elements.searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderProducts();
});

elements.categoryFilter.addEventListener("change", (event) => {
  state.category = event.target.value;
  renderProducts();
});

elements.openBasket.addEventListener("click", () => elements.basketDialog.showModal());
elements.closeBasket.addEventListener("click", () => elements.basketDialog.close());
elements.basketDialog.addEventListener("click", (event) => {
  if (event.target === elements.basketDialog) elements.basketDialog.close();
});

elements.menuButton.addEventListener("click", () => {
  const isOpen = elements.menuButton.getAttribute("aria-expanded") === "true";
  elements.menuButton.setAttribute("aria-expanded", String(!isOpen));
  elements.nav.dataset.open = String(!isOpen);
});

elements.nav.addEventListener("click", (event) => {
  if (!event.target.closest("a")) return;
  elements.menuButton.setAttribute("aria-expanded", "false");
  elements.nav.dataset.open = "false";
});

elements.contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!elements.contactForm.reportValidity()) return;
  elements.contactForm.reset();
  elements.contactStatus.textContent =
    "Demo submitted successfully. No information was stored or sent.";
});

document.querySelector("#year").textContent = new Date().getFullYear();
initialiseFilters();
renderProducts();
renderBasket();

