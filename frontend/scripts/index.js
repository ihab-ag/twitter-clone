//Containers
let login_container = document.getElementById("login-popup");
let signup_container = document.getElementById("signup-popup");
//Login form buttons
let login_btn_popup = document.getElementById("login-btn-popup");
let close_btn = document.getElementById("close-btn");
//Signup form buttons
let signup_btn_popup = document.getElementById("signup-btn-popup");
let close_signup_btn_popup = document.getElementById("close-btn-signup");

login_btn_popup.addEventListener("click", loginPopup);
close_btn.addEventListener("click", closeLoginPopup);
signup_btn_popup.addEventListener("click", e => {signup_container.classList.remove("hidden")})
close_signup_btn_popup.addEventListener("click", e => {signup_container.classList.add("hidden")})

function loginPopup(){
    login_container.classList.remove("hidden");
}

function closeLoginPopup(){
    login_container.classList.add("hidden");
}