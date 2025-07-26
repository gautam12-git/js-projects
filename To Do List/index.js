document.addEventListener("DOMContentLoaded", () => {
   const addInput = document.getElementById("Add-inpt");
const button = document.getElementById("btn");
const list = document.getElementById("to-do-list");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach((task) => renderTask(task));
   

   


button.addEventListener("click", function(){
   const taskText = addInput.value.trim()
   if (taskText === "") return;

   const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
   }
   tasks.push(newTask);
   saveTasks();
   renderTask(newTask);
   addInput.value = "";  // clear input
   console.log(tasks);
});

function renderTask(task) {
   const li = document.createElement("li")
   li.setAttribute("data-id", task.id)
if(task.completed) li.classList.add("completed")

   li.innerHTML = `<span>${task.text}</span>
   <button>Delete</bbutton>`
  li.addEventListener("click", (e) => {
if(e.target.tagName === "BUTTON") return;
task.completed = !task.completed;
li.classList.toggle("completed")
saveTasks()
  })

  li.querySelector("button").addEventListener("click", (e) => {
   e.stopPropagation()
   tasks = tasks.filter(t => t.id !== task.id)
   li.remove()
   saveTasks()
  })
   list.appendChild(li) 

   

}

function saveTasks() {
   localStorage.setItem("tasks", JSON.stringify(tasks))
}
})
