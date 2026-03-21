		import { getProducts, saveProducts } from "../data/products.js";


		export function calculateProfit(stock, salePrice, buyPrice) {
			stock = Number(stock);
			salePrice = Number(salePrice);
			buyPrice = Number(buyPrice);

			return (stock * salePrice - stock * buyPrice).toLocaleString();
		}

		export function calculateCapital(buyPrice, stock) {
			buyPrice = Number(buyPrice);
			stock = Number(stock);

			return (buyPrice * stock).toLocaleString();
		}

		export function calculateTotalProducts() {
			const products = getProducts();
			return Number(products.length);
		}

		export function calculateTotaCapital() {
			const products = getProducts();
			let total = 0;

			products.forEach((product) => {
				total +=
					Number(product.pBuyPricePerMain) * Number(product.pStockPerMainUnit);
			});

			return total.toLocaleString();
		}

		export function calculateTotalProfit() {
			const products = getProducts();
			let total = 0;

			for (let product of products) {
				total +=
					Number(product.pSalePricePerMain) * Number(product.pStockPerMainUnit) -
					Number(product.pBuyPricePerMain) * Number(product.pStockPerMainUnit);
			}

			return total.toLocaleString();
		}

		export function calculateTotalSales() {
			let products = getProducts();
			let total = 0;

			for (let product of products) {
				total +=
					Number(product.pSalePricePerMain) * Number(product.pStockPerMainUnit);
			}

			return total.toLocaleString();
		}

		// Logic to Update stock during selling products
		export function updateStock(productId, quantitySold) {
			const products = getProducts();

			const updateProduct = products.map((product) => {
				if (product.id === productId) {
					return {
						...product,
						pStockPerMainUnit: product.pStockPerMainUnit - Number(quantitySold),
					};
				}

				return product;
			});
			saveProducts(updateProduct);
		}
