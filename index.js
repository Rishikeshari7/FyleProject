const userImg=document.querySelector("[data-userImg]");
const userKaName=document.querySelector("[data-name]");
const gitUserName=document.querySelector("[data-userName]");
const joinedDate = document.querySelector("[data-Date]");
const bio=document.querySelector("[data-bio]");
const repos=document.querySelector("[data-repos]")
const followers=document.querySelector("[data-followers]");
const following=document.querySelector("[data-following]");
const userLocation=document.querySelector("[data-location]");
const twitter=document.querySelector("[data-twitter]");
const link =document.querySelector("[data-link]");
const business=document.querySelector("[data-business]");

const allDataContainer=document.querySelector(".all-data-container");
const userFound=document.querySelector(".user-not-found");
const loaderScreen=document.querySelector(".loader-screen");

const dark=document.querySelector("#dark");
const light=document.querySelector("#light");

const searchForm=document.querySelector(".form-container");
const searchInput=document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let userName=searchInput.value;
    fetchUserData(userName);
});
async function fetchUserData(userName){
    allDataContainer.classList.remove("active");
    loaderScreen.classList.add("active");
    userFound.classList.remove("active");
    loaderScreen.classList.add("active");
    try{
        const response = await fetch (`https://api.github.com/users/${userName}`);
        const data=await response.json();
        console.log(data);
        
        if(!response.ok){
            console.log("User Doesnt't exist ");
            allDataContainer.classList.remove("active");
            userFound.classList.add("active");
    
        }
        else{
            allDataContainer.classList.add("active");
            renderUserData(data);
        }
    }
    catch(err){
        console.log("ERROR in FETCH data",err);
    }
    finally{
        loaderScreen.classList.remove("active");
    }
    
}
async function renderUserData(data){
    userImg.src=data.avatar_url;
    userKaName.innerHTML=data.name;
    gitUserName.innerHTML=`@${data.login}`;
    gitUserName.href=data.html_url;
    joinedDate.innerHTML= `Joined On: ${(new Date(data.created_at).getDate()) + "/"+ (new Date(data.created_at).getMonth())+"/"+(new Date(data.created_at).getFullYear())}`;
    bio.innerHTML=data.bio||"This Profile has no Bio";
    repos.innerHTML=data.public_repos||'0';
    followers.innerHTML=data.followers||'0';
    following.innerHTML=data.following||'0';
    userLocation.innerHTML=data.location||'Not Available';
    twitter.innerHTML=data.twitter_username||'Not Available';
    link.innerHTML=data.email||'Not Available';
    business.innerHTML=data.company||'Not Available';
}

// ----------------------------day&night------------------------------------
dark.addEventListener("click",darkThemeHandler);
light.addEventListener("click",lightThemeHandler);

function darkThemeHandler(){
    light.classList.add("active");
    dark.classList.add("inactive");
}

function lightThemeHandler(){
    light.classList.remove("active");
    dark.classList.remove("inactive");
}