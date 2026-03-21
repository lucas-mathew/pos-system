			import { getProducts, saveProducts } from "./data/products.js";
			import { renderPage } from "./utils/aside.js";
			import { calculateTotalProducts, updateStock } from "./utils/calculations.js";
			import { addToCart,saveCart,getCart } from "./data/cart.js";

			//  Aside
			document.querySelector(".aside").innerHTML = renderPage();

			const productsContainer = document.querySelector(".products-info-container");
      const cartContainer = document.querySelector(".cart-items");
      const totalItems = document.querySelector("#total-items")

			const products = getProducts();

			function renderProducts(productsArrays) {
				let productsHTML = "";

				for (let product of productsArrays) {
					productsHTML += `
						<div class="products-container">
							<div class="product">${product.pName}</div>
							<div class="stock">
								<span>${product.pStockPerMainUnit}${product.pMainUnit}</span>
								<span>${product.pStockPerSubUnit}${product.pSubUnit}</span>
							</div>

							<div class="sales-buttons">
							<button class="sale-price-per-main-button" data-product-id="${product.id}"> ${product.pSalePricePerMain.toLocaleString("en-TZ")} /${product.pMainUnit}</button>
						  <button class="sale-price-per-sub-button">${product.pSalePricePerSub.toLocaleString("en-TZ")} /${product.pSubUnit}</button>
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
				console.log(searchedName);
				let searchedProduct = products.filter((p) =>
					p.pName.toLowerCase().includes(searchedName),
				);

				setTimeout(() => {
					renderProducts(searchedProduct);
				}, 1000);
			});
			 
			productsContainer.addEventListener("click", (event) => {
					if (event.target.classList.contains("sale-price-per-main-button")) {
						const productId = Number(event.target.dataset.productId);

						addToCart(productId);
            getTotalItems()
						renderCart()
					}
				});
				document.querySelector("#total-products").innerHTML = calculateTotalProducts();
				
		// =======================
	// RENDER CART
	// =======================
	function renderCart() {
		const cartContainer = document.querySelector(".cart-items");
		const cart = getCart();
		const products = getProducts();

		let cartHTML = "";

		cart.forEach(cartItem => {
			const product = products.find(p => p.id === cartItem.productId);

			cartHTML += `
			<div class="cart-item">
				<div class="item-title">
					<span id="item-name">${product.pName}</span>
					<button class="delete-item-button" data-product-id="${cartItem.productId}">
						delete
					</button>
				</div>

				<div class="item-inputs">
					<div class="itemQty">
						<span>Qty</span>
						<div>
							<input type="number" value="${cartItem.quantity}" class="quantity">
						</div>
					</div>

					<div class="itemPrice">
						<span>Price</span>
						<div>
							<input type="number" value="${cartItem.price}" class="price">
						</div>
					</div>

					<div class="item-discount">
						<span>Discount</span>
						<div>
							<input type="number" value="${cartItem.discount}" class="discount">
						</div>
					</div>
				</div>

				<div class="total-price-per-item">
					<span>Total price</span>
					<span class="total-price-per-item-displayer"></span>
				</div>
			</div>
			`;
		});

		
		cartContainer.innerHTML = cartHTML;
		setupCartFunctions(); 
		updateGrandTotal();
	
	}

 
	
	// REMOVE ITEM
	// =======================
	function removeFromCart(productId){
		let cart = getCart();

		cart = cart.filter(item => item.productId !== productId);

		saveCart(cart);
		renderCart();
		getTotalItems();
	}


	
	// DELETE BUTTON HANDLER
	// =======================
	document.querySelector(".cart-items").addEventListener("click", (e) => {
		if (e.target.classList.contains("delete-item-button")) {
			const productId = Number(e.target.dataset.productId);
			removeFromCart(productId);
		}
	});


	
	// TOTAL ITEMS
	// =======================
	function getTotalItems(){
		const cart = getCart();
		const totalItems = document.querySelector("#total-items");

		if (totalItems) {
			totalItems.textContent = cart.length;
		}
	}



	// CALCULATE TOTAL PRICE PER ITEM
	// =======================
	function setupCartFunctions() {
		document.querySelectorAll(".cart-item").forEach(item => {

			const qtyInput = item.querySelector(".quantity");
			const priceInput = item.querySelector(".price");
			const discountInput = item.querySelector(".discount");
			const totalDisplay = item.querySelector(".total-price-per-item-displayer");

      priceInput.value = Number(priceInput.value).toFixed(2);
			discountInput.value = Number(discountInput.value).toFixed(2);

			 function updateCart(){
				const cart = getCart();
				const productId = Number(item.querySelector(".delete-item-button").dataset.productId);
				const cartItem = cart.find(ci => ci.productId === productId);

				if(cartItem){
					cartItem.quantity = Number(qtyInput.value);
					cartItem.price = Number(priceInput.value);
					cartItem.discount = Number(discountInput.value);

					saveCart(cart);
				}
			}

			qtyInput.addEventListener("input", updateCart);
			priceInput.addEventListener("input", updateCart);
			discountInput.addEventListener("input", updateCart);
			 

			function calculateTotal() {
				const qty = Number(qtyInput.value) || 0;
				const price = Number(priceInput.value) || 0;
				const discount = Number(discountInput.value) || 0;

				const total = (qty * price) - discount;

				totalDisplay.textContent = total.toLocaleString("en-TZ");
				updateGrandTotal()
			  applyOrderDiscount()
			}

			qtyInput.addEventListener("input", calculateTotal);
			priceInput.addEventListener("input", calculateTotal);
			discountInput.addEventListener("input", calculateTotal);
      
     
			calculateTotal(); // show on load
		});
	}


	
	// INITIAL LOAD
	// =======================
	renderCart();
	getTotalItems();


	// UPDATE GRAND TOTAL
	function updateGrandTotal() {
		let grandTotal = 0;
		document.querySelectorAll(".total-price-per-item-displayer").forEach(display => {
			const total = Number(display.textContent.replace(/,/g, "")) || 0;
			grandTotal += total;
		});
    
		const orderDiscountInput = document.querySelector("#order-discount");
		const orderDiscount = Number(orderDiscountInput.value) || 0;
		grandTotal -= orderDiscount;

		document.querySelector("#cart-total").textContent = grandTotal.toLocaleString("en-TZ");
		
	}

	

//  SAVE DISCOUNT TO CART
	function saveDiscountToCart(value){
		localStorage.setItem("orderDiscount", value)
	}

	// GET DISCOUNT FROM CART
	function getDiscountFromCart(){
		return localStorage.getItem("orderDiscount") || 0;
	}

	
	function applyOrderDiscount() {
		document.querySelector("#order-discount").value = getDiscountFromCart();
		document.querySelector("#order-discount").addEventListener("input", updateGrandTotal);
		
		document.querySelector("#order-discount").addEventListener("input", (e) => {
		saveDiscountToCart(e.target.value);
			
		});
		
	}	
	applyOrderDiscount();

	// CLEAR CART
	function clearCart() {
		let confirmClear = confirm("Are you sure you want to clear the cart?");
		if (confirmClear) {
			localStorage.removeItem("cart");
			renderCart();
			getTotalItems();
		}
	}
	
	document.querySelector("#clear-cart").addEventListener("click", clearCart);

	


	