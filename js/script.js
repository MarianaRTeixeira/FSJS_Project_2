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
    const buttonsPage = Math.ceil(list.length / itemsPerPage);
 
    const linkList = document.querySelector('.link-list');
    linkList.innerHTML = '';

    for (let i = 1; i <= buttonsPage; i++) {
        let buttonsDisplay = '';

        buttonsDisplay += `
            <li>
                <button type="button">${i}</button>
            </li>
        `
        linkList.insertAdjacentHTML('beforeend', buttonsDisplay)
    }
    
    const buttons = document.querySelectorAll('button')[1];
    buttons.className += "active";

    //Create an event listener to listen for clicks on the `link-list` variable

    linkList.addEventListener('click', (e) => {
        
        if (e.target.tagName === 'BUTTON') {
            let removeClass = document.querySelector('.active');
            removeClass.className = '';
            e.target.className = 'active';
            let clickedNumber = e.target.textContent;
            showPage(list, clickedNumber);
        }
    });
}

/* ************ */
/* Extra Credit */
/* ************ */

//1.Add a Search Component

    //select the place were the search is going to show
    //create the search structure
    //add to the html like in previous functions
    // NOTE: I add an id - btnSearch - to used in the next step, for more specificity

    const headSearch = document.querySelector('.header');

    let searchEngine = '';
    searchEngine += `
                    <label for="search" class="student-search">
                    <span>Search by name</span>
                    <input id="search" placeholder="Search by name...">
                    <button type="button" id="btnSearch"><img src="img/icn-search.svg" alt="Search icon"></button> 
                    </label>
                    `;
   
    headSearch.insertAdjacentHTML('beforeend', searchEngine);
    //console.log(searchEngine)

    //2.Add Functionality to the Search Component
        const search = document.querySelector('#search');
        const submit = document.querySelector('#btnSearch');

        //console.log(search);
        //console.log(submit);

    function searchForm(searchInput, list) {
        //create a new student list based on the search matches 
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
