import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Firebase Configuration
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


async function fetchTotalStudents() {
  try {
    
    const financeRef = ref(db, "finanace");

    
    const snapshot = await get(financeRef);

    if (snapshot.exists()) {
      const financeData = snapshot.val();
      const totalStudents = Object.keys(financeData).length;

      
      const spanElement = document.getElementById("students-paid");
      spanElement.textContent = totalStudents;
      console.log("Total students in finance:", totalStudents);
    } else {
      console.warn("No data found in the finance node.");
      document.getElementById("students-paid").textContent = "0";
    }
  } catch (error) {
    console.error("Error fetching total students:", error);
  }
}


document.addEventListener("DOMContentLoaded", fetchTotalStudents);
