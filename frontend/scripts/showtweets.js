const tweetsContainer = document.getElementById("tweet-container");
const api_url = "../backend/select_tweets-api.php";

function sendPostRequest(url, data){
    stringyfiedData = JSON.stringify(data);
	console.log();
	fetch(url , {
        method: 'POST',
        body: new URLSearchParams(data),
    }).then(response => response.json()).then(dataResponse => {console.log(dataResponse);});
}

sendPostRequest(api_url, {"userid" : 1});