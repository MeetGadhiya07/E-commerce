$(document).ready(function () {
  const id = location.search.split("?")[1];
  const badge = $("#badge");

  function updateBadge(counter) {
    badge.html(counter);
  }

  function getCookieValue(cookieName) {
    const cookie = document.cookie
      .split(";")
      .find((cookie) => cookie.includes(cookieName));
    return cookie ? parseInt(cookie.split("=")[1]) : 0;
  }

  function addToCart(contentDetails) {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || {};
    const productId = location.search.split("?")[1];

    if (existingCart[productId]) {
      existingCart[productId].quantity += 1;
    } else {
      const cartItem = {
        id: productId,
        details: contentDetails,
        quantity: 1,
      };
      existingCart[productId] = cartItem;
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    updateBadge();
    console.log(existingCart);
  }

  function createProductDetails(contentDetails) {
    const { title, category, price, description, image } = contentDetails;

    return `
      <div id="containerD">
        <div id="imageSection">
          <img id="imgDetails" src="${image}">
        </div>
        <div id="productDetails">
          <h1>${title}</h1>
          <h4>${category}</h4>
          <div id="details">
            <h3>Rs ${price}</h3>
            <h3>Description</h3>
            <p>${description}</p>
          </div>
          <div id="button">
            <button>Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  }

  function fetchProductDetails(id) {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((contentDetails) => {
        console.log("connected!!");
        console.log(contentDetails);
        localStorage.setItem("contentDetails", JSON.stringify(contentDetails));
        $("#containerProduct").append(createProductDetails(contentDetails));
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  fetchProductDetails(id);

  $("#containerProduct").on("click", "#button button", function () {
    const productId = location.search.split("?")[1];
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((contentDetails) => {
        addToCart(contentDetails);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  });
});
