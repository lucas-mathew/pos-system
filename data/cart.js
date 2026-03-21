	import { getProducts,saveProducts } from "../data/products.js"
	export function getCart(){
		return JSON.parse(localStorage.getItem("cart")) || []
	}

	export function saveCart(cart){
		localStorage.setItem("cart", JSON.stringify(cart))
	}


	export function addToCart(productId){
			const cart = getCart()
			productId = Number(productId)
			let matchingItem = cart.find(cartItem => cartItem.productId === productId)
			let products = getProducts()
			let product = products.find(p => p.id === productId)	
			
			if(matchingItem){
				matchingItem.quantity ++;

			}else{
				cart.push({
					productId,
					quantity:1,
					discount:0,
					price:product.pSalePricePerMain
				})
			}

			// console.log(cart)
			
			saveCart(cart)
		
		}

		