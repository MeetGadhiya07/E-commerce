$(document).ready(function () {
  let contentTitle;

  function populateBrandSelect(products) {
    let brandSelect = $("#brandSelect");

    let brands = [];
    $.each(products, function (index, product) {
      if (!brands.includes(product.brand)) {
        brands.push(product.brand);
      }
    });

    $.each(brands, function (index, brand) {
      let option = $("<option></option>").text(brand);
      brandSelect.append(option);
    });
  }

  function dynamicClothingSection(ob) {
    let boxDiv = $("<div></div>").attr("id", "box");

    let boxLink = $("<a></a>").attr("href", "/contentDetails.html?" + ob.id);

    let imgTag = $("<img>")
      .attr("src", ob.image)
      .css("width", "90%")
      .css("height", "250px")
      .css("marginLeft", "5%")
      .css("marginTop", "5%");

    let detailsDiv = $("<div></div>").attr("id", "details");

    let truncatedTitle =
      ob.title.length > 20 ? ob.title.substring(0, 20) + "..." : ob.title;
    let h3 = $("<h3></h3>").text(truncatedTitle).css("font-size", "19px");
    let h4 = $("<h4></h4>").text(ob.category);
    let h2 = $("<h2></h2>").text("Rs " + ob.price);

    boxDiv.append(boxLink);
    boxLink.append(imgTag);
    boxLink.append(detailsDiv);
    detailsDiv.append(h3);
    detailsDiv.append(h4);
    detailsDiv.append(h2);

    return boxDiv;
  }

  function filterByBrand(products, selectedBrand) {
    let filteredProducts = products.filter(function (product) {
      return selectedBrand === "" || product.brand === selectedBrand;
    });
    return filteredProducts;
  }

  let mainContainer = $("#mainContainer");
  let containerClothing = $("#containerClothing");
  let containerAccessories = $("#containerAccessories");

  $("#brandSelect").on("change", function () {
    let selectedBrand = $(this).val();
    let filteredProducts = filterByBrand(contentTitle, selectedBrand);

    containerClothing.html("");
    containerAccessories.html("");

    $.each(filteredProducts, function (index, product) {
      if (product.isAccessory) {
        containerAccessories.append(dynamicClothingSection(product));
      } else {
        containerClothing.append(dynamicClothingSection(product));
      }
    });
  });

  $.ajax({
    url: "https://fakestoreapi.com/products",
    method: "GET",
    dataType: "json",
    success: function (data) {
      contentTitle = data;
      populateBrandSelect(contentTitle);

      $.each(contentTitle, function (index, product) {
        if (product.isAccessory) {
          containerAccessories.append(dynamicClothingSection(product));
        } else {
          containerClothing.append(dynamicClothingSection(product));
        }
      });
    },
    error: function (error) {
      console.error("Fetch error:", error);
    },
  });
});
