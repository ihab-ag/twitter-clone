//Containers
let login_container = document.getElementById("login-popup");
let signup_container = document.getElementById("signup-popup");
//Login form buttons
let login_btn_popup = document.getElementById("login-btn-popup");
let close_btn = document.getElementById("close-btn");
let login_btn = document.getElementById("login-btn");
//Signup form buttons
let signup_btn_popup = document.getElementById("signup-btn-popup");
let close_signup_btn_popup = document.getElementById("close-btn-signup");
//Document values
let username = document.getElementById("username");
let password = document.getElementById("password");


login_btn_popup.addEventListener("click", loginPopup);
close_btn.addEventListener("click", closeLoginPopup);
login_btn.addEventListener("click", loginUser);
signup_btn_popup.addEventListener("click", e => {signup_container.classList.remove("hidden")})
close_signup_btn_popup.addEventListener("click", e => {signup_container.classList.add("hidden")})

function loginPopup(){
    login_container.classList.remove("hidden");
}

function closeLoginPopup(){
    login_container.classList.add("hidden");
}

function loginUser(){
    let data = {"username": username.value,
                "password": password.value};
    url = "../backend/checkuser-api.php";
    sendLoginRequest(url, data);
}

function sendLoginRequest(url, data){
    stringyfiedData = JSON.stringify(data);
	console.log();
	fetch(url , {
        method: 'POST',
        body: new URLSearchParams(data),
    }).then(response => response.json()).then(dataResponse => {checkLogin(dataResponse, data.username, data.password);});
}