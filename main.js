   // Retrieve to-do items from local storage or initialize with an empty array
   let todoItems = JSON.parse(localStorage.getItem("todoItems")) || [];

   // Motivational messages for completion
   const messages = [
       "Great!!! Now, keep going!!!",
       "You're COOKING!!!",
       "Proud of you, you're Awesome!!!",
       "If superman existed, you'd be the one!",
       "Your enemies are getting jealous.",
       "Mama ain't raise no punk!!!",
       "Atta boiii!",
       "Yeah I see you my dude, yeah you goin places. Don't forget about us little people!",
       "Oh you think you a hot shot now...getting things done left and right."

   ];

   // Function to display Date
   function displayDate() {
        let date = new Date()
        date = date.toString().split(" ")
        document.querySelector("#date").innerHTML =  date[1] + " " + date[2] + " " + date[3]
   }

   window.onload = function() {
    displayDate()
   }

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
           completeBtn.innerText = "Done";
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
       //const randomMessage = messages[Math.floor(Math.random() * messages.length)];
       //alert(randomMessage);
       
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
   function saveToLocalStorage() {
       localStorage.setItem("todoItems", JSON.stringify(todoItems));
   }

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
   //document.getElementById("prevBtn").addEventListener("click", () => {
    //   alert("Go to previous week (functionality not implemented)");
  // });

   //document.getElementById("nextBtn").addEventListener("click", () => {
   //    alert("Go to next week (functionality not implemented)");
 //  });

   // Initial render
   renderTodoList();

   
 
 // Initial setup: set current week starting from today
let currentDate = new Date();

// Function to render the week range based on the current date
function renderWeek() {
    const weekDisplay = document.getElementById("weekLabel");

    // Get the start and end dates of the current week
    let startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Set to Sunday

    let endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to Saturday

    // Format the dates as "MM/DD" for display
    const options = { month: '2-digit', day: '2-digit' };
    weekDisplay.textContent = `${startOfWeek.toLocaleDateString(undefined, options)} - ${endOfWeek.toLocaleDateString(undefined, options)}`;
}

// Event listener for the "Next" button
document.getElementById("nextBtn").addEventListener("click", () => {
    // Move forward by 7 days
    currentDate.setDate(currentDate.getDate() + 7);
    renderWeek();
});

// Event listener for the "Prev" button
document.getElementById("prevBtn").addEventListener("click", () => {
    // Move back by 7 days
    currentDate.setDate(currentDate.getDate() - 7);
    renderWeek();
});

// Initial render of the current week
renderWeek();