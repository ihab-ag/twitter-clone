const tweetsContainer = document.getElementById("main");
const api_url = "../backend/select_tweets-api.php";
let userid = JSON.parse(localStorage.getItem("loggedin")).userid;

function sendTweetsRequest(url, data){
    stringyfiedData = JSON.stringify(data);
	console.log();
	fetch(url , {
        method: 'POST',
        body: new URLSearchParams(data),
    }).then(response => response.json()).then(dataResponse => {displayTweets(dataResponse);});
}

sendTweetsRequest(api_url, {"userid" : 1});

let tweetsShown = [];

function displayTweets(dataResponse){
    for(let i = 0; i < dataResponse.length; i++){
        tweetsShown.push(dataResponse[i]);
        let tweet_id = dataResponse[i].tweet_id;
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

        //Like Icon
        url = '../backend/checklike-api.php';
        data = {"userid": userid, "tweet_id": tweet_id};
        sendTweetsLikeRequest(url, data, tweetContainer, tweet_id);
    }
}

function sendTweetsLikeRequest(url, data, tweetContainer, tweet_id){
    stringyfiedData = JSON.stringify(data);
	console.log();
	fetch(url , {
        method: 'POST',
        body: new URLSearchParams(data),
    }).then(response => response.json()).then(dataResponse => {
        if(dataResponse.liked){
            let likeDiv = document.createElement('div');
            likeDiv.classList.add("like-icon");
            let likeImage = document.createElement('img');
            likeImage.setAttribute('src', 'content/liked.png');
            likeDiv.appendChild(likeImage);
            tweetContainer.appendChild(likeDiv);
            //likeDiv.addEventListener("click", function(){likeTweet(tweet_id, likeDiv)});
        }
        else{
            let likeDiv = document.createElement('div');
            likeDiv.classList.add("like-icon");
            let likeImage = document.createElement('img');
            likeImage.setAttribute('src', 'content/like.png');
            likeDiv.appendChild(likeImage);
            tweetContainer.appendChild(likeDiv);
            likeDiv.addEventListener("click", function(){likeTweet(tweet_id, likeImage);
            likeImage.setAttribute('src', 'content/liked.png'); });
        }
    });
}

function likeTweet(tweet_id, likeImage){
    let url = "../backend/addtweetlike-api.php";
    let data = {"tweet_id": tweet_id, "userid": userid};
    likeRequest(url, data);
    
}

function likeRequest(url, data){
    stringyfiedData = JSON.stringify(data);
	console.log();
	fetch(url , {
        method: 'POST',
        body: new URLSearchParams(data),
    }).then(response => response.json()).then(dataResponse => {console.log(dataResponse);});

}