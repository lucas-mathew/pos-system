   This project is for procticing the core concepts of js like arrays of objects and so on 

	   The challenges i faced during building this POS fundametal(products page)
        //To use the edit button on two pages   (on products page and create-product page)
				   Yes the concept of window.location.href = "create-product.html?id${id}"
             and inside creat-product.js i used this:
						    new URLSearchParams(window.location.search)

								then i store productId = Number(new URLSearchParams(window.location.search).get("id"))

				Lessons
				1.Array of objects
        2.Functions
				3.localStorage
				4.Module


      