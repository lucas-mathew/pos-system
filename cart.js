		import {
			getProducts,
			saveProducts,
			getCart,
			saveCart,
		} from "./data/storage.js";
		import { renderPage } from "./aside.js";

		//  Aside
		document.querySelector(".aside").innerHTML = renderPage();

		const productsContainer = document.querySelector(".products-info-container");

		const products = getProducts();

		function renderProducts(productsArrays) {
			let productsHTML = "";

			for (let product of productsArrays) {
				productsHTML += `
							<div class="products-container">
						    <div class="product">${product.pName}</div>
								<div class="stock">
									<span>${product.pStockPerMainUnit}${product.pMainUnit}</span>
									<span>${product.pStockPerMainUnit}${product.pMainUnit}</span>
								</div>

								<div class="sales-buttons">
								<button class="sale-price-per-main-button" data-product-id="${product.id}"> ${product.pSalePricePerMain.toLocaleString("en-TZ")} /${product.pMainUnit}</button>
							 <button class="sale-price-per-sub-button">${product.pSalePricePerSub.toLocaleString("en-TZ")} /${product.pSubUnit}</button>
								</div>

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

			setTimeout( () => {
				renderProducts(searchedProduct);
			},1000)
		});
		


		const cart = getCart()
		document.querySelectorAll(".sale-price-per-main-button")
		  .forEach(button => {
				button.addEventListener("click", (event) => {
				  let productId = Number(event.target.dataset.productId)
          const products = getProducts()
					const product = products.find(p => p.id === productId)
					console.log(product.pName)

					 let matchingItem;
       
					  cart.forEach(item => {
							if(productId === item.productId){
								matchingItem = item
							}
						})

						if(matchingItem){
							matchingItem.quantity ++
						}else{
							cart.push( {
							quantity:1,
							productId:productId,
              productName:product.pName
							})
						}

						let cartQuantity = 0;

						cart.forEach(cartItem => {
							cartQuantity += cartItem.quantity;
						})

						console.log(cartQuantity)
						console.log(cart.length)
					
          console.log(cart)
					saveCart(cart)
				})
			})