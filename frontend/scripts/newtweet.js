let tweetInput = document.getElementById("tweetInput");
let tweetBtn = document.getElementById("new-tweet-btn");

tweetBtn.addEventListener("click", e => {
    console.log(tweetInput.value);
    console.log(JSON.parse(localStorage.getItem("loggedin")).userid);
    console.log();
})


