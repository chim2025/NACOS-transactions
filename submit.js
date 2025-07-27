import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  update,
  get,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";


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

/**
 * 
 * @param {string} userIndex - 
 * @param {object} transactionData - 
 */

document.addEventListener("DOMContentLoaded", () => {
    
    document.body.addEventListener("submit", async (e) => {
      if (e.target && e.target.id === "paymentForm") {
        e.preventDefault();
  
        const success=document.getElementById("success");
        const email=document.getElementById("email").value.trim();
        const paymentOverlay = document.getElementById("payment-overlays");
        const receiptform=document.getElementById("receipt-forms")
        const heading=document.getElementById("heading");
        const paragraph=document.getElementById("paragraph");
        const name = document.getElementById("name").value.trim();
        const nacosid=document.getElementById("nacosId").value.trim();
        const matric=document.getElementById("matricNumber").value.trim();
        const level=document.getElementById("xxx").value.trim();
        const sessionYear=document.getElementById("sessionYear").value.trim();
        const semester=document.getElementById("semester").value.trim();
        
        
        const issuer=document.getElementById("issuer").value.trim();
        const paymentAmount = document.getElementById("amount").value.trim();
        const paymentMode = document.getElementById("mode").value.trim();
        const paymentType = document.getElementById("paymentCategory").value.trim();
        const paymentPurpose = document.getElementById("purpose").value.trim();
        const referenceID = generateReferenceID();
        

        const now = new Date();
        const transactionDate = now.toLocaleDateString('en-CA'); 
        const transactionTime = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      const transactionDate2 = new Date(transactionDate);
      const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
      const formattedDate = transactionDate2.toLocaleDateString('en-US', options);

      document.getElementById("go-back1").addEventListener("click", () => {
        success.classList.add("hidden");
        receiptform.classList.remove("hidden");
       })
  
        const regNumber = document.getElementById("regNumber").value.trim();
  
        if (!paymentAmount || !paymentMode || !paymentType || !paymentPurpose || !regNumber) {
          console.error("Some form fields are empty");
          return;
        }
  
        const transactionData = {
          Name:name,
          matric:matric,
          nacos:nacosid,
          level:level,
          Amount: paymentAmount,
          PaymentMode: paymentMode,
          PaymentType: paymentType,
          PaymentPurpose: paymentPurpose,
          Issuer:issuer,
          ReferenceID: referenceID,
          TransactionDate: transactionDate,
          formattedDate:formattedDate,
          TransactionTime: transactionTime,
          sessionYear:sessionYear,
          Semester:semester
        };
        localStorage.setItem("currentReferenceID", referenceID); 
        localStorage.setItem("currentEmail",email)
  
        const userIndex = regNumber.split("/").pop();
        paymentOverlay.style.display = "flex";
        

  
  setTimeout(async () => {
    try {
      
      await addTransaction(userIndex, transactionData);

     
      console.log("Transaction successfully added:", transactionData);

     
      paymentOverlay.style.display = "none";

     
      console.log("Transaction successfully added:", transactionData);
      console.log("Transaction successfully added:", transactionData);
      receiptform.classList.add("hidden");
      success.classList.remove("hidden");
      heading.innerText="Transaction successful";
      paragraph.innerHTML= `Transaction  for <b>${name}</b> was successfully submitted to the finance department by you. Make
      sure that a digital receipt is attached to this transaction. Report any issue to the ICT department of this association
`
    } catch (error) {
      console.error("Error adding transaction:", error);
      paymentOverlay.classList.add("hidden"); 
      alert("An error occurred. Please try again.");
    }
  }, 4000); 
      
        
       }
       
       document.getElementById("rep").addEventListener("click",()=>{
        const success=document.getElementById("success");
        const paymentOverlay = document.getElementById("payment-overlays");
        const receiptform=document.getElementById("receipt-forms")
        const heading=document.getElementById("heading");
        const paragraph=document.getElementById("paragraph");
        const name = document.getElementById("name").value.trim();
        const nacosid=document.getElementById("nacosId").value.trim();
        const matric=document.getElementById("matricNumber").value.trim();
        const email=document.getElementById("email").value.trim();
        const level=document.getElementById("xxx").value.trim();
        
        const issuer=document.getElementById("issuer").value.trim();
        const paymentAmount = document.getElementById("amount").value.trim();
        const paymentMode = document.getElementById("mode").value.trim();
        const paymentType = document.getElementById("paymentCategory").value.trim();
        const paymentPurpose = document.getElementById("purpose").value.trim();
        const referenceID = generateReferenceID();
        const sessionYear=document.getElementById("sessionYear").value.trim();
        const semester=document.getElementById("semester").value.trim();
        

        const now = new Date();
        const transactionDate = now.toLocaleDateString('en-CA'); 
        const transactionTime = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      const transactionDate2 = new Date(transactionDate);
      const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
      const formattedDate = transactionDate2.toLocaleDateString('en-US', options);
     
      
      const transactionData = {
        Name:name,
        matric:matric,
        nacos:nacosid,
        level:level,
        Amount: paymentAmount,
        PaymentMode: paymentMode,
        PaymentType: paymentType,
        PaymentPurpose: paymentPurpose,
        Issuer:issuer,
        ReferenceID: referenceID,
        TransactionDate: transactionDate,
        formattedDate:formattedDate,
        TransactionTime: transactionTime,
        sessionYear:sessionYear,
        Semester:semester
      };
      

        generateAndPrintReceipt(transactionData);
       } )
    });
  });
  
  
  function generateReferenceID() {
    const refID = "REF" + Math.floor(Math.random() * 100000000000);
    
    return refID;
  }
  
  
  async function addTransaction(userIndex, transactionData) {
    
    const userRef = ref(db, `finanace/${userIndex}/Transactions`); 
  
   
    try {
      const snapshot = await get(userRef);
      let existingTransactions = [];
  
      if (snapshot.exists()) {
        
        existingTransactions = snapshot.val();
      }
  
      
      existingTransactions.push(transactionData);
  
     
      await set(userRef, existingTransactions);
  
      console.log("Transaction successfully added to Firebase:", transactionData);
    } catch (error) {
      console.error("Error adding transaction to Firebase:", error);
    }
  }
  function generateAndPrintReceipt(transactionData) {
    const formattedAmount = capitalizeWords(numberToWords(transactionData.Amount));
    const savedReferenceID = localStorage.getItem("currentReferenceID");
    const email=localStorage.getItem("currentEmail")
  if (!savedReferenceID) {
    console.error("Reference ID not found in localStorage!");
    alert("Reference ID not found in localStorage!")
    return;
  }
    
    const receiptHTML = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${transactionData.Name}</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 10px;
            
            
          }
          .receipt-container {
            
            margin: 0 auto;
            padding: 30px;
            
            background: #fff;
            position: relative;
           
          }
          .receipt-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
          }
          .email-icon {
  position: relative;
  width: 50px;
  height: 30px;
  background: #3498db; /* Envelope color */
  border-radius: 4px;
  overflow: hidden;
  border: 2px solid #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.email-icon::before,
.email-icon::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}

