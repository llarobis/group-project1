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
//beginning of my code - LL 
 // Function to save the to-do list to local storage
 document.addEventListener('DOMContentLoaded', function () {
    const addDate = document.querySelector('#modal-date');
    const assignName = document.querySelector('#modal-name');
    const addDescription = document.querySelector('#modal-description');
    const createButton = document.getElementById('create');
    const myList = document.querySelector('#my-list');
    
    // Function to retrieve the to-do list from localStorage
    function getTodoList() {
        const storedList = localStorage.getItem('todoList');
        return storedList ? JSON.parse(storedList) : [];
    }

    // Function to save the to-do list to localStorage
    function saveTodoList(todoList) {
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }

    // Function to add a new to-do item
    function addTodoItem(name, description, date) {
        const todoList = getTodoList();
        const newItem = { name, description, date };
        todoList.push(newItem);
        saveTodoList(todoList);
        renderTodoList();
    }

    // Event listener for the Create button
    if (createButton) {
        createButton.addEventListener('click', function (event) {
            event.preventDefault();
            const date = addDate.value;
            const name = assignName.value.trim();
            const description = addDescription.value.trim();

            if (name && description && date) {
                addTodoItem(name, description, date);
                // Clear input fields after adding
                assignName.value = '';
                addDescription.value = '';
                addDate.value = '';
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Function to render the to-do list
    function renderTodoList(filterDay = null) {
        myList.innerHTML = ''; // Clear existing list

        const todoList = getTodoList();

        // Filter by day if filterDay is provided
        const filteredList = filterDay ? todoList.filter(item => {
            const itemDate = new Date(item.date);
            const dayName = itemDate.toLocaleString('en-US', { weekday: 'short' }).toLowerCase();
            return dayName === filterDay.toLowerCase();
        }) : todoList;

        // Create list items for each to-do
        filteredList.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item'); // Add Bootstrap list group item class
            listItem.innerHTML = `
                <div class="container rounded align-content-center text-center mx-auto mb-2 px-0 py-0" style="background-color: #FFD6D4;">
                    <div class="row justify-content-evenly mx-1 my-2 px-0" style="height: 48px;">
                        <strong class="col-6 align-content-center text-start mx-1 px-1 py-0">${item.name}</strong>
                        <button id="doneBtn" class="btn col text-white mx-1 px-1 py-0" style="background-color: #FF6962;">Mark Done</button>
                        <button id="editBtn" class="btn col text-white mx-1 px-1 py-0" style="background-color: #FF6962;">Edit</button>
                    </div>
                    <div class="row text-start mx-1 my-2 px-0">
                        <div class="row text-start mx-1 my-2 px-0">
                            Description Preview:
                            <br>${item.description}<br>
                        </div>
                    </div>
                </div>
            `;
            myList.appendChild(listItem);
        });

        // Update the displayed date header
        const todoDate = document.getElementById('todoDate');
        const today = new Date();
        todoDate.textContent = `To-Do List for ${today.toLocaleDateString('en-US', { weekday: 'short', month: '2-digit', day: '2-digit', year: '2-digit' })}`;
    }

    // Function to handle day button clicks
    function handleDayClick(event) {
        const dayId = event.target.id;
        const dayMap = {
            monday: 'Mon',
            tuesday: 'Tue',
            wednesday: 'Wed',
            thursday: 'Thu',
            friday: 'Fri',
            saturday: 'Sat',
            sunday: 'Sun'
        };
        const selectedDay = dayMap[dayId];
        renderTodoList(selectedDay);
    }

    // Attach event listeners to day buttons in the navbar
    const dayButtons = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    dayButtons.forEach(dayId => {
        const button = document.getElementById(dayId);
        if (button) {
            button.addEventListener('click', handleDayClick);
        }
    });

    // Initial render of the to-do list
    renderTodoList();
});

//end of my code -LL

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
