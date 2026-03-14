		import { getProducts, saveProducts } from "./data/storage.js"
		import { renderPage } from "./aside.js"

		document.querySelector(".create-product-aside").innerHTML = renderPage();

		const productName = document.querySelector("#product-name");
		const mainUnit = document.querySelector("#main-unit");
		const subUnit = document.querySelector("#sub-unit");
		const conversionRate = document.querySelector("#conversion-rate");
		const stockPerMainUnit = document.querySelector("#stock-per-main-unit");
		const stockPerSubUnit = document.querySelector("#stock-per-sub-unit");
		const stockAlert = document.querySelector("#stock-alert");
		const buyPricePerMain = document.querySelector("#buy-price-per-main-unit");
		const buyPricePerSub = document.querySelector("#buy-price-per-sub-unit");
		const salePricePerMain = document.querySelector("#sale-price-per-main-unit");
		const salePricePerSub = document.querySelector("#sale-price-per-sub-unit");
		const saveButton = document.querySelector("#save-button");

		const params = new URLSearchParams(window.location.search);
		const productId = Number(params.get("id"));

		const products = getProducts();
		const product = products.find((item) => {
			return item.id === productId;
		});

		if (product) {
			productName.value = product.pName;
			mainUnit.value = product.pMainUnit;
			conversionRate.value = product.pConversionRate;
			stockPerMainUnit.value = product.pStockPerMainUnit;
			buyPricePerMain.value = product.pBuyPricePerMain;
			salePricePerMain.value = product.pSalePricePerMain;
			stockAlert.value = product.pStockAlert;
		}

		function addProduct() {
			let pName = productName.value;
			let pMainUnit = mainUnit.value;
			let pSubUnit = subUnit.value;
			let pConversionRate = conversionRate.value;
			let pStockPerMainUnit = stockPerMainUnit.value;
			let pStockPerSubUnit = stockPerSubUnit.value;
			let pStockAlert = stockAlert.value;
			let pBuyPricePerMain = buyPricePerMain.value;
			let pBuyPricePerSub = buyPricePerSub.value;
			let pSalePricePerMain = salePricePerMain.value;
			let pSalePricePerSub = salePricePerSub.value;
			let id = Date.now();
			const products = getProducts();

			if (
				productName.value.trim() === "" ||
				mainUnit.value.trim() === "" ||
				subUnit.value.trim() === "" ||
				conversionRate.value.trim() === "" ||
				stockPerMainUnit.value.trim() === "" ||
				stockPerSubUnit.value === "" ||
				stockAlert.value.trim() === "" ||
				buyPricePerMain.value.trim() === "" ||
				buyPricePerSub.value.trim() === "" ||
				salePricePerMain.value.trim() === "" ||
				salePricePerSub.value.trim() === ""
			) {
				alert("fill all fields");
				return;
			}
			if (productId) {
				let product = products.find((p) => p.id == productId);
				if (product) {
					product.pName = productName.value;
					product.mainUnit = mainUnit.value;
					product.pName = productName.value;
					product.pMainUnit = mainUnit.value;
					product.pSubUnit = subUnit.value;
					product.pConversionRate = conversionRate.value;
					product.pStockPerMainUnit = stockPerMainUnit.value;
					product.pStockPerSubUnit = stockPerSubUnit.value;
					product.pStockAlert = stockAlert.value;
					product.pBuyPricePerMain = buyPricePerMain.value;
					product.pBuyPricePerSub = buyPricePerSub.value;
					product.pSalePricePerMain = salePricePerMain.value;
					product.pSalePricePerSub = salePricePerSub.value;
				}
			} else {
				if (products.some((p) => p.pName.toLowerCase() === pName.toLowerCase())) {
					productName.value = window.prompt(
						"Product with this name already exist!",
					);
					return;
				}
				products.push({
					pName,
					pMainUnit,
					pSubUnit,
					pConversionRate,
					pStockPerMainUnit,
					pStockPerSubUnit,
					pStockAlert,
					pBuyPricePerMain: Number(pBuyPricePerMain),
					pBuyPricePerSub: Number(pBuyPricePerSub),
					pSalePricePerMain: Number(pSalePricePerMain),
					pSalePricePerSub: Number(pSalePricePerSub),
					id: id,
				});
			}

			saveProducts(products);
			productName.value = "";
			mainUnit.value = "";
			subUnit.value = "";
			conversionRate.value = "";
			stockPerMainUnit.value = "";
			stockPerSubUnit.value = "";
			stockAlert.value = "";
			buyPricePerMain.value = "";
			buyPricePerSub.value = "";
			salePricePerMain.value = "";
			salePricePerSub.value = "";
			console.log(products[products.length - 1]);
		}

		saveButton.addEventListener("click", () => {
			addProduct();
		});
