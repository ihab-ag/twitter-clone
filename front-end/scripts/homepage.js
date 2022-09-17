window.onload=()=>{
    // elements html
    const homeNav = document.getElementById('homeNav');
    const searchNav = document.getElementById('searchNav');
    const profileNav = document.getElementById('profileNav');
    const home= document.querySelector('.home');
    const profile= document.querySelector('.profile');

    // functions
    // show home
    const showHome=()=>{
        profile.style.display="none";
        home.style.display="flex";
    }
}