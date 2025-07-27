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



const storedUser = sessionStorage.getItem("userData2");
const goback=document.getElementById("go-back");
goback.addEventListener("click",()=>{
  window.location.href="index.html";
})
const userData = JSON.parse(storedUser);
const user = userData.reg.split("/").pop();



async function generateStatement(USER) {
  const userId = USER; 
  const statementContainer = document.getElementById("statement-content");
  const state = document.getElementById("state"); 
  const remarkContainer=document.getElementById("remark")
 

  try {
  
    const transactionsRef = ref(db, `finanace/${userId}/Transactions`);
    const snapshot = await get(transactionsRef);

    let transactions = snapshot.exists() ? Object.values(snapshot.val()) : [];

    transactions.sort((a, b) => new Date(b.TransactionDate) - new Date(a.TransactionDate));

    let requiredFees = {
        "Registration Fee": 5000,
        "Semester Fee": 4000,
        "NACOS ID Fee": 3000,
      };
      
      if (userData.level === "100") {
        requiredFees["Induction Fee"] = 10000;
      } else if (userData.level === "400") {
        delete requiredFees["NACOS ID Fee"];
      }
      
      
      

    const existingFees = new Set(transactions.map(tx => tx.PaymentPurpose));

    let missingTransactions = [];
    Object.entries(requiredFees).forEach(([feeName, amount]) => {
      if (!existingFees.has(feeName)) {
        missingTransactions.push({
          TransactionDate: new Date().toISOString().split("T")[0], 
          ReferenceID: "DEBIT-" + Math.floor(Math.random() * 1000000), 
          PaymentPurpose: ` ${feeName}`,
          PaymentType: "debit",
          Amount: amount
        });
      }
    });
    
const paidFees = new Set(transactions.filter(tx => tx.PaymentType !== "debit").map(tx => tx.PaymentPurpose));
let missingAmount = 0;

Object.entries(requiredFees).forEach(([feeName, amount]) => {
  if (!paidFees.has(feeName)) {
    missingAmount += amount; 
  }
});


let remarkMessage = missingAmount === 0 
  ? `<span style="color: green; font-weight: bold;">✅ You have been successfully cleared and financially up to date.</span>` 
  : `<span style="color: red; font-weight: bold;">❌ You are still owing ₦${missingAmount.toLocaleString()}.</span>`;


remarkContainer.innerHTML = remarkMessage;
    
    transactions = [...transactions, ...missingTransactions];

    let totalDebit = 0;
    let totalCredit = 0;
    let runningTotal = 0;

    
    let statementHTML = `

      <div class="statement-header">
        <img src="images/nacoslogo.png" alt="NACOS Logo" class="logo-left">
        <div class="header-content">
          <h2>NIGERIA ASSOCIATION OF COMPUTING STUDENTS, CLIFFORD UNIVERSITY</h2>
         
          <h3>Official Financial Statement/Clearance</h3>
        </div>
        <img src="images/clu_logo.png" alt="School Logo" class="logo-right">
      </div>
      <div class="trans">
     

      <p> Tracking ID : Trans/NACOS/2025/${USER}</p>
      </div>
      <div class="account-details">
        <p><strong>Account Name:</strong> ${userData.surname|| ""} ${userData.firstname || ""} ${userData.othernames || ""}</p>
        <p><strong>Account Code:</strong> ${userData.reg || "N/A"}</p>
        <p><strong>Current Level:</strong> ${userData.level}</p>
        <p><strong>Matric:</strong> ${userData.matric}</p>
      </div>
    
      <table>
        <thead>
          <tr>
            <th>Transaction Date</th>
            <th>Reference ID</th>
            <th>Description</th>
            <th>NGN Debit</th>
            <th>NGN Credit</th>
            <th>Running Balance</th>
          </tr>
        </thead>
        <tbody>`;

 
    transactions.forEach(tx => {
      let debit = tx.PaymentType === "debit" ? parseFloat(tx.Amount) : 0;
      let credit = tx.PaymentType !== "debit" ? parseFloat(tx.Amount) : 0;

      totalDebit += debit;
      totalCredit += credit;
      runningTotal += credit - debit;

      statementHTML += `
        <tr>
          <td>${tx.TransactionDate}</td>
          <td>${tx.ReferenceID}</td>
          <td>${tx.PaymentMode || "Gtrans-Debit"} for ${tx.PaymentPurpose ||""}</td>
          <td>${debit > 0 ? "₦" + debit.toLocaleString() : "-"}</td>
          <td>${credit > 0 ? "₦" + credit.toLocaleString() : "-"}</td>
          <td>₦${runningTotal.toLocaleString()}</td>
        </tr>`;
    });

   
    statementHTML += `
        <tr class="total-row">
          <td colspan="3"><strong>Total</strong></td>
          <td><strong>₦${totalDebit.toLocaleString()}</strong></td>
          <td><strong>₦${totalCredit.toLocaleString()}</strong></td>
          <td><strong>₦${runningTotal.toLocaleString()}</strong></td>
        </tr>
       

      </tbody>
    </table>`;

    
    statementContainer.innerHTML = statementHTML;
    state.innerHTML = ""; 
    

  } catch (error) {
    console.error("Error fetching transactions:", error);
    statementContainer.innerHTML = "<p>Error loading transactions.</p>";
  }
}


document.addEventListener("DOMContentLoaded", generateStatement(user));
function printhere(){
   
 goback.style.display="none";
 button.style.display="none";
  window.print();
  goback.style.display="block";
  button.style.display="block"; 

}
window.printhere = printhere; 
const button=document.getElementById("here");
const section=document.querySelector(".statement-section");
