import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";


const db = getDatabase();
const transactionsRef = ref(db, "finanace",);

const now = new Date();
const today = now.toISOString().split("T")[0];


const startOfWeek = new Date(now);
startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); 
startOfWeek.setHours(0, 0, 0, 0); 

const endOfWeek = new Date(startOfWeek);
endOfWeek.setDate(endOfWeek.getDate() + 6); 
endOfWeek.setHours(23, 59, 59, 999); 
const startOfWeekStr = startOfWeek.toISOString().split("T")[0];
const endOfWeekStr = endOfWeek.toISOString().split("T")[0];

const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
const startOfMonthStr = startOfMonth.toISOString().split("T")[0];


function fetchAndDisplayTransactionCounts() {
  get(transactionsRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        let totalToday = 0;
        let totalWeek = 0;
        let totalMonth = 0;

        const data = snapshot.val();

        Object.values(data).forEach((user) => {
          user.Transactions.forEach((transaction) => {
            const transactionDate = transaction.TransactionDate;

           
            console.log(`TransactionDate: ${transactionDate}, Today: ${today}`);

           
if (new Date(transactionDate).toDateString() === new Date(today).toDateString()) {
  totalToday++;
}

if (
  new Date(transactionDate) >= startOfWeek &&
  new Date(transactionDate) <= endOfWeek
) {
  totalWeek++;
}

if (
  new Date(transactionDate) >= startOfMonth &&
  new Date(transactionDate) <= now
) {
  totalMonth++;
}

          });
        });

        
        document.getElementById("today-transactions").innerText = totalToday;
        document.getElementById("week-transactions").innerText = totalWeek;
        document.getElementById("month-transactions").innerText = totalMonth;
      } else {
        console.error("No transactions found in the database.");
      }
    })
    .catch((error) => {
      console.error("Error fetching transactions:", error);
    });
}


document.addEventListener("DOMContentLoaded", fetchAndDisplayTransactionCounts);
