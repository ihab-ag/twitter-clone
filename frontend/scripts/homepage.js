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
    const tweetBoxBg=document.querySelector('.tweet-box__bg');
    const newTweetBtn=document.getElementById('new-tweet-btn');
    const tweetInput =document.getElementById('tweetInput');
    const wordCounter=document.getElementById('wordCounter');
    const userImgLbl=document.getElementById('userImgLbl');
    const nameInput=document.getElementById('nameInput');
    const bioInput=document.getElementById('bioInput');
    const userImg=document.getElementById('user-img');
    const editBtn=document.getElementById('editBtn');
    const applyBtn=document.getElementById('applyBtn');
    const navMenu=document.querySelector('.nav-bar .nav-card');
    const logout=document.getElementById('logout');
    // functions
    // show home
    function showHome() {
        profile.style.display = "none";
        home.style.display = "block";
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
    // show tweetbox
    const showTweetBox=()=>{
        tweetBoxBg.style.display='block';
    }
    // hide tweetbox
    const hideTweetBox=()=>{
        tweetBoxBg.style.display='none';
    }
    // edit functionality
    const onEdit=()=>{
        // toggle buttons display
        editBtn.style.display='none';
        applyBtn.style.display='block';
        // enable inputs
        userImg.disabled=false;
        nameInput.disabled=false;
        bioInput.disabled=false;
        // style
        userImgLbl.style.borderBottom="solid #179cf0";
        nameInput.style.borderBottom="solid 1px #179cf0";
        bioInput.style.borderBottom="solid 1px #179cf0";
    }
    // after apply events
    const onApply=()=>{
        // toggle buttons display
        editBtn.style.display='block';
        applyBtn.style.display='none';
        // enable inputs
        userImg.disabled=true;
        nameInput.disabled=true;
        bioInput.disabled=true;
        // style
        userImgLbl.style.borderBottom="solid #ffffff";
        nameInput.style.borderBottom="none";
        bioInput.style.borderBottom="none";
    }
    // events
    homeNav.onclick=()=>showHome();
    profileNav.onclick=()=>showProfile();
    searchNav.onclick=()=>showSearch();
    body.onresize=()=>showMain();
    tweetBtn.onclick=()=>showTweetBox();
    home.onclick=()=>showTweetBox();
    tweetBoxBg.onclick=(e)=>{
        if(e.target.className=="tweet-box__bg")
        hideTweetBox();
    }
    // count words
    tweetInput.onkeyup=()=>{
        wordCounter.innerText=tweetInput.value.length;
        tweetInput.style.color= tweetInput.value.length>280?'red':"#666666";
    }
    editBtn.onclick=()=>onEdit();
    applyBtn.onclick=()=>onApply();
    // toggle logout menu
    navMenu.onclick=()=>logout.style.display= logout.style.display==='block'?'none':'block';
    //newTweetBtn.onclick=()=>location.reload();
}