async function getData() {
    const url =
        "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
    const response = await fetch(url);
    const data = await response.json();
    return data.categories;
}

function calculateDiscountPercentage(price, compareAtPrice) {
    if (!compareAtPrice || compareAtPrice <= price) {
        return 0;
    }
    return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

async function renderProducts(category) {
    const productsData = await getData();
    const productCardsContainer = document.getElementById("product-cards");
    productCardsContainer.innerHTML = "";

    productsData.forEach(({
        category_name,
        category_products
    }) => {
        if (category_name.toLowerCase() === category.toLowerCase()) {
            category_products.forEach(
                ({
                    id,
                    title,
                    price,
                    compare_at_price,
                    vendor,
                    badge_text,
                    image
                }) => {
                    const productCard = document.createElement("div");
                    productCard.classList.add("product-card");

                    const discountPercentage = calculateDiscountPercentage(
                        price,
                        compare_at_price
                    );

                    productCard.innerHTML = `
          <div>
          ${badge_text ? <p class="badge">${badge_text}</p> : ''}
          </div>
             <img src= ${image} alt=${title}  class = "ImageList">
            <div class= "divContainer">
            <h3 class = "Title">${title}</h3>
            <li class = "Vendor">${vendor}</li>
            </div>
            <div class = "PriceList">
            <p class = "Price">RS ${price}</p>
            ${
              compare_at_price
                ? <p class = "Compare">${compare_at_price}</p>
                : ""
            }
            ${discountPercentage > 0 ? <p class = "Discount">-${discountPercentage}%Off</p> : ""}
            </div>
            <button class="add-to-cart">Add to Cart</button>
          `;

                    productCardsContainer.appendChild(productCard);
                }
            );
        }
    });

    // Toggle the 'active' class based on the selected tab
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab) => {
        tab.classList.remove("active");
        if (tab.textContent.trim().toLowerCase() === category.toLowerCase()) {
            tab.classList.add("active");
        }
    });
}

function showProducts(category) {
    renderProducts(category);
}

// Initial rendering
showProducts("Men");
