document.addEventListener("DOMContentLoaded", function () {
  let contentTitle;

  function populateBrandSelect(products) {
    let brandSelect = document.getElementById("brandSelect");

    let brands = [];
    products.forEach(function (product) {
      if (!brands.includes(product.brand)) {
        brands.push(product.brand);
      }
    });

    brands.forEach(function (brand) {
      let option = document.createElement("option");
      option.text = brand;
      brandSelect.add(option);
    });
  }

  function dynamicClothingSection(ob) {
    console.log("ob ===>", ob);
    let boxDiv = document.createElement("div");
    boxDiv.id = "box";

    let boxLink = document.createElement("a");
    boxLink.href = "/contentDetails.html?" + ob.id;

    let imgTag = document.createElement("img");
    imgTag.src = ob.image;
    imgTag.style.width = "100%";
    imgTag.style.height = "250px";

    let detailsDiv = document.createElement("div");
    detailsDiv.id = "details";

    let h3 = document.createElement("h3");
    let h3Text = document.createTextNode(ob.title);
    h3.appendChild(h3Text);

    let h4 = document.createElement("h4");
    let h4Text = document.createTextNode(ob.category);
    h4.appendChild(h4Text);

    let h2 = document.createElement("h2");
    let h2Text = document.createTextNode("Rs " + ob.price);
    h2.appendChild(h2Text);

    boxDiv.appendChild(boxLink);
    boxLink.appendChild(imgTag);
    boxLink.appendChild(detailsDiv);
    detailsDiv.appendChild(h3);
    detailsDiv.appendChild(h4);
    detailsDiv.appendChild(h2);

    return boxDiv;
  }

  function filterByBrand(products, selectedBrand) {
    let filteredProducts = products.filter(function (product) {
      return selectedBrand === "" || product.brand === selectedBrand;
    });
    return filteredProducts;
  }

  let mainContainer = document.getElementById("mainContainer");
  let containerClothing = document.getElementById("containerClothing");
  let containerAccessories = document.getElementById("containerAccessories");

  let brandSelect = document.getElementById("brandSelect");
  brandSelect.addEventListener("change", function () {
    let selectedBrand = this.value;
    let filteredProducts = filterByBrand(contentTitle, selectedBrand);

    containerClothing.innerHTML = "";
    containerAccessories.innerHTML = "";

    filteredProducts.forEach(function (product) {
      if (product.isAccessory) {
        containerAccessories.appendChild(dynamicClothingSection(product));
      } else {
        containerClothing.appendChild(dynamicClothingSection(product));
      }
    });
  });

  let httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status == 200) {
        contentTitle = JSON.parse(this.responseText);
        populateBrandSelect(contentTitle);

        contentTitle.forEach(function (product) {
          if (product.isAccessory) {
            containerAccessories.appendChild(dynamicClothingSection(product));
          } else {
            containerClothing.appendChild(dynamicClothingSection(product));
          }
        });
      } else {
        console.log("call failed!");
      }
    }
  };
  httpRequest.open("GET", "https://fakestoreapi.com/products", true);
  httpRequest.send();
});
