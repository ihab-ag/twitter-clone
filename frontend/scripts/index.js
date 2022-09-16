let login_container = document.getElementById("login-popup");
let login_btn_popup = document.getElementById("login-btn-popup");
let close_btn = document.getElementById("close-btn");

login_btn_popup.addEventListener("click", loginPopup);
close_btn.addEventListener("click", closeLoginPopup);

function loginPopup(){
    login_container.classList.remove("hidden");
}

function closeLoginPopup(){
    login_container.classList.add("hidden");
}