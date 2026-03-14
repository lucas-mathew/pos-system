  export function getProducts(){
    return  JSON.parse(localStorage.getItem("products"))|| []
  }

  export function saveProducts(products){
    localStorage.setItem("products", JSON.stringify(products))
  }


 export function getCart(){
	return JSON.parse(localStorage.getItem("cart")) || []
 }

 export function saveCart(cart){
	 localStorage.setItem("cart", JSON.stringify(cart))
 }