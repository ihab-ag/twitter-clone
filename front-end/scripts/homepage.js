window.onload=()=>{
    // elements html
    const homeNav = document.getElementById('homeNav');
    const searchNav = document.getElementById('searchNav');
    const profileNav = document.getElementById('profileNav');
    const home= document.querySelector('.home');
    const profile= document.querySelector('.profile');
    const searchBar= document.querySelector('.search-bar');  
    const main= document.querySelector('.main');  

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
    // show main
    const showMain=()=>{
        const smallScreen = window.matchMedia("(max-width: 650px)");
        if(smallScreen){
            searchBar.style.display='none';
            main.style.display='block';
        }
    }
    // show search
    const showSearch=()=>{
        searchBar.style.display='flex';
        main.style.display='none';
    }
    // main
    homeNav.onclick=()=>showHome();
    profileNav.onclick=()=>showProfile();
    
}