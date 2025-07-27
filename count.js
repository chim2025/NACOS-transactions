import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyC74WtElLwIhx4dG4JBcZxkax-bvxJ6M_I",
  authDomain: "nacos-1b5ce.firebaseapp.com",
  databaseURL: "https://nacos-1b5ce-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nacos-1b5ce",
  storageBucket: "nacos-1b5ce.appspot.com",
  messagingSenderId: "840396345399",
  appId: "1:840396345399:web:a2b86e7ceb1994902c6fb2",
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


async function fetchTotalAndLevelData() {
  try {
    const membersRef = ref(db, "Members");
    const snapshot = await get(membersRef);

    if (snapshot.exists()) {
      const membersData = snapshot.val();
      const totalStudents = Object.keys(membersData).length;

      
      const levelCounts = {
        "Year One": 0,
        "Year Two": 0,
        "Year Three": 0,
        "Year Four": 0,
      };

      
      Object.values(membersData).forEach((student) => {
        const level = parseInt(student.level, 10); 

        if (level === 100) levelCounts["Year One"]++;
        else if (level === 200) levelCounts["Year Two"]++;
        else if (level === 300) levelCounts["Year Three"]++;
        else if (level === 400) levelCounts["Year Four"]++;
      });

      
      document.getElementById("total-students").textContent = totalStudents;

      const levelsElement = document.getElementById("level");
      levelsElement.innerHTML = `
        Year One: <b>${levelCounts["Year One"]}</b> 
        Year Two: <b>${levelCounts["Year Two"]}</b> 
        Year Three: <b>${levelCounts["Year Three"]}</b> 
        Year Four: <b>${levelCounts["Year Four"]}</b>
      `;
    } else {
      console.warn("No data found in the Members node.");
      document.getElementById("total-students").textContent = "0";
    }
  } catch (error) {
    console.error("Error fetching Members data:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchTotalAndLevelData);
