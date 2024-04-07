$(document).ready(function () {
  let contentData;

  // Function to initialize wishlist in localStorage if it doesn't exist
  function initializeWishlist() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (!wishlist) {
      localStorage.setItem("wishlist", JSON.stringify([]));
    }
  }

  // Call initializeWishlist function when document is ready
  initializeWishlist();

  function populateCategoryFilter(products) {
    const categories = [
      "All Products",
      ...new Set(products.map((product) => product.category)),
    ];
    $("#categoryFilter")
      .empty()
      .append(
        categories.map((category) => $("<option></option>").text(category))
      );
  }

  function populatePricingSort() {
    const pricingSort = $("#pricingSort");
    pricingSort
      .empty()
      .append(
        $('<option value="newestFirst" selected>Newest First</option>'),
        $('<option value="lowToHigh">Low to High</option>'),
        $('<option value="highToLow">High to Low</option>')
      );
  }

  function createProductHTML(product) {
    const truncatedTitle =
      product.title.length > 20
        ? `${product.title.substring(0, 20)}...`
        : product.title;
    const productHTML = $(`
    <div id="box">
      <a href="/contentDetails.html?${product.id}">
        <img src="${product.image}" style="width: 90%; height: 250px; margin-left: 5%; margin-top: 5%;">
        <div id="details">
          <h3 style="font-size: 19px;">${truncatedTitle}</h3>
          <h4>${product.category}</h4>
          <h2>Rs ${product.price}</h2>
        </div>
      </a>
      <div class="like-container">
        <div class="shareButton">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
        <path
          d="M400 255.4V240 208c0-8.8-7.2-16-16-16H352 336 289.5c-50.9 0-93.9 33.5-108.3 79.6c-3.3-9.4-5.2-19.8-5.2-31.6c0-61.9 50.1-112 112-112h48 16 32c8.8 0 16-7.2 16-16V80 64.6L506 160 400 255.4zM336 240h16v48c0 17.7 14.3 32 32 32h3.7c7.9 0 15.5-2.9 21.4-8.2l139-125.1c7.6-6.8 11.9-16.5 11.9-26.7s-4.3-19.9-11.9-26.7L409.9 8.9C403.5 3.2 395.3 0 386.7 0C367.5 0 352 15.5 352 34.7V80H336 304 288c-88.4 0-160 71.6-160 160c0 60.4 34.6 99.1 63.9 120.9c5.9 4.4 11.5 8.1 16.7 11.2c4.4 2.7 8.5 4.9 11.9 6.6c3.4 1.7 6.2 3 8.2 3.9c2.2 1 4.6 1.4 7.1 1.4h2.5c9.8 0 17.8-8 17.8-17.8c0-7.8-5.3-14.7-11.6-19.5l0 0c-.4-.3-.7-.5-1.1-.8c-1.7-1.1-3.4-2.5-5-4.1c-.8-.8-1.7-1.6-2.5-2.6s-1.6-1.9-2.4-2.9c-1.8-2.5-3.5-5.3-5-8.5c-2.6-6-4.3-13.3-4.3-22.4c0-36.1 29.3-65.5 65.5-65.5H304h32zM72 32C32.2 32 0 64.2 0 104V440c0 39.8 32.2 72 72 72H408c39.8 0 72-32.2 72-72V376c0-13.3-10.7-24-24-24s-24 10.7-24 24v64c0 13.3-10.7 24-24 24H72c-13.3 0-24-10.7-24-24V104c0-13.3 10.7-24 24-24h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H72z"
        />
      </svg>
        </div>
        <div class="wishlist" data-product-id="${product.id}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
        />
      </svg>
        </div>
      </div>
    </div>
  `);

    // Check if product is in the wishlist
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (wishlist.includes(product.id)) {
      // Change SVG color to indicate it's in the wishlist
      productHTML.find(".wishlist svg path").attr("fill", "#ff0000");
    }

    // Add event listener to wishlist icon
    productHTML.find(".wishlist").on("click", function () {
      const productId = $(this).data("product-id");
      addToWishlist(productId);
    });

    return productHTML;
  }

  // Function to add/remove from wishlist
  function addToWishlist(productId) {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const index = wishlist.indexOf(productId);
    if (index === -1) {
      wishlist.push(productId);
    } else {
      wishlist.splice(index, 1);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    // Update the SVG color to indicate addition/removal from wishlist
    const wishlistIcons = $(
      '.wishlist[data-product-id="' + productId + '"] svg path'
    );
    wishlistIcons.each(function () {
      if ($(this).attr("fill") === "#ff0000") {
        $(this).attr("fill", "#000000"); // Change color back to black
      } else {
        $(this).attr("fill", "#ff0000"); // Change color to red
      }
    });
  }

  function filterAndSortProducts() {
    const selectedCategory = $("#categoryFilter").val();
    const selectedSortOption = $("#pricingSort").val();
    const filteredProducts = contentData.filter(
      (product) =>
        selectedCategory === "All Products" ||
        product.category === selectedCategory
    );
    const sortedProducts =
      selectedSortOption === "lowToHigh"
        ? filteredProducts.slice().sort((a, b) => a.price - b.price)
        : selectedSortOption === "highToLow"
        ? filteredProducts.slice().sort((a, b) => b.price - a.price)
        : filteredProducts;
    displayProducts(sortedProducts);
  }

  const allProducts = $("#allProducts");

  $("#categoryFilter, #pricingSort").on("change", filterAndSortProducts);

  function displayProducts(products) {
    allProducts.empty().append(products.map(createProductHTML));
  }

  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      contentData = data;
      populateCategoryFilter(contentData);
      populatePricingSort();
      displayProducts(contentData);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
});
