/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const itemsPerPage = 9;
const studentList = document.querySelector('ul.student-list');

function showPage(list, page) {
    let startIndex = (page * itemsPerPage) - itemsPerPage;
    let endIndex = page * itemsPerPage;


    //Use the innerHTML property set the HTML content of the `student-list` variable you just created to an empty string. 
    studentList.innerHTML = '';

    //Loop over the `list` parameter
    for (let i = 0; i < list.length; i++) {

        //statement that checks if the current index (`i`) is greater than or equal to the `start index` variable **and** less than the `end index` variable.
        if (i >= startIndex && i < endIndex) {
            let studentData = list[i];
            //creates the display on the HTML using  template literal 
            let studentDisplay = '';
            //adds all the cards
            studentDisplay += `
                <li class="student-item cf">
                    <div class="student-details">
                        <img class="avatar" src="${studentData.picture.medium}" alt="Profile Picture">
                        <h3>${studentData.name.first} ${studentData.name.last}</h3>
                    <span class="email">${studentData.email}</span>
                    </div>
                    <div class="joined-details">
                        <span class="date">Joined ${studentData.registered.date}</span>
                    </div>
                </li>
            `;
            studentList.insertAdjacentHTML('beforeend', studentDisplay);
        }
    }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

//This function should accept a single `list` parameter
function addPagination(list) {
    //Create a variable to store the value of the number of pagination buttons needed
    const buttonsPage = Math.ceil(list.length / itemsPerPage);

    //Select the `UL` element with a class of `link-list` and assign its value to a variable.
    const linkList = document.querySelector('.link-list');
    linkList.innerHTML = '';

    //Loop over the variable for the number of pages needed that you created earlier.
    // i = 1 because i = 0 displays the number 0 at first
    for (let i = 1; i < buttonsPage; i++) {
        let buttonsDisplay = '';
        //add the buttons
        buttonsDisplay += `
            <li>
                <button type="button">${i}</button>
            </li>
        `
        linkList.insertAdjacentHTML('beforeend', buttonsDisplay)
    }
    //Select the first pagination button and give it a class name of `active`. --> [0]; 
    //use the querySelectorAll to return a list of all the elements 
    const buttons = document.querySelectorAll('button')[0];
    buttons.className = 'active';

    //Create an event listener to listen for clicks on the `link-list` variable
    linkList.addEventListener('click', (e) => {
        //check if the event is on the button
        if (e.target.tagName === 'BUTTON') {

            //remove the active class
            let removeClass = document.querySelector('.active');
            removeClass.className = '';
            //add the active class
            e.target.className = 'active';
            //create a const that shows the page number 
            let clickedNumber = e.target.textContent;
            //Call the `showPage` function passing the `list` parameter and the page number to display as arguments.
            showPage(list, clickedNumber);
        }
    });
}

/* ************ */
/* Extra Credit */
/* ************ */

//1.Add a Search Component

    //select the place were the search is going to show
    const headSearch = document.querySelector('.header');
    //create the search structure
    let searchEngine = '';
    //add to the html like in previous functions
    // NOTE: I add an id - btnSearch - to used in the next step, for more specificity
    searchEngine += `
                    <label for="search" class="student-search">
                    <span>Search by name</span>
                    <input id="search" placeholder="Search by name...">
                    <button type="button" id="btnSearch"><img src="img/icn-search.svg" alt="Search icon"></button> 
                    </label>
                    `;
    //insertAdjacentHTML method and `beforeend` 
    headSearch.insertAdjacentHTML('beforeend', searchEngine);
    //console.log(searchEngine)

    //2.Add Functionality to the Search Component

        /* Variables to reference the `input` and search `button` elements */
        const search = document.querySelector('#search');
        const submit = document.querySelector('#btnSearch');

        //console.log(search);
        //console.log(submit);

    function searchForm(searchInput, list) {
        //create a new student list based on the search matches 
        let newList = [];
        for (let i = 0; i < list.length; i++) {
            //create a string that contains the full name
            studentName = `${list[i].name.first} ${list[i].name.last}`;

            //first conditioanl to evaluate if the text content is valid and add the value to the newList
            //project warm up search
            if (studentName.toLowerCase().includes(searchInput.value.toLowerCase())) {
                newList.push(list[i])
            }
        }

//3.Add Pagination for Search Results

    //call the functions to show the values filtered
    showPage(newList, 1)
    //display the pages with the number of results
    addPagination(newList);

//4.Handle No Search Matches
    //secondConditional - if the value is 
    if (newList.length === 0) {
        const studentList = document.querySelector('.student-list');
        studentList.innerHTML = '<h2>No results found...Try again! </h2>';
        studentList.style.color = 'red';
    }
}
/* submit listener */

search.addEventListener('click', (event) => {
    event.preventDefault();

    searchForm(search, data)
    console.log('Submit button is functional!');
});

search.addEventListener('keyup', () => {
    searchForm(search, data)
    console.log('Keyup event on the Search input is functional!');
});

// Call functions
showPage(data, 1)
addPagination(data);
