const username_search = document.getElementById("username-search");
const search_results_div = document.getElementById("search-results");
const loggedinUsername = JSON.parse(localStorage.getItem("loggedin")).username;

document.addEventListener("keyup", function(event) {
    if (event.key === 'Enter' && username_search.value != '') {
        alert(username_search.value);
    }
});



