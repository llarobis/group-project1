 // Retrieve to-do items from local storage or initialize with an empty array
 let todoItems = JSON.parse(localStorage.getItem("todoItems")) || [];

 // Motivational messages for completion
 const messages = [
     "Great!!! Now, keep going!!!",
     "You're COOKING!!!",
     "Proud of you, you're Awesome!!!",
     "If superman existed, you'd be the one.",
     "Your enemies are getting jealous.",
     "Mama ain't raise no punk!!!",
     "Atta boiii!",
     "Yeah I see you my dude, yeah you goin places. Don't forget about us little people!",
     "Oh you think you a hot shot now...getting things done left and right."
 ];

 // Function to render the To-Do List
 function renderTodoList() {
     const todoContainer = document.getElementById("todoContainer");
     todoContainer.innerHTML = ""; // Clear existing items
     todoItems.forEach((item, index) => {
         const todoDiv = document.createElement("div");
         todoDiv.className = "todo-item d-flex justify-content-between";

         const todoText = document.createElement("span");
         todoText.innerText = item;
         todoText.className = "flex-grow-1";

         // Complete button
         const completeBtn = document.createElement("button");
         completeBtn.className = "btn btn-success btn-sm";
         completeBtn.innerText = "Complete";
         completeBtn.onclick = () => completeTask(index);

         // Edit button
         const editBtn = document.createElement("button");
         editBtn.className = "btn btn-warning btn-sm ml-2";
         editBtn.innerText = "Edit";
         editBtn.onclick = () => editTodoItem(index);

         const buttonGroup = document.createElement("div");
         buttonGroup.className = "btn-group btn-group-sm";
         buttonGroup.appendChild(completeBtn);
         buttonGroup.appendChild(editBtn);

         todoDiv.appendChild(todoText);
         todoDiv.appendChild(buttonGroup);
         todoContainer.appendChild(todoDiv);
     });
 }

 // Function to mark a to-do item as complete and delete it from the list
 function completeTask(index) {
     // Remove the task from the list
     todoItems.splice(index, 1);

     // Show a random motivational message
    // const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    // alert(randomMessage);


    //voice-over random motivational message
     const randomIndex = Math.floor(Math.random() * messages.length);
     const message = messages[randomIndex];
 
     const synth = window.speechSynthesis;
     const utterance = new SpeechSynthesisUtterance(message);

     utterance.pitch = 1;
     utterance.rate = 0.4;
     utterance.volume = 1;
 
     synth.speak(utterance);
 

     // Save updated list to local storage and re-render the list
     saveToLocalStorage();
     renderTodoList();
 }

 // Function to edit a to-do item
 function editTodoItem(index) {
     const newItem = prompt("Edit To-Do item:", todoItems[index]);
     if (newItem !== null) {
         todoItems[index] = newItem;
         saveToLocalStorage(); // Save updated to-do list to local storage
         renderTodoList();
     }
 }

 // Function to save the to-do list to local storage
 

document.addEventListener('DOMContentLoaded', function () {
    const assignName = document.querySelector('#modal-name');
    const addDescription = document.querySelector('#modal-description');
    const createButton = document.getElementById('create');
    const addDate = document.querySelector ('#modal-date');
    const modal = document.querySelector ('#my-modal');


if (createButton) {
    createButton.addEventListener('click', function (event) {
        event.preventDefault();
        
       
        const name = assignName.value;
        const description = addDescription.value;
        const date = addDate.value;

    
        localStorage.setItem('modal-name', name);
        localStorage.setItem('modal-description', description);
        localStorage.setItem('modal-date', date);

       

        renderLastRegistered(); 
        
    });
}



    function renderLastRegistered() {
        const name = localStorage.getItem('modal-name');
        const description = localStorage.getItem('modal-description');
        const date = localStorage.getItem('modal-date');

    
        assignName.textContent = name;
        addDescription.textContent = description;
        addDate.textContent = date;
        
    
        console.log('Name:', name);
        console.log('Description:', description);
        console.log('Date', date);
    }

    const readLocalStorage = function () {
        const name = localStorage.getItem('modal-name');
        console.log('Name from readLocalStorage:', name);
    };
    readLocalStorage();
});


 // Event Listener for "Create New To-Do Item" Button
 document.getElementById("createTodoBtn").addEventListener("click", () => {
     const newItem = prompt("Enter new To-Do item:");
     if (newItem) {
         todoItems.push(newItem);
         saveToLocalStorage(); // Save updated list to local storage
         renderTodoList();
     }
 });

 // Event Listeners for Prev/Next Buttons (for example purposes)
 document.getElementById("prevBtn").addEventListener("click", () => {
     alert("Go to previous week (functionality not implemented)");
 });

 document.getElementById("nextBtn").addEventListener("click", () => {
     alert("Go to next week (functionality not implemented)");
 });

 // Initial render
 renderTodoList();
