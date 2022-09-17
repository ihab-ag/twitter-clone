window.onload=()=>{
    // elements html
    const homeNav = document.getElementById('homeNav');
    const searchNav = document.getElementById('searchNav');
    const profileNav = document.getElementById('profileNav');
    const home= document.querySelector('.home');
    const profile= document.querySelector('.profile');
    const searchBar= document.querySelector('.search-bar');  
    const main= document.querySelector('.main');  
    const body=document.getElementsByTagName('body')[0];
    const tweetBtn=document.getElementById('tweetBtn');

    // functions
    // show home
    const showHome=()=>{
        profile.style.display="none";
        home.style.display="block";
        showMain();
    }
    // show profile
    const showProfile=()=>{
        home.style.display="none";
        profile.style.display="block";
        showMain();
    }
    // show main
    const showMain=()=>{
        const smallScreen = window.matchMedia("(max-width: 650px)");
        if(smallScreen.matches){
            searchBar.style.display='none';
            main.style.display='flex';
        }
        else{
            searchBar.style.display='flex';
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
    searchNav.onclick=()=>showSearch();
    body.onresize=()=>showMain();
}