async function fetchProductDetails(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    return data; // Returning the fetched product data
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

function getWishlistItems() {
  const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
  return wishlistItems;
}

function loadWishlist() {
  const wishlistItems = getWishlistItems();
  const cartContainer = document.getElementById("cartContainer");

  wishlistItems.forEach(async (id) => {
    const productDetails = await fetchProductDetails(id);
    cartContainer.innerHTML += `
        <div class="product">
          <img src="${productDetails.image}" alt="${productDetails.title}" />
          <h3>${productDetails.title}</h3>
          <p>${productDetails.price}</p>
          <p>${productDetails.description}</p>
        </div>
      `;
  });
}

window.onload = loadWishlist;
