$(document).ready(function () {
  let contentData;

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
    return $(`
      <div id="box">
        <a href="/contentDetails.html?${product.id}">
          <img src="${product.image}" style="width: 90%; height: 250px; margin-left: 5%; margin-top: 5%;">
          <div id="details">
            <h3 style="font-size: 19px;">${truncatedTitle}</h3>
            <h4>${product.category}</h4>
            <h2>Rs ${product.price}</h2>
          </div>
        </a>
      </div>
    `);
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
