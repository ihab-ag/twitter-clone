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
        //let likeDiv = document.createElement('div');
        //likeDiv.classList.add("like-icon");
        //likeDiv.setAttribute("id", i);
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
            setTimeout(function(){sendTweetsLikeRequest(url, data, tweetContainer, tweet_id)},1000 )});
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
            setTimeout(function(){sendTweetsLikeRequest(url, data, tweetContainer, tweet_id)},1000 )});
        }
    });
}

/*async function sendTweetsLikeRequest(url, data, tweetContainer, tweet_id){
    stringyfiedData = JSON.stringify(data);
	const responser = await fetch(url , {
        method: 'POST',
        body: new URLSearchParams(data),
    });
    const data3 = await responser.json();
    two(data3, tweetContainer, tweet_id);

}*/

/*function two(dataResponse, tweetContainer, tweet_id){
    console.log(dataResponse.liked);
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
            sendTweetsLikeRequest(url, data, tweetContainer, tweet_id); });
        }
        else if(!dataResponse.liked){
            let likeDiv = document.createElement('div');
            likeDiv.classList.add("like-icon");
            let likeImage = document.createElement('img');
            likeImage.setAttribute('src', 'content/like.png');
            likeDiv.appendChild(likeImage);
            tweetContainer.appendChild(likeDiv);
            likeImage.addEventListener("click", function(){likeTweet(tweet_id, "like");
            likeImage.setAttribute('src', 'content/liked.png');
            likeDiv.remove();
            sendTweetsLikeRequest(url, data, tweetContainer, tweet_id); });
        }
}*/

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
    //const data2 = await response.json();
    //console.log(data2);
    

}


async function test(url, data){
    try {
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, config)
        //const json = await response.json()
        if (response.ok) {
            //return json
            return response
        } else {
            //
        }
    } catch (error) {
            //
    }
}

function likeTweet2(){
    let url = "../backend/addtweetlike-api.php";
    let data = {"tweet_id": 2, "userid": 1,
                "todo": "removelike"};
    console.log(test(url, data));
    
}
//likeTweet2();


const asyncPostCall = async () => {
    try {
        const response = await fetch('../backend/addtweetlike-api.php', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
           },
           body: JSON.stringify({"tweet_id": 3, "userid": 1,
           "todo": "removelike"})
         });
         const data = await response.json();
      // enter you logic when the fetch is successful
         console.log(data);
       } catch(error) {
     // enter your logic for when there is an error (ex. error toast)

          console.log(error)
         } 
    }

asyncPostCall()