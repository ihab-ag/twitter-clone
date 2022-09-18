let tweetInput = document.getElementById("tweetInput");
let tweetBtn = document.getElementById("new-tweet-btn");
let tweetPic = document.getElementById("img-input"); 
tweetBtn.addEventListener("click", e => {
    let tweet_text = tweetInput.value;
    let userid = JSON.parse(localStorage.getItem("loggedin")).userid;
    let hasimage = tweetPic.files.length >= 1;
    hasimage = hasimage === true ? 1 : 0;

    const url = "../backend/addtweet-api.php";
    if(!hasimage && tweetInput.value != ''){
        let data = {"tweet_text": tweet_text,
        "userid": userid,
        "hasimage": hasimage,
        };
        sendTweetRequest(url, data);
        //tweetInput.value = "";
    }
    else if(tweetInput.value != ''){
        const fileInput = document.getElementById("img-input");

        //fileInput.addEventListener("change", e => {
            console.log("enter");
            let file = fileInput.files[0];
            let reader = new FileReader();

            reader.addEventListener("load", () => {
                console.log(reader.result);
                let imageinbase = reader.result;
                //split to remove "data:image/png;base64,"
                let pure64base = imageinbase.split(",");
                let url = '../backend/addtweet-api.php';
                let data = {"tweet_text": tweet_text,
                            "userid": userid,
                            "hasimage": hasimage,
                            "picture_64base": pure64base[1]};
                sendTweetRequest(url, data);
            })
            reader.readAsDataURL(file);
            //tweetInput.value = "";
        //})
    }
    
})

function sendTweetRequest(url, data){
    stringyfiedData = JSON.stringify(data);
	
	fetch(url , {
        method: 'POST',
        body: new URLSearchParams(data),
    }).then(response => response.json()).then(dataResponse => {console.log(dataResponse)});
}

