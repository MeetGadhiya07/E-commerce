async function fetchProductDetails(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
}

function getWishlistItems() {
  try {
    const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    return wishlistItems;
  } catch (error) {
    console.error("Error getting wishlist items:", error);
    return [];
  }
}

async function loadWishlist() {
  const wishlistItems = getWishlistItems();
  const cartContainer = document.getElementById("cartContainer");

  try {
    const productPromises = wishlistItems.map(fetchProductDetails);
    const products = await Promise.all(productPromises);

    cartContainer.innerHTML = "";
    products.forEach((productDetails) => {
      const productListingDiv = document.createElement("div");
      productListingDiv.classList.add("product-listing");

      const productContentDiv = document.createElement("div");
      productContentDiv.classList.add("product-content");

      const productId = productDetails.id;

      productContentDiv.innerHTML = `
      <div class="product-11">
        <img src="${productDetails.image}" alt="${productDetails.title}" />
        <div class="product-details">
          <h3 class="product-title">${productDetails.title}</h3>
          <p class="product-price">${productDetails.price}</p>
          <p class="product-description">${productDetails.description}</p>
        </div>
      </div>
      <div  class="remove-btn-group">
        <button class="remove-button" data-product-id="${productId}">
          Remove
        </button>
      </div>
      `;

      productListingDiv.appendChild(productContentDiv);
      cartContainer.appendChild(productListingDiv);
    });

    document.querySelectorAll(".remove-button").forEach((button) => {
      button.addEventListener("click", removeFromWishlist);
    });
  } catch (error) {
    console.error("Error loading wishlist:", error);
  }
}

function removeFromWishlist(event) {
  const productId = String(event.target.dataset.productId);

  let wishlistItems = getWishlistItems();
  wishlistItems = wishlistItems.filter((item) => item !== productId);
  localStorage.setItem("wishlist", JSON.stringify(wishlistItems));

  loadWishlist();
}

document.addEventListener("DOMContentLoaded", loadWishlist);
