const userImgLbl = document.getElementById('user-img');
const nameInput = document.getElementById('nameInput');
const bioInput = document.getElementById('bioInput');
let userid = JSON.parse(localStorage.getItem("loggedin")).userid;
console.log(userImgLbl, nameInput, bioInput);

const applyBtn = document.getElementById("applyBtn");

//Reset
let url = "../backend/getuser-api.php";
let data = {"userid": userid};
sendUserRequest(url, data);

applyBtn.addEventListener("click", e => {
    let name = nameInput.value;
    let bio = bioInput.value;
    let hasimage = userImgLbl.files.length >= 1;
    hasimage = hasimage === true ? 1 : 0;

    url = "../backend/edituser-api.php";
    if(!hasimage && name.value != ''){
        let data = {"userid": userid,
                    "fname": name,
                    "bio": bio
        };
        sendTweetRequest(url, data);
    }
    else if(name.value != ''){
        const fileInput = document.getElementById("user-img");

        //fileInput.addEventListener("change", e => {
            console.log("enter");
            let file = fileInput.files[0];
            let reader = new FileReader();

            reader.addEventListener("load", () => {
                console.log(reader.result);
                let imageinbase = reader.result;
                //split to remove "data:image/png;base64,"
                let pure64base = imageinbase.split(",");
                let url = '../backend/edituser-api.php';
                let data = {"userid": userid,
                            "fname": name,
                            "bio": bio,
                            "profile_pic": pure64base[1]};
                            
                sendEditRequest(url, data);
            })
            reader.readAsDataURL(file);
            //tweetInput.value = "";
        //})
    }
    
})

function sendEditRequest(url, data){
    stringyfiedData = JSON.stringify(data);
	
	fetch(url , {
        method: 'POST',
        body: new URLSearchParams(data),
    }).then(response => response.json()).then(dataResponse => {console.log(dataResponse)});
}

function sendUserRequest(url, data){
    stringyfiedData = JSON.stringify(data);
	
	fetch(url , {
        method: 'POST',
        body: new URLSearchParams(data),
    }).then(response => response.json()).then(dataResponse => {
        let userImg = document.getElementById('user-profile-pic'); 
        nameInput.value = dataResponse[0].fname;
        if(dataResponse[0].profile_pic != 'none'){
            userImg.setAttribute('src', dataResponse[0].profile_pic);
        }
        bioInput.value = dataResponse[0].bio;
    });
}



