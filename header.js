document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const productsContainer = document.getElementById("products-container");
  let jsonData = [];

  function renderProducts(products) {
    productsContainer.innerHTML = "";
    if (products.length === 0) {
      productsContainer.innerHTML = "<p>No products found</p>";
      productsContainer.style.display = "none"; // Hide the products container
    } else {
      products.forEach((product) => {
        const truncatedTitle =
          product.title.length > 20
            ? `${product.title.substring(0, 20)}...`
            : product.title;
        const productCard = `
            <a href="/contentDetails.html?${product.id}">
              <div class="product-card">
                  <img src="${product.image}" alt="${product.title}" />
                  <h3>${truncatedTitle}</h3>
              </div>
            </a>
              `;
        productsContainer.insertAdjacentHTML("beforeend", productCard);
        productsContainer.style.display = "block"; // Show the products container
      });
    }
  }

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === "") {
      // If search term is empty, clear products container
      productsContainer.innerHTML = "";
      productsContainer.style.display = "none"; // Hide the products container
      return; // Exit function early
    }

    const filteredProducts = jsonData.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts);
  });

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      jsonData = data;
    })
    .catch((error) => console.error("Error fetching data:", error));

  // Hide the products container by default
  productsContainer.style.display = "none";

  // Event listener to hide the products container on outside click
  document.body.addEventListener("click", function (event) {
    const isClickInside = productsContainer.contains(event.target);
    if (!isClickInside) {
      productsContainer.style.display = "none";
    }
  });
});
