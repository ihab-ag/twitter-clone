const username_search = document.getElementById("username-search");
const search_results_div = document.getElementById("search-results");
const loggedinUsername = JSON.parse(localStorage.getItem("loggedin")).username;
const searchMainContainer = document.getElementById("search-results");

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
    }).then(response => response.json()).then(dataResponse => {checkUser(dataResponse);});
}

function checkUser(data){
    if(data[0].username){
        console.log("found", data[0].username);
        InstantiateProfileCard(data);
    }
    else{
        search_results_div.innerHTML = "User not found";
    }
}

function InstantiateProfileCard(data){
    //Tweet containers
    let searchResult = document.createElement('div');
    searchResult.classList.add("search-result");
    searchMainContainer.appendChild(searchResult);

    let profileFollow = document.createElement('div');
    profileFollow.classList.add("profile-follow");
    searchResult.appendChild(profileFollow);

    let navCard = document.createElement('div');
    navCard.classList.add("nav-card");
    profileFollow.appendChild(navCard);

    //ProfileIcon
    let profileIcon = document.createElement('div');
    profileIcon.classList.add("profile-icon");
    navCard.appendChild(profileIcon);
    let image = document.createElement('img');
    image.setAttribute('src', "content/profile-mock.jpg");
    image.setAttribute('alt', "profile");
    profileIcon.appendChild(image);


    //Stack
    let stack = document.createElement('div');
    navCard.classList.add("stack");
    navCard.appendChild(stack);
    let p1 = document.createElement('p');
    p1.classList.add("large", "bold");
    p1.innerHTML = data[0].fname + data[0].lname;
    let p2 = document.createElement('p');
    p2.classList.add("medium", "light", "grey");
    stack.appendChild(p1);
    stack.appendChild(p2);

    //Button

    /*
    <div class="search-result">
        <div class="profile-follow">
            <div class="nav-card">
                <div class="profile-icon">
                    <img src="content/profile-mock.jpg" alt="profile">
                </div>
                <div class="stack">
                    <p class="large bold">Name</p>
                    <p class="medium light grey">@username</p>
                </div>
            </div>
            <button class="btn">Follow</button>
        </div>
        <p class="medium light-grey light">this is a user bio</p>
    </div>


    */
}


