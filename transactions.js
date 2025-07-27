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


const formatCurrency = (amount) => `₦${amount.toLocaleString()}`;
const groupByDate = (transactions) => transactions.reduce((groups, tx) => {
  const date = tx.TransactionDate;
  if (!groups[date]) groups[date] = [];
  groups[date].push(tx);
  return groups;
}, {});


const fetchAndFilterTransactions = async (filter) => {
    const summarySection = document.getElementById("summary");
    const tablesSection = document.getElementById("filtered-tables");
  
    try {
      const snapshot = await get(ref(db, "finanace"));
      if (!snapshot.exists()) {
        summarySection.innerHTML = "<p>No data available.</p>";
        return;
      }
  
      const allTransactions = [];
      const financeData = snapshot.val();
      Object.keys(financeData).forEach((userId) => {
        if (financeData[userId].Transactions) {
          allTransactions.push(...financeData[userId].Transactions);
        }
      });
  
    
      const today = new Date();
      let filtered = allTransactions.filter((tx) => {
        
        const date = new Date(tx.TransactionDate);
        if (filter === "today") {
         
          return date.toDateString() === today.toDateString();
        }
        if (filter === "week") {
          
          const weekStart = new Date();
          weekStart.setDate(today.getDate() - today.getDay());
          weekStart.setHours(0, 0, 0, 0);
  
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekEnd.getDate() + 6);
          weekEnd.setHours(23, 59, 59, 999);
  
          return date >= weekStart && date <= weekEnd;
        }
        if (filter === "month") {
     
          return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
        }
        if (filter === "semester") {
         
          return today.getMonth() - date.getMonth() <= 3 && date.getFullYear() === today.getFullYear();
        }
        return false;
      });
      
     
      const totalAmount = filtered.reduce((sum, tx) => sum + Number(tx.Amount || 0), 0);
      const filterText = filter === "today" ? "today" : `this ${filter}`;
      summarySection.innerHTML = `
         <h3>Summary of Transactions </h3>
         <h4>For ${filterText}</h4>
        <p>Total Transactions: ${filtered.length}</p>
        <p>Total Amount: ${formatCurrency(totalAmount)}</p>
      `;
  
      
      const groupedTransactions = groupByDate(filtered);
      tablesSection.innerHTML = Object.entries(groupedTransactions)
        .map(([date, transactions]) => {
          const dayTotal = transactions.reduce((sum, tx) => sum + Number(tx.Amount || 0), 0);
          return `
            <table>
              <caption id="captions">Transactions on ${date} (Total: ${formatCurrency(dayTotal)})</caption>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Level</th>
                  <th>Reference ID</th>
                  <th>Purpose</th>
                  <th> Time</th>
                  <th>Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                ${transactions
                  .map((tx) => `
                    <tr>
                      <td>${tx.Name}</td>
                      <td>${tx.level}</td>
                      <td>${tx.ReferenceID}</td>
                      <td>${tx.PaymentPurpose}</td>
                      <td>${tx.TransactionTime}</td>
                      <td>${tx.PaymentMode}</td>
                      <td>${formatCurrency(tx.Amount)}</td>
                    </tr>
                  `)
                  .join("")}
              </tbody>
            </table>
          `;
        })
        .join("");
    } catch (error) {
      console.error("Error fetching data:", error);
      summarySection.innerHTML = "<p>Error loading data.</p>";
    }
  };
  


  document.getElementById("filter-dropdown").addEventListener("change", async (e) => {
    const overlay = document.getElementById("overlay");
  
   
    overlay.classList.add("active");
  
   
    await fetchAndFilterTransactions(e.target.value);
  
   
    setTimeout(() => {
      overlay.classList.remove("active");
    }, 500);
  });
  


fetchAndFilterTransactions("today");
