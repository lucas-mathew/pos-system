		import {
			getProducts,
			saveProducts,
			getCart,
			saveCart,
		} from "./data/storage.js";
		import { calculateProfit, calculateCapital } from "./utils/calculations.js";
		import { renderPage } from "./aside.js";

		//  Aside
		document.querySelector(".aside").innerHTML = renderPage();

		const productsContainer = document.querySelector(".products-info-container");

		const products = getProducts();

		function renderProducts(productsArrays) {
			let productsHTML = "";

			for (let product of productsArrays) {
				productsHTML += `
					<div class="rows">
							<div class="product">${product.pName}</div>
						<div class="stock">
							<span>${product.pStockPerMainUnit}${product.pMainUnit}</span>
						</div>

						<div class="buy-price">
							<span>$${product.pBuyPricePerMain} /${product.pMainUnit}</span>
						</div>

						<div class="sale-price">$${product.pSalePricePerMain} /${product.pMainUnit}</div>

						<div class="profit">
						${calculateProfit(
              product.pStockPerMainUnit,
              product.pSalePricePerMain,
              product.pBuyPricePerMain,
            )} 
					</div>

						<div class="capital">
							${calculateCapital(product.pBuyPricePerMain, product.pStockPerMainUnit)}
						</div>
            <button data-product-id="${product.id}" class="addToCartButton">Add to cart</button>

				</div>
								`;
		}
		productsContainer.innerHTML = productsHTML;
	}

	renderProducts(products);

	let searchInput = document.querySelector("#search-product");
	searchInput.addEventListener("input", () => {
		// let products = getProducts()
		let searchedName = searchInput.value.toLowerCase();
		console.log(searchedName);
		let searchedProduct = products.filter((p) =>
			p.pName.toLowerCase().includes(searchedName),
		);

		renderProducts(searchedProduct);
	});


	