.email-icon::before {
  border-width: 0 25px 15px 25px;
  border-color: transparent transparent white transparent;
  top: -15px;
  left: 0;
}

.email-icon::after {
  border-width: 0 25px 15px 25px;
  border-color: transparent transparent white transparent;
  bottom: -15px;
  left: 0;
}

          .receipt-header img {
            width: 80px;
            height: auto;
          }
          .header-text {
            text-align: center;
            flex-grow: 1;
          }
          .header-text h1 {
            font-size: 24px;
            margin: 5px 0;
            font-weight: bold;
            
          }
          .header-text h2,
          .header-text h3 {
            margin: 2px 0;
            font-size: 18px;
            font-weight: 600;
          }
          /* Watermark Styling */
      .watermark {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        opacity: 0.1;
        background: url('/images/nacoslogo.png') no-repeat center center;
        background-size: contain;
        width: 70%;
        height: 70%;
        pointer-events: none; /* Ensure it doesn't interfere with interaction */
      }
  
      @media print {
        body {
          -webkit-print-color-adjust: exact; /* Ensures colors, including the watermark, are printed */
        }
      }
          .receipt-body {
            margin-top: 20px;
            text-align: left;
            font-size: 16px;
            line-height: 1.8;
          }
          .receipt-body p {
            margin: 8px 0;
          }
          .receipt-body .row {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          #none{
          font-family: cursive;
          font-sixe:15px;
          }
          .receipt-footer {
            margin-top: 30px;
            text-align: center;
            font-size: 14px;
            font-style: italic;
          }
          .footer-line {
            border-top: 1px solid #000;
            margin-top: 20px;
            padding-top: 10px;
          }
          .footer-contact p {
            margin: 2px 0;
          }
          .print-btn {
            margin-top: 15px;
            padding: 10px 20px;
            background-color:rgb(10, 48, 12);
            color: #fff;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
          }
          .print-btn:hover {
            background-color:rgb(9, 44, 5);
          }
          .line{
          border-bottom:3px solid rgb(9, 44, 5);
          }
        </style>
      </head>
      <body>
       <div class="watermark"></div>
  
        <div class="receipt-container">
        
          <!-- Header Section -->
          <div class="receipt-header">
            <img src="/images/clu_logo.png" alt="CLU Logo">
            <div class="header-text">
              <h1>OFFICE OF THE DIRECTOR OF FINANCE</h1>
              <h2>NATIONAL ASSOCIATION OF COMPUTING STUDENTS</h2>
              <h3>CLIFFORD UNIVERSITY CHAPTER</h3>
              <h2 style="font-weight:bold;margin-top:1pc; padding:10px; background-color:green; color:white">OFFICIAL PAYMENT RECEIPT</h2>
            </div>
            <img src="/images/nacoslogo.png" alt="NACOS Logo">
          </div>
          
        <div class="line"></div>
          
          <!-- Receipt Body -->
          <div class="receipt-body">
          
            <p id="none"> ${transactionData.formattedDate}, ${transactionData.TransactionTime}</p>
            <p class="row">
              <span>NACOS ID: <b>${transactionData.nacos || "N/A"}</b></span>
              <span>Level:<b> ${transactionData.level}</b> </span>
              <span>Matriculation No:</strong><b> ${transactionData.matric || "N/A"}</b></span>
            </p>
            <p>Received From: ${transactionData.Name}</p>
            <p>Amount: ${formatNumberWithCommas(transactionData.Amount)} (${formattedAmount } Naira and Zero Kobo Only)</p>
            <p>Purpose of Pyment: ${transactionData.PaymentPurpose}</p>
            <p>Transaction Type: ${transactionData.PaymentMode}</p>
            <p>Reference Number: <b>${savedReferenceID}</b></p>
            <p>Narration:  ${transactionData.Name}'s payment for ${transactionData.PaymentPurpose}</p>
            <p>Received by: ${transactionData.Issuer || "Director of Finance"}</p>
            <p>Transaction Session :${transactionData.sessionYear}||${transactionData.Semester}</p>
            <p id="email"style="text-align:right;"> Attached to: ${email}<p>
          </div>
  <div class="line"></div>
          <!-- Footer Section -->
          <div class="receipt-footer">
            
            
          
            <p style="text-align:left;">For more information, please contact us:<b> +2349035044862, +2348086268108, finance@nacosclu.rf.gd, info@nacosclu.rf.gd , https://www.nacosclu.rf.gd</b></p>
              <p style="text-align:left;">Powered by Gtransact, developed by CHIMENKA GOODLUCK</p>
          
          </div>
          <script>
    function printPage() {
      document.getElementById('printButton').style.display = 'none'; // Hide the button
      window.print(); // Trigger the print
      document.getElementById('printButton').style.display = ''; // Restore the button
    }
  </script>
          <button class="print-btn" id="printButton" onclick="printPage()">Print Receipt</button>
        </div>
      </body>
    </html>
    `;
  
    const receiptWindow = window.open("", "_blank");
    receiptWindow.document.write(receiptHTML);
    receiptWindow.document.close();
  }


function numberToWords(num) {
  if (num === 0) return "zero";

  const units = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const teens = ["", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  const thousands = ["", "thousand", "million", "billion"];

  function convertToWords(n) {
    let word = "";
    if (n >= 100) {
      word += units[Math.floor(n / 100)] + " hundred ";
      n %= 100;
    }
    if (n > 10 && n < 20) {
      word += teens[n - 10] + " ";
    } else {
      if (n >= 10) {
        word += tens[Math.floor(n / 10)] + " ";
      }
      if (n % 10 > 0) {
        word += units[n % 10] + " ";
      }
    }
    return word.trim();
  }

  let result = "";
  let partCount = 0;

  while (num > 0) {
    const part = num % 1000;
    if (part > 0) {
      result = `${convertToWords(part)} ${thousands[partCount]} ${result}`;
    }
    num = Math.floor(num / 1000);
    partCount++;
  }

  return result.trim();
}
function formatNumberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function capitalizeWords(str) {
  return str
    .split(" ") 
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
    .join(" "); 
}


