export const products = Object.freeze([
  {
    id: "first-aid-kit",
    name: "Everyday First Aid Kit",
    category: "First aid",
    price: 14.99,
    description: "A compact selection of plasters, dressings and cleansing wipes.",
    label: "Popular",
    icon: "✚",
  },
  {
    id: "digital-thermometer",
    name: "Digital Thermometer",
    category: "Health devices",
    price: 8.49,
    description: "A simple digital thermometer with a clear display and storage case.",
    label: "Everyday care",
    icon: "°C",
  },
  {
    id: "heat-patches",
    name: "Reusable Heat Patches",
    category: "Pain care",
    price: 6.75,
    description: "Reusable warming patches designed for temporary comfort.",
    label: "Reusable",
    icon: "☀",
  },
  {
    id: "vitamin-organiser",
    name: "Weekly Tablet Organiser",
    category: "Daily wellbeing",
    price: 5.25,
    description: "Seven clearly labelled compartments in a travel-friendly case.",
    label: "Practical",
    icon: "7",
  },
  {
    id: "saline-spray",
    name: "Saline Nasal Spray",
    category: "Cold care",
    price: 4.99,
    description: "A drug-free saline mist for everyday nasal care.",
    label: "Drug free",
    icon: "≈",
  },
  {
    id: "hand-gel",
    name: "Travel Hand Gel",
    category: "Hygiene",
    price: 2.95,
    description: "A pocket-sized cleansing hand gel for use while travelling.",
    label: "Travel size",
    icon: "◇",
  },
]);

export function filterProducts(items, query = "", category = "All") {
  const normalisedQuery = query.trim().toLocaleLowerCase();
  return items.filter((item) => {
    const matchesCategory = category === "All" || item.category === category;
    const searchable = `${item.name} ${item.category} ${item.description}`.toLocaleLowerCase();
    return matchesCategory && searchable.includes(normalisedQuery);
  });
}

export function categories(items) {
  return ["All", ...new Set(items.map((item) => item.category))];
}

export function addItem(basket, productId) {
  const existing = basket.find((item) => item.id === productId);
  if (!existing) return [...basket, { id: productId, quantity: 1 }];
  return basket.map((item) =>
    item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
  );
}

export function updateQuantity(basket, productId, quantity) {
  const safeQuantity = Number.isFinite(quantity) ? Math.max(0, Math.floor(quantity)) : 0;
  if (safeQuantity === 0) return basket.filter((item) => item.id !== productId);
  return basket.map((item) =>
    item.id === productId ? { ...item, quantity: safeQuantity } : item,
  );
}

export function basketCount(basket) {
  return basket.reduce((total, item) => total + item.quantity, 0);
}

export function basketTotal(basket, items) {
  return basket.reduce((total, basketItem) => {
    const product = items.find((item) => item.id === basketItem.id);
    return total + (product ? product.price * basketItem.quantity : 0);
  }, 0);
}

export function formatPrice(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

