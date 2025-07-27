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

const fetchTransactionSummary = async () => {
  const totalTransactionsElement = document.getElementById("total-transactions").querySelector("span");
  const paymentTypesElement = document.getElementById("payment-types");
  const levelsElement = document.getElementById("levels");
  const unspecifiedLevelElement = document.getElementById("unspecified-level").querySelector("span");

  try {
    const snapshot = await get(ref(db, "finanace"));
    if (!snapshot.exists()) {
      totalTransactionsElement.textContent = "No data available";
      return;
    }

    const transactions = [];
    const financeData = snapshot.val();

    Object.keys(financeData).forEach((userId) => {
      if (financeData[userId].Transactions) {
        transactions.push(...financeData[userId].Transactions);
      }
    });

    
    totalTransactionsElement.textContent = transactions.length;

    
    const paymentTypeCounts = {};
transactions.forEach((tx) => {
  const paymentType = tx.PaymentType || "Unspecified";
  paymentTypeCounts[paymentType] = (paymentTypeCounts[paymentType] || 0) + 1;
});

paymentTypesElement.innerHTML = Object.entries(paymentTypeCounts)
  .map(([type, count]) => {

    const displayType = type.toLowerCase() === "others" ? type.slice(0, -1) : type;
    return `<li>${displayType.toUpperCase()} fee: ${count}</li>`;
  })
  .join("");


    const levelCounts = {};
    let unspecifiedLevelCount = 0;

    transactions.forEach((tx) => {
      const level = tx.level || "Unspecified";
      if (level === "Unspecified") {
        unspecifiedLevelCount++;
      } else {
        levelCounts[level] = (levelCounts[level] || 0) + 1;
      }
    });

    levelsElement.innerHTML = Object.entries(levelCounts)
      .map(([level, count]) => `<li>${level} level: ${count}</li>`)
      .join("");
    unspecifiedLevelElement.textContent = unspecifiedLevelCount;
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};


fetchTransactionSummary();
