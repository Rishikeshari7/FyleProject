const searchForm=document.querySelector(".form-container");
const searchInput=document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let userName=searchInput.value;
    fetchUserData(userName);
});
async function fetchUserData(userName){
    try{
        const response = await fetch (`https://api.github.com/users/${userName}`);
        const data=await response.json();
        console.log(data);
    }
    catch(err){
        console.log("ERROR in FETCH data",err);
    }
    
}