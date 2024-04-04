document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== "") {
      fetch(`https://fakestoreapi.com/products?title=${searchTerm}`)
        .then((response) => response.json())
        .then((products) => {
          if (products.length > 0) {
            const productsHTML = products
              .map(
                (product) => `
              <div class="product">
                <img src="${product.image}" alt="${product.title}" />
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <p>Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
              </div>
            `
              )
              .join("");
            searchResults.innerHTML = productsHTML;
          } else {
            searchResults.innerHTML = "<p>No results found.</p>";
          }
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          searchResults.innerHTML =
            "<p>Error fetching products. Please try again later.</p>";
        });
    } else {
      searchResults.innerHTML = ""; // Clear the search results if the search term is empty
    }
  });
});
