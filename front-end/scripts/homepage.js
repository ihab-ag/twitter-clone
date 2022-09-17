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
    // show profile
    const showProfile=()=>{
        home.style.display="none";
        profile.style.display="block";
    }
    // main
    homeNav.onclick=()=>showHome();
    profileNav.onclick=()=>showProfile();
}