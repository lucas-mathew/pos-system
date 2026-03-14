import { getProducts,saveProducts} from "../data/storage.js";

 //  window.addEventListener("storage", (event) => {
    //     if(event.key === "products"){
    //         renderProducts()
    //     }
    //  })

    const  products = getProducts()
    export function renderProducts(productArray){
        let productsHTML = "";
        
        productArray.forEach((product, index) => {
            // productsHTML += `<div>${product.name} </div>`
        })
        console.log(productsHTML)
        calculateTotalStock()
    }



    let lastProduct = [];

    setInterval( () => {
        const products = getProducts()

        if(JSON.stringify(products) !== JSON.stringify(lastProduct)){
        renderProducts(products)
      
        lastProduct = products
        }

        
    },1000)

   function calculateTotalStock(){
    const products = getProducts()
     let total = 0

    for(let product of products){
        total += Number(product.stock)

    }

    console.log(total.toLocaleString("en-US"))
   }


     function addProduct(
        
       ){
    
        }
