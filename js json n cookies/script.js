// JavaScript

document.addEventListener("DOMContentLoaded", function() {
  fetch("catalog.json")
    .then(response => response.json())
    .then(data => {
      const productsContainer = document.getElementById("products-container");

      data.products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.innerHTML = 
          <h3>${product.name}</h3>
          <p>Price: ${product.price}</p>
          <button onclick="addToCart(product.id)">Add to Cart</button>
        ;

        productsContainer.appendChild(productElement);
      });
    })
    .catch(error => console.error(error));
});

function addToCart(productId) {
  fetch("cart.json")
    .then(response => response.json())
    .then(data => {
      const cart = data.cart || [];
      cart.push(productId);

      return fetch("cart.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ cart: cart })
      });
    })
    .then(() => {
      // Обновление корзины после добавления товара
      updateCart();
      alert("Product added to cart!");
    })
    .catch(error => console.error(error));
}

function updateCart() {
  fetch("cart.json")
    .then(response => response.json())
    .then(data => {
      const cartItemCount = document.getElementById("cart-item-count");
      const itemCount = data.cart ? data.cart.length : 0;

      cartItemCount.textContent = itemCount;
    })
    .catch(error => console.error(error));
}
