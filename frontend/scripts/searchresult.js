const username_search = document.getElementById("username-search");
const search_results_div = document.getElementById("search-results");
const loggedinUsername = JSON.parse(localStorage.getItem("loggedin")).username;
const searchMainContainer = document.getElementById("search-results");
userid = JSON.parse(localStorage.getItem("loggedin")).userid;
console.log(userid);

document.addEventListener("keyup", function(event) {
    if (event.key === 'Enter' && username_search.value != '') {
        sendSearchRequest('../backend/search-api.php', {username: username_search.value,
                                                        'userid': userid});
    }
});

function sendSearchRequest(url, data){
    stringyfiedData = JSON.stringify(data);
	console.log();
	fetch(url , {
        method: 'POST',
        body: new URLSearchParams(data),
    }).then(response => response.json()).then(dataResponse => {checkUser(dataResponse);});
}

function checkUser(data){
    console.log(data);
    if(data[0]){
        console.log("found", data[0].username);
        InstantiateProfileCard(data);
    }
    else{
        search_results_div.innerHTML = "User not found";
    }
}

function InstantiateProfileCard(data){
    search_results_div.innerHTML = "";
    let toFollowUserID = data[0].id;
    let toFollowUserName = data[0].username;

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
    stack.classList.add("stack");
    navCard.appendChild(stack);
    let p1 = document.createElement('p');
    p1.classList.add("large", "bold");
    p1.innerHTML = data[0].fname + data[0].lname;
    let p2 = document.createElement('p');
    p2.classList.add("medium", "light", "grey");
    p2.innerHTML = "@" + toFollowUserName;
    stack.appendChild(p1);
    stack.appendChild(p2);

    //Button
    let stackBtn = document.createElement('div');
    stackBtn.classList.add("stack");
    profileFollow.appendChild(stackBtn);

    //CHECK IF FOLLOWING USER
    let urlF = "../backend/checkfollowing-api.php";
    let dataF = {'userid': userid, 'tofollowuserid': toFollowUserID};
    //checkFollowingRequest(urlF, dataF, stackBtn, toFollowUserID, toFollowUserName);
    console.log(data);
    let urlB = "../backend/checkblocking-api.php";
    let dataB = {'userid': userid, 'toblockuserid': toFollowUserID};
    checkBlockRequest(urlB, dataB, stackBtn, toFollowUserID, toFollowUserName);
    console.log(data);

    //Bio
    let bio = document.createElement("p");
    bio.classList.add("medium", "light", "grey");
    bio.innerHTML = "bio lmao";
    searchResult.appendChild(bio);
}

function checkFollowingRequest(url, data, stackBtn, toFollowUserID, toFollowUserName, isblocking){
    stringyfiedData = JSON.stringify(data);
	fetch(url , {
        method: 'POST',
        body: new URLSearchParams(data),
    }).then(response => response.json()).then(dataResponse => 
        {
            let url = "../backend/follow-api.php";
            ////////////////////////////////
            
            ////////////////////////////////
            if(dataResponse.following){
                let unfollowbtn = document.createElement("button");
                unfollowbtn.classList.add("btn");
                unfollowbtn.innerHTML = "Unfollow";
                stackBtn.appendChild(unfollowbtn);
                unfollowbtn.addEventListener("click", e => {
                    let data = {"userid": userid, "tofollowuserid": toFollowUserID, "todo": "unfollow"};
                    followUser(url, data);
                    setTimeout(function(){sendSearchRequest('../backend/search-api.php', {"username": toFollowUserName,
                                                                                            "userid": userid});}, 100);
                })            
            }
            else if(!isblocking){
                let followbtn = document.createElement("button");
                followbtn.classList.add("btn");
                followbtn.innerHTML = "Follow";
                stackBtn.appendChild(followbtn);
                followbtn.addEventListener("click", e => {
                    let data = {"userid": userid, "tofollowuserid": toFollowUserID, "todo": "follow"};
                    followUser(url, data);
                    setTimeout(function(){sendSearchRequest('../backend/search-api.php', {"username": toFollowUserName,
                                                                                            "userid": userid});}, 100);
                })
            }
});
}

function followUser(url, data){
    stringyfiedData = JSON.stringify(data);
    fetch(url , {
        method: 'POST',
        body: new URLSearchParams(data),
    }).then(response => response.json()).then(dataResponse => {console.log(dataResponse);});
}

//Same process with block button
function checkBlockRequest(url, data, stackBtn, toBlockUserID, toBlockUsername){
    stringyfiedData = JSON.stringify(data);
	fetch(url , {
        method: 'POST',
        body: new URLSearchParams(data),
    }).then(response => response.json()).then(dataResponse => 
        {
            let url = "../backend/blockuser-api.php";
            if(dataResponse.blocking){
                ////////////////////////////////////////
                let urlF = "../backend/checkfollowing-api.php";
                let dataF = {'userid': userid, 'tofollowuserid': toBlockUserID};
                checkFollowingRequest(urlF, dataF, stackBtn, toBlockUserID, toBlockUsername, true);
                ////////////////////////////////////////
                let unblockbtn = document.createElement("button");
                unblockbtn.classList.add("btn", "btn-red");
                unblockbtn.innerHTML = "Unblock";
                stackBtn.appendChild(unblockbtn);
                unblockbtn.addEventListener("click", e => {
                    let data = {"userid": userid, "toblockuserid": toBlockUserID, "todo": "unblock"};
                    blockUser(url, data);
                    setTimeout(function(){sendSearchRequest('../backend/search-api.php', {"username": toBlockUsername,
                                                                                            "userid": userid});}, 100);
                })            
            }
            else{
                ////////////////////////////////////////
                let urlF = "../backend/checkfollowing-api.php";
                let dataF = {'userid': userid, 'tofollowuserid': toBlockUserID};
                checkFollowingRequest(urlF, dataF, stackBtn, toBlockUserID, toBlockUsername, false);
                ////////////////////////////////////////
                console.log("not blocking");
                let blockbtn = document.createElement("button");
                blockbtn.classList.add("btn", "btn-red");
                blockbtn.innerHTML = "Block";
                stackBtn.appendChild(blockbtn);
                blockbtn.addEventListener("click", e => {
                    let data = {"userid": userid, "toblockuserid": toBlockUserID, "todo": "block"};
                    blockUser(url, data);
                    setTimeout(function(){sendSearchRequest('../backend/search-api.php', {"username": toBlockUsername,
                                                                                          "userid": userid});}, 100);
                })
            }
    });
}

function blockUser(url, data){
    stringyfiedData = JSON.stringify(data);
    fetch(url , {
        method: 'POST',
        body: new URLSearchParams(data),
    }).then(response => response.json()).then(dataResponse => {console.log(dataResponse);});
}

