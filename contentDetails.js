$(document).ready(function () {
  let id = location.search.split("?")[1];

  if (document.cookie.indexOf(",counter=") >= 0) {
    let counter = document.cookie.split(",")[1].split("=")[1];
    $("#badge").html(counter);
  }

  function dynamicContentDetails(ob) {
    let mainContainer = $("<div>").attr("id", "containerD");
    $("#containerProduct").append(mainContainer);

    let imageSectionDiv = $("<div>").attr("id", "imageSection");
    let imgTag = $("<img>").attr("id", "imgDetails").attr("src", ob.image);
    imageSectionDiv.append(imgTag);

    let productDetailsDiv = $("<div>").attr("id", "productDetails");
    let h1 = $("<h1>").text(ob.title);
    let h4 = $("<h4>").text(ob.category);

    let detailsDiv = $("<div>").attr("id", "details");
    let h3DetailsDiv = $("<h3>").text("Rs " + ob.price);
    let h3 = $("<h3>").text("Description");
    let para = $("<p>").text(ob.description);

    let productPreviewDiv = $("<div>").attr("id", "productPreview");
    let h3ProductPreviewDiv = $("<h3>").text("Product Preview");
    productPreviewDiv.append(h3ProductPreviewDiv);

    let buttonDiv = $("<div>").attr("id", "button");
    let buttonTag = $("<button>").text("Add to Cart");
    buttonTag.click(function () {
      let order = id + " ";
      let counter = 1;
      if (document.cookie.indexOf(",counter=") >= 0) {
        order = id + " " + document.cookie.split(",")[0].split("=")[1];
        counter = Number(document.cookie.split(",")[1].split("=")[1]) + 1;
      }
      document.cookie = "orderId=" + order + ",counter=" + counter;
      $("#badge").html(counter);
      console.log(document.cookie);
    });
    buttonDiv.append(buttonTag);

    mainContainer.append(imageSectionDiv);
    mainContainer.append(productDetailsDiv);
    productDetailsDiv.append(h1);
    productDetailsDiv.append(h4);
    productDetailsDiv.append(detailsDiv);
    detailsDiv.append(h3DetailsDiv);
    detailsDiv.append(h3);
    detailsDiv.append(para);
    productDetailsDiv.append(productPreviewDiv);
    productDetailsDiv.append(buttonDiv);

    return mainContainer;
  }

  // BACKEND CALLING

  let httpRequest = new XMLHttpRequest();
  {
    httpRequest.onreadystatechange = function () {
      if (this.readyState === 4 && this.status == 200) {
        console.log("connected!!");
        let contentDetails = JSON.parse(this.responseText);
        {
          console.log(contentDetails);
          dynamicContentDetails(contentDetails);
        }
      } else {
        console.log("not connected!");
      }
    };
  }

  httpRequest.open("GET", "https://fakestoreapi.com/products/" + id, true);
  httpRequest.send();
});
