import test from "node:test";
import assert from "node:assert/strict";

import {
  addItem,
  basketCount,
  basketTotal,
  categories,
  filterProducts,
  formatPrice,
  products,
  updateQuantity,
} from "../js/catalog.js";

test("search is case-insensitive and includes descriptions", () => {
  assert.equal(filterProducts(products, "THERMOMETER").length, 1);
  assert.equal(filterProducts(products, "travel").length, 2);
});

test("category and query filters work together", () => {
  const result = filterProducts(products, "gel", "Hygiene");
  assert.deepEqual(result.map((item) => item.id), ["hand-gel"]);
});

test("category list is unique and begins with All", () => {
  const result = categories(products);
  assert.equal(result[0], "All");
  assert.equal(new Set(result).size, result.length);
});

test("adding the same product increments its quantity", () => {
  const once = addItem([], "first-aid-kit");
  const twice = addItem(once, "first-aid-kit");
  assert.deepEqual(twice, [{ id: "first-aid-kit", quantity: 2 }]);
});

test("quantity can be updated or reduced to remove an item", () => {
  const basket = [{ id: "hand-gel", quantity: 1 }];
  assert.deepEqual(updateQuantity(basket, "hand-gel", 3), [
    { id: "hand-gel", quantity: 3 },
  ]);
  assert.deepEqual(updateQuantity(basket, "hand-gel", 0), []);
});

test("basket count and total use quantities", () => {
  const basket = [
    { id: "hand-gel", quantity: 2 },
    { id: "digital-thermometer", quantity: 1 },
  ];
  assert.equal(basketCount(basket), 3);
  assert.equal(basketTotal(basket, products), 14.39);
});

test("unknown product IDs do not affect the total", () => {
  assert.equal(basketTotal([{ id: "missing", quantity: 5 }], products), 0);
});

test("prices use British pound formatting", () => {
  assert.match(formatPrice(14.99), /£14\.99/);
});

