
document.addEventListener('DOMContentLoaded', function () {
    const assignName = document.querySelector('#modal-name');
    const addDescription = document.querySelector('#modal-description');
    const createButton = document.getElementById('create');
    const addDate = document.querySelector ('#modal-date');

    createButton.addEventListener('click', function (event) {
        event.preventDefault();
        
        // Get the values from the input fields
        const name = assignName.value;
        const description = addDescription.value;
        const date = addDate.value;

        // Save values to localStorage
        localStorage.setItem('modal-name', name);
        localStorage.setItem('modal-description', description);
        localStorage.setItem('modal-date', date);

        renderLastRegistered(); // Render the last registered values
        
    });




    function renderLastRegistered() {
        // Retrieve values from localStorage
        const name = localStorage.getItem('modal-name');
        const description = localStorage.getItem('modal-description');
        const date = localStorage.getItem('modal-date');
        
        // Log the values to console
        console.log('Name:', name);
        console.log('Description:', description);
        console.log('Date', date);
    }

    const readLocalStorage = function () {
        // Directly retrieve the string data without parsing
        const name = localStorage.getItem('modal-name');
        console.log('Name from readLocalStorage:', name);
    };
    readLocalStorage();
});

