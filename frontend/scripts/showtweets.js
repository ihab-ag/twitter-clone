const tweetsContainer = document.getElementById("tweet-container");
const api_url = "../backend/select_tweets-api.php";

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
        console.log(dataResponse[i].tweet_text);
    }
}