// VARIABLES
const xhr = new XMLHttpRequest(),
      baseUrl = 'http://dev-tufts-interactive-design.pantheonsite.io/api/projects?_format=json',
      header = document.getElementById('header'),
      searchInput = document.getElementById('searchInput'),
      searchButton = document.getElementById('searchButton'),
      resultContainer = document.getElementById('projects');
      
let searchInputValue = '',
    searchCount = 0,
    isSearchNew = '';


// FUNCTIONS

// API Call
function callThatAPI(searchParams, isSearchNew) {
  xhr.open('GET', `${baseUrl}`)
  xhr.send();
  xhr.onload = handleSuccess;
  xhr.onerror = handleError;
}

// API Success
function handleSuccess() {
  searchCount = searchCount + 1;
  var response = JSON.parse(xhr.responseText);
  loadResults(response);
  if (searchCount === 1) {
    header.classList.remove('header--full-screen');
  }
}

// API Error
function handleError() {
  console.log('oops');
  resetResults();
}

// Load Results

function loadResults(response){
  console.log(response);
  console.log(response.length);
  var hits = response;
  for(let i = 0; i < hits.length; i++) { 
    let projectTitle =  hits[i].title,
        projectSubtitle =  hits[i].field_project_subtitle,
        projectBanner =  hits[i].field_project_banner,
        projectUrl =  hits[i].field_project_link,
        projectDescription =  hits[i].field_project_description,
        teamName = hits[i].title_1,
        teamLocation = hits[i].field_team_location;
    resultContainer.innerHTML += 
     `<article class="project-card slideInUp">
        <div class="project-card__media">
          <img src="${projectBanner}">
        </div>
        <div class="project-card__content">
          <h2 class="project-card__title">${projectTitle}</h2>
          <h3 class="project-card__subtitle">${projectSubtitle}</h3>
          <a href=">${projectUrl}">${projectUrl}</a>
          <div>${projectDescription}</div>
          <div>${teamName}</div>
          <div>${teamLocation}</div>
        </div>
      </article>`;
   }
}

// Remove loader icon
function hideLoader (){
}

// Reset results

function resetResults() {
  resultContainer.innerHTML = '';
}

// Check if new search term

function checkSearchTerm (newSearchInput){
  if(searchInputValue === newSearchInput){
    return isSearchNew = false;
  } else {
    return isSearchNew = true;
  }
}

// Autorun testing if you don't want to render a search
function autoRun(searchValue) {
  callThatAPI(searchValue);
}

autoRun('tufts');

// EVENT LISTENER

// Submit message if user hits enter on input
searchInput.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchButton.click();
  }
});


// Search Button Click
searchButton.addEventListener('click', function() {
  event.preventDefault();
  checkSearchTerm(searchInput.value);
  resetResults();
  callThatAPI(searchInput.value, isSearchNew);
  searchInputValue = searchInput.value;
  return searchInputValue;
});

