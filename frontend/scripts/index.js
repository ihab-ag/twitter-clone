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
let signup_btn = document.getElementById("signup-btn");
//Document values login-from
let username = document.getElementById("username");
let password = document.getElementById("password");

//Document values signup-from
let username_signup = document.getElementById("username-signup");
let password_signup = document.getElementById("password-signup");
let email_signup = document.getElementById("email-signup");
const signupErrorDiv = document.getElementById("error-signup");

//Other documents


//Check if user logged in
if(localStorage.getItem("loggedin")){
    //window.location.href = "./twitter-homepage/";
}

login_btn_popup.addEventListener("click", loginPopup);
close_btn.addEventListener("click", closeLoginPopup);
login_btn.addEventListener("click", loginUser);
signup_btn_popup.addEventListener("click", e => {signup_container.classList.remove("hidden")})
close_signup_btn_popup.addEventListener("click", e => {signup_container.classList.add("hidden")})
signup_btn.addEventListener("click", signupUser);

function loginPopup(){
    login_container.classList.remove("hidden");
}

function closeLoginPopup(){
    login_container.classList.add("hidden");
}

//Login functionality
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

function checkLogin(data, username, password){
	console.log(data.success);
	if(data.success == true){
		var userinfo = {
			username: username,
			password: password,
		};
		let json = JSON.stringify(userinfo);
		localStorage.setItem("loggedin", json);
	}
	if(localStorage.getItem("loggedin")){
		console.log("logged in");
	}
}

//Signup functionality
function signupUser(){
    let error_message = "";
    if(!validateUsername(username_signup.value)){
        error_message += "Name is too short! (Minimum 7 characaters) <br>"
    }
    if(!validateEmail(email_signup.value)){
        error_message += "Email is incorrect! <br>";
    }
    if(error_message != ''){
        signupErrorDiv.classList.add("red-div");
        signupErrorDiv.classList.remove("hidden");
        signupErrorDiv.innerHTML = error_message;
    }
    else{
        signupErrorDiv.innerHTML = "";
        sendRegisterRequest("../backend/userexists-api.php", {"username": username_signup.value,
                                                              "email": email_signup.value,
                                                              "password": password_signup.value});
    }
    //console.log(error_message);
}

function sendRegisterRequest(url, data){
    stringyfiedData = JSON.stringify(data);
	console.log();
	fetch(url , {
        method: 'POST',
        body: new URLSearchParams(data),
    }).then(response => response.json()).then(dataResponse => {registerResponse(dataResponse.usernamefound, dataResponse.emailfound, dataResponse.useradded)});
}

function registerResponse(usernamefound, emailfound, added){
    let error_message = '';
    if(!usernamefound && !emailfound){
        error_message = "Account created!"
        signupErrorDiv.classList.add("green-div");
        signupErrorDiv.classList.remove("hidden");
        signupErrorDiv.classList.remove("red-div");
        signupErrorDiv.innerHTML = error_message;
    }
    else{
        if(usernamefound){
            error_message += "Username already taken! + <br>";
        }
        if(emailfound){
            error_message += "Email already taken! + <br>";
        }
        signupErrorDiv.classList.add("red-div");
        signupErrorDiv.classList.remove("hidden");
        signupErrorDiv.classList.remove("green-div");
        signupErrorDiv.innerHTML = error_message;
    }
}

//Validation functions
function validateUsername(username) {
    if(username.length < 7){
        return false;
    }
    return true;
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}