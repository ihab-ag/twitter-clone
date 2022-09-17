const username_search = document.getElementById("username-search");
const search_results_div = document.getElementById("search-results");
const loggedinUsername = JSON.parse(localStorage.getItem("loggedin")).username;

document.addEventListener("keyup", function(event) {
    if (event.key === 'Enter' && username_search.value != '') {
        sendPostRequest('../backend/search-api.php', {username: username_search.value});
    }
});

function sendPostRequest(url, data){
    stringyfiedData = JSON.stringify(data);
	console.log();
	fetch(url , {
        method: 'POST',
        body: new URLSearchParams(data),
    }).then(response => response.json()).then(dataResponse => {console.log(dataResponse);});
}



