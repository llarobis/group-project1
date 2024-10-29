

// const submitButton = document.getElementById('submit');
//const span = document.getElementsByClassName('close')[0];

//function popupWindow() {
 //   window.alert('Good Job!');
 //   console.log('just testing');
//}

// Add event listener to the submit button
//submitButton.addEventListener('click', function() {
    // Call the popupWindow function here
  //  popupWindow();
   // console.log('just testing');
//});
// SEPARATE BUTTON 

document.addEventListener('DOMContentLoaded', function () {
    const assignName = document.querySelector('#modal-name');
    const addDescription = document.querySelector('#modal-description');
    const createButton = document.getElementById('btn-text-white1');
    const addDate = document.querySelector ('')

    createButton.addEventListener('click', function (event) {
        event.preventDefault();
        
        // Get the values from the input fields
        const name = assignName.value;
        const description = addDescription.value;

        // Save values to localStorage
        localStorage.setItem('modal-name', name);
        localStorage.setItem('modal-description', description);

        renderLastRegistered(); // Render the last registered values
        
    });

    readLocalStorage();


    function renderLastRegistered() {
        // Retrieve values from localStorage
        const name = localStorage.getItem('modal-name');
        const description = localStorage.getItem('modal-description');
        
        // Log the values to console
        console.log('Name:', name);
        console.log('Description:', description);
    }

    const readLocalStorage = function () {
        // Directly retrieve the string data without parsing
        const name = localStorage.getItem('modal-name');
        console.log('Name from readLocalStorage:', name);
    };
});

