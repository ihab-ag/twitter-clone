let tweetInput = document.getElementById("tweetInput");
let tweetBtn = document.getElementById("new-tweet-btn");
let tweetPic = document.getElementById("img-input"); 
tweetBtn.addEventListener("click", e => {
    let tweet_text = tweetInput.value;
    let userid = JSON.parse(localStorage.getItem("loggedin")).userid;
    let hasimage = tweetPic.files.length >= 1;

    console.log(tweet_text, userid, hasimage);
})


