/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

const itemsPerPage = 9;

function showPage(list, page) {
    let startIndex = (page * itemsPerPage) - itemsPerPage;
    let endIndex = page * itemsPerPage;

    const studentList = document.querySelector('ul.student-list');

    studentList.innerHTML = '';

    for (let i = 0; i < list.length; i++) {
        if (i >= startIndex && i < endIndex) {
            let studentData = list[i];
            let studentDisplay = '';
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

/* Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons */


function addPagination(list) {
    
    let buttonsPage = Math.ceil(list.length / 9);
    const linkList = document.querySelector('.link-list');
    linkList.innerHTML = '';

    for (let i = 1; i <= buttonsPage; i++) {
        let buttonsDisplay = '';
        buttonsDisplay += `
            <li>
                <button type="button">${i}</button>
            </li>
        `;
        linkList.insertAdjacentHTML('beforeend', buttonsDisplay);
    }

    let buttons = document.querySelectorAll('button')[0];
      buttons.className = 'active';
 

    //Create an event listener to listen for clicks on the `link-list` variable
    linkList.addEventListener('click', (e) => {
       
        if (e.target.tagName === 'BUTTON') {
           document.querySelector('.active').classList.remove('active');
           let clickedNumber = e.target;
            clickedNumber.className = 'active';
            showPage(list, clickedNumber.textContent);
        }
    });
}
addPagination(data);
/* ************ */
/* Extra Credit */
/* ************ */

//1.Add a Search Component

const headSearch = document.querySelector('.header');
let searchEngine = '';
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


//2.Add Functionality to the Search Component

/* Variables to reference the `input` and search `button` elements */
const search = document.querySelector('#search');
const submit = document.querySelector('#btnSearch');



function searchForm(searchInput, list) {
    let newList = [];
    for (let i = 0; i < list.length; i++) {
        studentName = `${list[i].name.first} ${list[i].name.last}`;
        if (studentName.toLowerCase().includes(searchInput.value.toLowerCase())) {
            newList.push(list[i])
        }
    }

    //3.Add Pagination for Search Results

    
    showPage(newList, 1)
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

