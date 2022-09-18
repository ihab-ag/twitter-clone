const tweetsContainer = document.getElementById("tweets-section");
const profileNav = document.getElementById('profileNav');
const homeNav = document.getElementById('homeNav');
let api_url = "../backend/select_tweets-api.php";


if(!localStorage.getItem("loggedin")){
    window.location.href = "./index.html";
    
}else{
    main();
}


profileNav.addEventListener("click", function(){main(true)});
homeNav.addEventListener("click", function(){main(false)});


function main(isProfile){
    if(isProfile){
        api_url = '../backend/getusertweets-api.php';
    }
    else{
        api_url = "../backend/select_tweets-api.php";
    }
    let userid = JSON.parse(localStorage.getItem("loggedin")).userid;
    function sendTweetsRequest(url, data){
        stringyfiedData = JSON.stringify(data);
        console.log();
        fetch(url , {
            method: 'POST',
            body: new URLSearchParams(data),
        }).then(response => response.json()).then(dataResponse => {displayTweets(dataResponse);});
    }
    
    sendTweetsRequest(api_url, {"userid" : userid});
    
    let tweetsShown = [];
    
    function displayTweets(dataResponse){
        tweetsContainer.innerHTML = "";
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
            if(dataResponse[i].profile_pic != 'none'){
                tweetImg.setAttribute("src", dataResponse[i].profile_pic);
            }
            else
            {
                tweetImg.setAttribute("src", "content/profile-mock.jpg");
            }
            
            tweetPicture.appendChild(tweetImg);
    
            //Tweet text
            let tweetText = document.createElement('div');
            tweetText.classList.add("tweet__texts");
            tweetContent.appendChild(tweetText);
    
            let tweetN = document.createElement('p');
            tweetN.classList.add("medium", "bold");
            tweetN.innerHTML =  dataResponse[i].fname + " ";
            tweetText.appendChild(tweetN);

            let tweetUser = document.createElement('span');
            tweetUser.classList.add("small", "light", "light-grey");
            tweetUser.innerHTML = "@" + dataResponse[i].username;
            tweetN.appendChild(tweetUser);
    
            let tweetP = document.createElement('p');
            tweetP.classList.add("medium", "normal");
            tweetP.innerHTML = dataResponse[i].tweet_text;
            tweetText.appendChild(tweetP);
    
            //Image
            if(dataResponse[i].picture_url != 'none'){
                let tweetwithImgContainer = document.createElement('div');
                tweetwithImgContainer.classList.add("tweet__withimg");
                tweetwithImgContainer.appendChild(tweetContainer);
                tweetsContainer.appendChild(tweetwithImgContainer);
    
                let tweetImgContainer = document.createElement('div');
                tweetImgContainer.classList.add("tweet-img", "container");
                tweetwithImgContainer.appendChild(tweetImgContainer);
    
                let tweetImg = document.createElement('img');
                tweetImg.setAttribute('src', dataResponse[i].picture_url);
                tweetImgContainer.appendChild(tweetImg);
            }
    
    
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
                likeImage.addEventListener("click", function(){likeTweet(tweet_id, "removelike")
                likeImage.setAttribute('src', 'content/like.png');
                likeDiv.remove();
                setTimeout(function(){sendTweetsLikeRequest(url, data, tweetContainer, tweet_id)}, 100)});
            }
            else{
                let likeDiv = document.createElement('div');
                likeDiv.classList.add("like-icon");
                let likeImage = document.createElement('img');
                likeImage.setAttribute('src', 'content/like.png');
                likeDiv.appendChild(likeImage);
                tweetContainer.appendChild(likeDiv);
                likeImage.addEventListener("click", function(){likeTweet(tweet_id, "like");
                likeImage.setAttribute('src', 'content/liked.png');
                likeDiv.remove();
                setTimeout(function(){sendTweetsLikeRequest(url, data, tweetContainer, tweet_id)}, 100)});
            }
        });
    }
    
    function likeTweet(tweet_id, todo){
        let url = "../backend/addtweetlike-api.php";
        let data = {"tweet_id": tweet_id, "userid": userid,
                    "todo": todo};
        likeRequest(url, data);
        
    }
    
    function likeRequest(url, data){
        stringyfiedData = JSON.stringify(data);
        fetch(url , {
            method: 'POST',
            body: new URLSearchParams(data),
        }).then(response => response.json()).then(dataResponse => {console.log(dataResponse);});
    }
}
