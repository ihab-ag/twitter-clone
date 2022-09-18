//Containers
const login_container = document.getElementById("login-popup");
const signup_container = document.getElementById("signup-popup");

//Login form buttons
const login_btn_popup = document.getElementById("login-btn-popup");
const close_btn = document.getElementById("close-btn");
const login_btn = document.getElementById("login-btn");

//Signup form buttons
const signup_btn_popup = document.getElementById("signup-btn-popup");
const close_signup_btn_popup = document.getElementById("close-btn-signup");
const signup_btn = document.getElementById("signup-btn");

//Document values login-from
const username = document.getElementById("username");
const password = document.getElementById("password");
const error_login = document.getElementById("error-login");

//Document values signup-from
const username_signup = document.getElementById("username-signup");
const password_signup = document.getElementById("password-signup");
const fname_signup = document.getElementById("fname-signup");
const lname_signup = document.getElementById("lname-signup");
const email_signup = document.getElementById("email-signup");
const signupErrorDiv = document.getElementById("error-signup");

//Other documents


//Check if user logged in
function LogUserIn(){
    if(localStorage.getItem("loggedin")){
        window.location.href = "./homepage.html";
    }
}
LogUserIn();


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
    }).then(response => response.json()).then(dataResponse => {checkLogin(dataResponse);});
}

function checkLogin(data){
    error_login.classList.remove("hidden");
    error_login.classList.remove("red-div");
    error_login.classList.add("green-div");
    error_login.innerHTML = "Logged in!";
	if(data.success == true){
        let id = data['user'].id;
        let username = data.user.username;
        let password = data.user.password;
		var userinfo = {
			userid: id,
            username: username,
			password: password,
		};
		let json = JSON.stringify(userinfo);
        console.log(json);
		localStorage.setItem("loggedin", json);
	}
    else{
        error_login.classList.remove("hidden");
        error_login.classList.remove("green-div");
        error_login.classList.add("red-div");
        error_login.innerHTML = "Incorrect creditials!";
    }
	if(localStorage.getItem("loggedin")){
		setInterval(LogUserIn, 500);
	}
}

//Signup functionality
function signupUser(){
    let error_message = "";
    if(!validateUsername(username_signup.value, 7)){
        error_message += "Username is too short! (Minimum 7 characaters) <br>"
    }
    if(!validateUsername(fname_signup.value, 3)){
        error_message += "First name is too short! (Minimum 3 characaters) <br>"
    }
    if(!validateUsername(lname_signup.value, 3)){
        error_message += "Last name is too short! (Minimum 3 characaters) <br>"
    }
    if(!validateUsername(password_signup.value, 8)){
        error_message += "Passowrd is too weak! (Minimum 8 characaters) <br>"
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
                                                              "password": password_signup.value,
                                                              "fname": fname_signup.value,
                                                              "lname": lname_signup.value});
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
    console.log(usernamefound, emailfound, added);
    if(!usernamefound && !emailfound){
        error_message = "Account created!"
        signupErrorDiv.classList.add("green-div");
        signupErrorDiv.classList.remove("hidden");
        signupErrorDiv.classList.remove("red-div");
        signupErrorDiv.innerHTML = error_message;
        setTimeout(() => {
            window.location.href = "./index.html";
        }, 500);
    }
    else{
        if(usernamefound){
            error_message += "Username already taken! <br>";
        }
        if(emailfound){
            error_message += "Email already taken! <br>";
        }
        signupErrorDiv.classList.add("red-div");
        signupErrorDiv.classList.remove("hidden");
        signupErrorDiv.classList.remove("green-div");
        signupErrorDiv.innerHTML = error_message;
    }
}

//Validation functions
function validateUsername(username, length) {
    if(username.length < length){
        return false;
    }
    return true;
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}