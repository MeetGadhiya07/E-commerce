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

  function addToCart() {
    const existingOrderId = getCookieValue("orderId");
    const existingCounter = getCookieValue("counter");
    const order = existingOrderId ? `${id} ${existingOrderId}` : id;
    const counter = existingCounter ? existingCounter + 1 : 1;

    document.cookie = `orderId=${order}; counter=${counter}`;
    updateBadge(counter);
    console.log(document.cookie);
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
        $("#containerProduct").append(createProductDetails(contentDetails));
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  fetchProductDetails(id);

  $("#containerProduct").on("click", "#button button", addToCart);
});
