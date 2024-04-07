document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.getElementById("cartContainer");

  function displayCart(cart) {
    cartContainer.innerHTML = '';
    let totalItems = 0;

    for (const productId in cart) {
      if (cart.hasOwnProperty(productId)) {
        const product = cart[productId];
        const cartItemDiv = document.createElement("div");
        
        if (product && product.details && product.details.title && product.details.price && product.details.image) {
          // Create a product card with image, title, price, and quantity
          cartItemDiv.classList.add("product-card");
          cartItemDiv.innerHTML = `
            <img src="${product.details.image}" alt="${product.details.title}" class="product-image">
            <div class="product-details">
              <h3 class="product-title">${product.details.title}</h3>
              <p class="product-price">Rs ${product.details.price}</p>
              <p class="product-quantity">Quantity: <span class="quantity-value">${product.quantity}</span></p>
              <button class="increase-button" data-product-id="${productId}">+</button>
              <button class="decrease-button" data-product-id="${productId}">-</button>
              <button class="remove-button" data-product-id="${productId}">Remove</button>
            </div>
          `;
          cartContainer.appendChild(cartItemDiv);
          // Increment total items count
          totalItems += product.quantity; 
        }
      }
    }

    // Display total items count
    document.getElementById('totalItem').textContent = `Total Items: ${totalItems}`;


    // Add event listeners for increase, decrease, and remove buttons
    const increaseButtons = document.querySelectorAll(".increase-button");
    increaseButtons.forEach(button => {
      button.addEventListener("click", function() {
        const productId = button.getAttribute("data-product-id");
        changeQuantity(productId, 1);
      });
    });

    const decreaseButtons = document.querySelectorAll(".decrease-button");
    decreaseButtons.forEach(button => {
      button.addEventListener("click", function() {
        const productId = button.getAttribute("data-product-id");
        changeQuantity(productId, -1);
      });
    });

    const removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach(button => {
      button.addEventListener("click", function() {
        const productId = button.getAttribute("data-product-id");
        removeProduct(productId);
      });
    });
  }

  const storedCart = JSON.parse(localStorage.getItem("cart")) || {};
  displayCart(storedCart);

  function changeQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart[productId]) {
      cart[productId].quantity += change;
      if (cart[productId].quantity <= 0) {
        delete cart[productId];
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart(cart);
  }

  function removeProduct(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    delete cart[productId];
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart(cart);
  }
});