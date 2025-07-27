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


const fetchRecentTransactions = async () => {
  const transactionsList = document.getElementById("transactions-list");

  try {
    const transactionsRef = ref(db, "finanace");
    const snapshot = await get(transactionsRef);

    if (snapshot.exists()) {
      const financeData = snapshot.val();
      let allTransactions = [];

      // Collect all transactions from all users
      for (const userId in financeData) {
        const userTransactions = financeData[userId].Transactions || [];

        userTransactions.forEach((transaction) => {
          const timestamp = new Date(
            `${transaction.TransactionDate}T${transaction.TransactionTime}`
          ).getTime(); // Combine Date and Time for a unique timestamp

          allTransactions.push({
            ...transaction,
            timestamp,
            userId,
          });
        });
      }

      // Sort transactions by timestamp (most recent first)
      allTransactions.sort((a, b) => b.timestamp - a.timestamp);

      // Limit to 7 most recent transactions
      const recentTransactions = allTransactions.slice(0, 10);

      // Generate HTML for transactions
      if (recentTransactions.length > 0) {
        transactionsList.innerHTML = recentTransactions
          .map(
            (transaction) => `
            <div class="transaction-item">
              <div class="icon">✔</div>
              <div class="details">
                Transaction for <strong>${transaction.Name}</strong> was successful with a PRN of 
                <strong>${transaction.ReferenceID}</strong>, fully signed by ${transaction.Issuer} at ${transaction.TransactionTime}.
              </div>
            </div>
          `
          )
          .join("");
      } else {
        transactionsList.innerHTML = "<p>No recent transactions to display.</p>";
      }
    } else {
      transactionsList.innerHTML = "<p>No transactions found in the database.</p>";
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
    transactionsList.innerHTML = "<p>Error loading transactions. Please try again later.</p>";
  }
};

// Initialize fetching on DOMContentLoaded
document.addEventListener("DOMContentLoaded", fetchRecentTransactions);
