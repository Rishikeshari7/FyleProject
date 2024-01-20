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
const spinner=document.querySelector(".spinner")

const repoContainer=document.querySelector(".repo-container");
let allRepoDiv=[];
let repoNames=[];
// ---------------------------------------color Changing-------------------------------------
const dark=document.querySelector("#dark");
const light=document.querySelector("#light");
const bodyEle=document.body;
const formInput=document.querySelector(".form-input");
const userDataContainer=document.querySelector(".user-data-container");
const userDataValue=document.querySelectorAll(".user-data-value");
const socialImg=document.querySelectorAll(".social-img");

const searchForm=document.querySelector(".form-container");
const searchInput=document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let userName=searchInput.value;
    fetchUserData(userName);
    fetchRepoData(userName);
});
async function fetchUserData(userName){
    allRepoDiv.length=0;
    repoNames.length=0; 

    repoContainer.classList.remove("active");
    allDataContainer.classList.remove("active");
    loaderScreen.classList.add("active");
    userFound.classList.remove("active");
    loaderScreen.classList.add("active");
    try{
        const response = await fetch (`https://api.github.com/users/${userName}`);
        const data=await response.json();
        // console.log(data);
        
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
        spinner.classList.add("active");
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
    bodyEle.style.backgroundColor='#141D2F';
    formInput.style.backgroundColor='#1E2A47';
    formInput.style.color='#fff';
    allDataContainer.style.backgroundColor='#1E2A47';
    userDataContainer.style.backgroundColor='#141D2F';
    bodyEle.style.color='#fff';

    // repoDiv.style.backgroundColor=#1E2A47
    allRepoDiv.forEach((ele)=>{
        ele.style.backgroundColor='#1E2A47'
    })
    repoNames.forEach((ele)=>{
        ele.style.color='#fff'
    })

    userDataValue.forEach((ele) =>{
        ele.style.color="#ffffff"
    });
    socialImg.forEach((ele) => {
        ele.classList.add("active");
    });
}

function lightThemeHandler(){
    light.classList.remove("active");
    dark.classList.remove("inactive");
    bodyEle.style.backgroundColor='#f6f8ff';
    formInput.style.backgroundColor='#fefefe';
    formInput.style.color='#4b6a9b';
    allDataContainer.style.backgroundColor='#fefefe';
    userDataContainer.style.backgroundColor='#f6f8ff';
    bodyEle.style.color='#4b6a9b';

    allRepoDiv.forEach((ele)=>{
        ele.style.backgroundColor='#fefefe'
    })
    repoNames.forEach((ele)=>{
        ele.style.color='#4b6a9b'
    })

    userDataValue.forEach((ele) =>{
        ele.style.color="#2b3442"
    });
    socialImg.forEach((ele) => {
        ele.classList.remove("active");
    });
}

// ----------------------------------------repo--------------------------------------
async function fetchRepoData(userName){
    
    repoContainer.classList.remove("active");
    try{
        const repoResponse = await fetch(`https://api.github.com/users/${userName}/repos`);
        const repoData= await repoResponse.json();  //arry of repos hai
        repoContainer.innerHTML = ''
        console.log(repoData);
        for(const repo of repoData){
            try{
                const repoLangResponse = await fetch(`https://api.github.com/repos/${userName}/${repo.name}/languages`);
                const repoLangData= await repoLangResponse.json();
                // console.log(repoLangData)
                const repoDiv=document.createElement("div");  //repo div

                const repoName=document.createElement("p");
                repoName.classList.add("repo-name");
                repoName.innerHTML=` ${repo.name}`;
                repoDiv.appendChild(repoName);
                repoNames.push(repoName);

                repoDiv.classList.add("repoDiv");               //repo class name
                repoContainer.appendChild(repoDiv);
                allRepoDiv.push(repoDiv);

                const repoLangDiv=document.createElement("div");
                repoLangDiv.classList.add("repo-lang-div")
                repoDiv.appendChild(repoLangDiv);

                let c=0;
                for(let key in repoLangData){
                    c++;
                    // console.log(key);
                    const repoLang=document.createElement("span");      //repo lang div
                    repoLang.classList.add("repo-lang")
                    repoLang.innerHTML=key;
                    repoLangDiv.appendChild(repoLang)
                    if(c===3){
                        break;
                    }
                }
                // console.log("Repo",repo.name," Lang",repo.language)
            }
            catch(e){
                console.log("error in repo lang fetching",e);
            }
        
        }
    }
    catch(e){
        console.log("error in repo data fetching",e);
    }
    finally{
        spinner.classList.remove("active");
        repoContainer.classList.add("active");
        console.log(allRepoDiv);
    }
    
}