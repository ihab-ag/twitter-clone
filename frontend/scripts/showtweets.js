const tweetsContainer = document.getElementById("main");
const api_url = "../backend/select_tweets-api.php";
let userid = JSON.parse(localStorage.getItem("loggedin")).userid;

function sendPostRequest(url, data){
    stringyfiedData = JSON.stringify(data);
	console.log();
	fetch(url , {
        method: 'POST',
        body: new URLSearchParams(data),
    }).then(response => response.json()).then(dataResponse => {displayTweets(dataResponse);});
}

sendPostRequest(api_url, {"userid" : 1});

function displayTweets(dataResponse){
    for(let i = 0; i < dataResponse.length; i++){
        console.log(dataResponse[i].tweet_id);
        //Tweet containers
        let tweetContainer = document.createElement('div');
        tweetContainer.classList.add("tweet", "container");
        tweetsContainer.appendChild(tweetContainer);

        let tweetContent = document.createElement('div');
        tweetContent.classList.add("tweet__content");
        tweetContainer.appendChild(tweetContent);

        //Picture
        let tweetPicture = document.createElement('div');
        tweetPicture.classList.add("profile-icon");
        tweetContent.appendChild(tweetPicture);

        let tweetImg = document.createElement('img');
        tweetImg.setAttribute("src", 'content/profile-mock.jpg');
        tweetPicture.appendChild(tweetImg);

        //Tweet text
        let tweetText = document.createElement('div');
        tweetText.classList.add("tweet__texts");
        tweetContent.appendChild(tweetText);

        let tweetN = document.createElement('p');
        tweetN.classList.add("medium", "bold");
        tweetN.innerHTML = dataResponse[i].username;
        tweetText.appendChild(tweetN);

        let tweetP = document.createElement('p');
        tweetP.classList.add("medium", "normal");
        tweetP.innerHTML = dataResponse[i].tweet_text;
        tweetText.appendChild(tweetP);

        let likeIcon = document.createElement('div');
        likeIcon.classList.add("like-icon");
        let likeImage = document.createElement('img');
        likeImage.setAttribute('src', 'content/like.png');
        likeIcon.appendChild(likeImage);
        tweetContainer.appendChild(likeIcon);


        

        /*
    <div class="tweet container" id="tweet-container">
        <div class="tweet__content">
            <div class="profile-icon">
                <img src="content/profile-mock.jpg" alt="profile img">
            </div>
            <div class="tweet__texts">
                <p class="bold medium">Name <span class="small light light-grey">@usernsme</span></p>
                <p class="medium normal">Something randomnbeing said on twitter</p>
            </div>
        </div>
        <div class="like-icon">
            <img src="content/like.png" alt="like">
        </div>
    </div>
    */
    }
}