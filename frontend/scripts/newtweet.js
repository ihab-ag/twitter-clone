let tweetInput = document.getElementById("tweetInput");
let tweetBtn = document.getElementById("new-tweet-btn");
let tweetPic = document.getElementById("img-input"); 
tweetBtn.addEventListener("click", e => {
    let tweet_text = tweetInput.value;
    let userid = JSON.parse(localStorage.getItem("loggedin")).userid;
    let hasimage = tweetPic.files.length >= 1;
    hasimage = hasimage === true ? 1 : 0;
    console.log(tweet_text, userid, hasimage);

    const url = "../backend/addtweet-api.php";
    let data = {"tweet_text": tweet_text,
                "userid": userid,
                "hasimage": hasimage};
    sendTweetRequest(url, data);
    
})

function sendTweetRequest(url, data){
    stringyfiedData = JSON.stringify(data);
	console.log();
	fetch(url , {
        method: 'POST',
        body: new URLSearchParams(data),
    }).then(response => response.json()).then(dataResponse => {console.log(dataResponse)});
}
