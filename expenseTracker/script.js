document.addEventListener("DOMContentLoaded", () => {
    

   const expenseForm = document.getElementById("expense-form")
   const expenseName =  document.getElementById("expense-name")
   const expenseNumber = document.getElementById("expense-number")
   const expenseList =  document.getElementById("expense-list")
   const total = document.getElementById("total")
   const totalAmount = document.getElementById("total-amount")


   let Expenses = JSON.parse(localStorage.getItem("expense")) || [];
   let Total = calculateTotal();

   renderExpenses();

   expenseForm.addEventListener("submit", (e) => {
     e.preventDefault();
     const trim1 = expenseName.value.trim();
     const trim2 = parseFloat(expenseNumber.value.trim())

     if (trim1 !== "" && !isNaN(trim2) && trim2 > 0) {
           const newExpense = {
            id: Date.now(),
            name: trim1,
            amount: trim2
           }
           Expenses.push(newExpense)
           saveExpensesTOLocal()
           renderExpenses()
           updateTotal()
           
           
           
           
           expenseName.value = ""
           expenseNumber.value = ""
           

         

     }

   })



   function renderExpenses() {
    expenseList.innerHTML = ""
    Expenses.forEach((E) => {
     const li =  document.createElement("li")
     li.innerHTML = `
       ${E.name} - $${E.amount}
       <button data-id= "${E.id}">Delete</button>
     `
     expenseList.appendChild(li)
    });
   
   expenseList.addEventListener("click", (e) => {
      if(e.target.tagName === "BUTTON") {
        Expenses.forEach((list) => {
          const expId = parseInt(e.target.getAttribute("data-id"))
          Expenses = Expenses.filter(expense => expense.id !== expId)
        
          saveExpensesTOLocal()
          renderExpenses()
          updateTotal()
        })
      }
     })
  
  
    }


   

    
   



   function calculateTotal() {
      return Expenses.reduce((sum, expense) => sum + expense.amount, 0);
       

   }

    function updateTotal() {
     Total = calculateTotal()
     totalAmount.textContent = Total.toFixed(2)  
   }
   
    function saveExpensesTOLocal() {
   localStorage.setItem("expense", JSON.stringify(Expenses))
}
})

