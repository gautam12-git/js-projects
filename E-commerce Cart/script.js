document.addEventListener('DOMContentLoaded', () => {
  
   const products = [
    {id: 1, name: "Product 1", price: 20.44, removeId: 4},
    {id: 2, name: "Product 2", price: 19.44, removeId: 5},
    {id: 3, name: "Product 3", price: 21, removeId: 6}
   ]

    const productList = document.getElementById("product-list")
   const cartItems = document.getElementById("cart-items")
   const emptyCart = document.getElementById("empty-cart")
   const totalPrice = document.getElementById("total-price")
   const checkoutBtn = document.getElementById("checkout-btn")
   const cartTotal = document.getElementById("cart-total")


   const cartList = JSON.parse(localStorage.getItem("cartList")) || [];
   saveItems();


   products.forEach((product) => {
    const productDiv = document.createElement("div")
    productDiv.classList.add("product")
    productDiv.innerHTML = `
    <span> ${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Add To Cart</button>`
    productList.appendChild(productDiv);
   });

  
   productList.addEventListener("click", (e) => {
      if( e.target.tagName === "BUTTON"){
      
    const productId = parseInt(e.target.getAttribute("data-id"))
   const Items = products.find(p => p.id === productId)
   cartList.push(Items);
   saveItems();
   renderCartList();
  

   }
   })

   function renderCartList() {
      cartItems.innerHTML = "";
     let total = 0;

      cartList.forEach((I) => {
         const cartDiv = document.createElement("div")
         cartDiv.innerHTML = `
        <span class = "cart-div">${I.name} -  $${I.price.toFixed(2)}</span>
        <button cart-id = "${I.removeId}"> Remove Item</button>
        `
         cartItems.appendChild(cartDiv);
        total += I.price;
        
        emptyCart.classList.add("hidden")
        cartTotal.classList.remove("hidden")
        
      
      

      cartDiv.addEventListener("click", (e) => {
         if (e.target.tagName === 'BUTTON'){
          const cartId = parseInt( e.target.getAttribute("cart-id"))
         const remId = cartList.findIndex(p => p.removeId === cartId)
         
         if(remId !== -1){
         cartList.splice(remId, 1)
         }
         saveItems();
      
         renderCartList();
        
          
            
         }
      })

      })
        
         totalPrice.innerHTML = `$${total.toFixed(2)}`

   }

  
function saveItems() {
         const saveInLocal = localStorage.setItem("carrtList", JSON.stringify(cartList));
         }

        
  


checkoutBtn.addEventListener("click", () => {
   alert("Checkout successfull")
})
// loadItems();

})