		import { getProducts, saveProducts } from "./data/products.js";
		import { calculateProfit, calculateCapital } from "./utils/calculations.js";
		import { renderPage } from "./utils/aside.js";
		import { saveCart, getCart } from "./data/cart.js";

		//  Aside
		document.querySelector(".aside").innerHTML = renderPage();
		const productsContainer = document.querySelector(".products-info-container");

		let products = getProducts();
		function renderProducts(productsArrays) {
			let productsHTML = "";

			for (let product of productsArrays) {
				productsHTML += `
								<div class="rows">
								<div class="product">${product.pName}</div>
								<div class="stock">
									<span>${product.pStockPerMainUnit}${product.pMainUnit}</span>
									<span>${product.pStockPerSubUnit}${product.pSubUnit}</span>
								</div>

								<div class="buy-price">
									<span> ${product.pBuyPricePerMain.toLocaleString("en-TZ")} /${product.pMainUnit}</span>
								</div>

								<div class="sale-price"> ${product.pSalePricePerMain.toLocaleString("en-TZ")} /${product.pMainUnit}</div>

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
								<div class="actions">
									<button class="edit-btn"  data-id="${product.id}">edit</button>
									<button class="delete-btn"data-id="${product.id}">delete</button>
								</div>
							</div>
						`;
			}

			if (productsHTML !== "") {
				productsContainer.innerHTML = productsHTML;
				productsContainer.classList.remove("empty-container");
			} else {
				productsContainer.classList.add("empty-container");
				productsContainer.innerHTML = "No product found";
			}
		}
		renderProducts(products);

		let searchInput = document.querySelector("#search-product");
		searchInput.addEventListener("input", () => {
			// let products = getProducts()
			let searchedName = searchInput.value.toLowerCase();
			let searchedProduct = products.filter((p) =>
				p.pName.toLowerCase().includes(searchedName),
			);

			renderProducts(searchedProduct);
		});

		function deleteProduct(id) {
			let products = getProducts()
			let cart = getCart()
			products = products.filter(p => p.id !== id);
			cart = cart.filter(item => item.productId !== id)
      
      saveCart(cart)
			saveProducts(products);
			renderProducts(products);
			
		}

		productsContainer.addEventListener("click", (event) => {
			if (event.target.classList.contains("delete-btn")) {
				const id = Number(event.target.dataset.id);
				const products = getProducts();
				const product = products.find((p) => p.id === id);
				console.log(product.pName);

				let confirmDelete = confirm(
					`Are you sure you want to delete  ${product.pName} ?`,
				);
				if (confirmDelete) {
					deleteProduct(id);
					confirmDelete = "yes";
				} else {
					console.log("delete concelled");
				}
			}

			if (event.target.classList.contains("edit-btn")) {
				const id = Number(event.target.dataset.id);
				window.location.href = `create-product.html?id=${id}`;
			}
		});
