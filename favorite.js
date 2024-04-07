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

async function getWishlistItems() {
  try {
    const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    return wishlistItems;
  } catch (error) {
    console.error("Error getting wishlist items:", error);
    return [];
  }
}

async function loadWishlist() {
  const cartContainer = document.getElementById("cartContainer");

  try {
    const wishlistItems = await getWishlistItems();
    cartContainer.innerHTML = "";
    for (const productId of wishlistItems) {
      const productDetails = await fetchProductDetails(productId);
      renderProduct(productDetails);
    }
  } catch (error) {
    console.error("Error loading wishlist:", error);
  }
}

function renderProduct(productDetails) {
  const cartContainer = document.getElementById("cartContainer");

  const productListingDiv = document.createElement("div");
  productListingDiv.classList.add("product-listing");

  const productContentDiv = document.createElement("div");
  productContentDiv.classList.add("product-content");

  productContentDiv.innerHTML = `
    <div class="product-11">
      <img src="${productDetails.image}" alt="${productDetails.title}" />
      <div class="product-details">
        <h3 class="product-title">${productDetails.title}</h3>
        <p class="product-price">${productDetails.price}</p>
        <p class="product-description">${productDetails.description}</p>
      </div>
    </div>
    <div class="remove-btn-group">
      <button class="remove-button" data-product-id="${productDetails.id}">
        Remove
      </button>
    </div>
  `;

  productListingDiv.appendChild(productContentDiv);
  cartContainer.appendChild(productListingDiv);

  const removeButton = productContentDiv.querySelector(".remove-button");
  removeButton.addEventListener("click", removeFromWishlist);
}

function removeFromWishlist(event) {
  const productId = event.target.dataset.productId;
  let wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlistItems = wishlistItems.filter((item) => item !== productId);
  localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  
  // Remove the product listing from the DOM
  const productListing = event.target.closest('.product-listing');
  if (productListing) {
    productListing.remove();
  }
}

document.addEventListener("DOMContentLoaded", loadWishlist);
