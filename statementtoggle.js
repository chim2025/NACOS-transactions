import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
document.getElementById("account-statement").addEventListener("click",(e)=>{
    e.preventDefault();
    const accountBtn=document.querySelector(
        ".show-input"
    )
    const clickedElement = e.target;
    const parentElement = clickedElement.parentElement;
    if (accountBtn.classList.contains("hidden")) {
        accountBtn.classList.remove("hidden") 
        parentElement.classList.add("blur-container")
        
     }
     else{
        accountBtn.classList.add("hidden") 
        parentElement.classList.remove("blur-container") 
        
     }
})
document.getElementById("continue").addEventListener("click", async (e)=>{
    e.preventDefault();
    const inputcontainer=document.getElementById("regNumber1").value.trim();
    sessionStorage.setItem("user",inputcontainer)
    await getUser(inputcontainer)
    window.location.href = "statement.html";
    
})
async function getUser(user){
    const userRef = ref(db, `Members/${user.split("/").pop()}`);
    try{
        const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      console.log("User data:", userData);
      sessionStorage.setItem("userData2", JSON.stringify(userData));
      localStorage.setItem("userData2", JSON.stringify(userData));
    }
}catch(error) {
    console.error("Error fetching user data:", error);
  } 
}