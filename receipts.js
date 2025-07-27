import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC74WtElLwIhx4dG4JBcZxkax-bvxJ6M_I",
  authDomain: "nacos-1b5ce.firebaseapp.com",
  databaseURL: "https://nacos-1b5ce-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nacos-1b5ce",
  storageBucket: "nacos-1b5ce.appspot.com",
  messagingSenderId: "840396345399",
  appId: "1:840396345399:web:a2b86e7ceb1994902c6fb2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const modal = document.getElementById("myModal");
const btn = document.getElementById("startBtn");
const closeModalBtn = document.getElementById("closeModal");
const receiptContainer = document.getElementById("receipt-container");
const receiptform = document.getElementById("receipt-forms");
const transactionDate = new Date().toISOString().split("T")[0]; 


btn.onclick = function () {
  modal.style.display = "flex";
  modal.style.opacity = "1";
};


closeModalBtn.onclick = function () {
  modal.style.display = "none";
  modal.style.opacity = "0";
};





document.getElementById("submitBtn").addEventListener("click", async (e) => {
  e.preventDefault();


  const regnumber = document.getElementById("regNumber").value.trim();
  const paymentOverlay = document.getElementById("payment-overlayss");
  const processing=document.getElementById("processing")
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;
  const sessionYear = `${lastYear}/${currentYear}`;

  if (regnumber) {
    
    modal.style.display="none";
    paymentOverlay.style.display = "flex";

       
        setTimeout(() => {
          
          paymentOverlay.style.display="none";
          
          
        }, 5000);
        receiptform.classList.remove("hidden");
        receiptContainer.classList.add("hidden");

   
    const db = getDatabase(app);
    const index = regnumber.split("/").pop();
    const userRef = ref(db, `Members/${index}`);

    try {
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        console.log(userData);
        

      
        receiptform.innerHTML = `
        <div>
        <button id="go-back" class="go-back">Go Back</button>
        </div>
  <div class="receipt-form-container">
    <h2>Payment Conversion and Validation </h2>
    <form id="paymentForm" class="two-column-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" value="${userData.surname} ${userData.firstname} ${userData.othernames}" readonly>
      </div>
      <div class="form-group">
        <label for="matricNumber">Matric Number:</label>
        <input type="text" id="matricNumber" value="${userData.matric}" readonly>
      </div>
      <div class="form-group">
        <label for="nacosId">NACOS ID:</label>
        <input type="text" id="nacosId" value="${userData.reg}" readonly>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" value="${userData.email}" readonly>
      </div>
      <div class="form-group">
        <label for="level">Level:</label>
        <input type="text" id="xxx" value="${userData.level}" readonly>
      </div>
      <div class="form-group">
        <label for="course">Course:</label>
        <input type="text" id="course" value="${userData.course}" readonly>
      </div>
      <div class="form-group">
        <label for="course">Session:</label>
        <input type="text" id="sessionYear" value="${sessionYear}" readonly>
      </div>
      <div class="form-group">
        <label for="course">Semester:</label>
         <select id="semester" required>
          <option value="" selected disabled>Select Semester</option>
          <option value="first semester"> First Semester</option>
          <option value=" Second semester">Second semester</option>
          <option value="summer">Summer</option>
          
        </select>
      </div>
      <div class="form-group">
        <label for="paymentCategory">Payment Category:</label>
        <select id="paymentCategory" required>
          <option value="" selected disabled>Select Payment Category</option>
          <option value="registration"> NACOS Registration Fee</option>
          <option value="semester">NACOS Semester Fee</option>
          <option value="excursion">Excursion Fee</option>
          <option value="nacos-id">NACOS ID Fee</option>
          <option value="induction">Induction Fee</option>
          <option value="others">Others</option>
        </select>
      </div>
      <div class="form-group" id="purposeGroup" style="display: none;">
        <label for="purpose">Purpose of Payment:</label>
        <input type="text" id="purpose" readonly>
      </div>
      <div class="form-group" id="amountGroup" style="display: none;">
        <label for="amount">Amount:</label>
        <input type="number" id="amount" readonly>
      </div>
      <div class="form-group">
        <label for="paymentCategory">Mode of Payment:</label>
        <select id="mode" required>
          <option value="" selected disabled>Select Payment Mode</option>
          <option value="Bank Transfer">Direct Bank Transfer</option>
          <option value="Tellar">Tellar</option>
          <option value="Point of service">Point of Service(POS)</option>
          <option value="cash">Cash</option>
          <option value="cheque">Cheque</option>
          <option value="Internet banking">Internet Banking</option>
          <option value="cryptocurrency">Cryptocurrency</option>
        </select>
      </div>
      <div class="form-group" id="Issuer">
        <label for="issuer">Issuer Name:</label>
        <input type="text" id="issuer">
      </div>
      <div class="form-group" id="transact">
        <label for="transact">Transaction date:</label>
        <input type="text" id="datetransact" value="${transactionDate}" readonly>
      </div>
      <div class="form-group form-button">
        <button id="receiptsub" type="submit">Submit Payment</button>
      </div>
    </form>
  </div>
`;

document.getElementById("go-back").addEventListener("click", (e) => {
  e.preventDefault();
  receiptform.classList.add("hidden");
  receiptContainer.classList.remove("hidden");

})

document.getElementById("paymentCategory").addEventListener("change", function () {
  
  const category = this.value;
  const purposeInput = document.getElementById("purpose");
  const amountInput = document.getElementById("amount");
  const purposeGroup = document.getElementById("purposeGroup");
  const amountGroup = document.getElementById("amountGroup");

  switch (category) {
    case "registration":
      purposeInput.value = "Registration Fee";
      purposeInput.readOnly = true;
      amountInput.value = 5000;
      amountInput.readOnly = true;
      purposeGroup.style.display = "block";
      amountGroup.style.display = "block";
      break;
    case "semester":
      purposeInput.value = "Semester Fee";
      purposeInput.readOnly = true;
      amountInput.value = 4000;
      amountInput.readOnly = true;
      purposeGroup.style.display = "block";
      amountGroup.style.display = "block";
      break;
    case "excursion":
      purposeInput.value = "Excursion Fee";
      purposeInput.readOnly = true;
      amountInput.value = 10000;
      amountInput.readOnly = true;
      purposeGroup.style.display = "block";
      amountGroup.style.display = "block";
      break;
    case "nacos-id":
      purposeInput.value = "NACOS ID Fee";
      purposeInput.readOnly = true;
      amountInput.value = 3000;
      amountInput.readOnly = true;
      purposeGroup.style.display = "block";
      amountGroup.style.display = "block";
      break;
    case "induction":
      purposeInput.value = "Induction Fee";
      purposeInput.readOnly = true;
      amountInput.value = 10000;
      amountInput.readOnly = true;
      purposeGroup.style.display = "block";
      amountGroup.style.display = "block";
      break;
    case "others":
      purposeInput.value = "";
      purposeInput.readOnly = false; 
      amountInput.value = "";
      amountInput.readOnly = false; 
      purposeGroup.style.display = "block";
      amountGroup.style.display = "block";
      break;
    default:
      purposeGroup.style.display = "none";
      amountGroup.style.display = "none";
      break;
  }
});


      } else {
        alert("No data found for the entered registration number.");
        modal.style.opacity = "1"; 
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("An error occurred while verifying the registration number.");
    }
  } else {
    alert("Please enter a registration number.");
  }
});
const goback=document.getElementById("go-back1");
goback.addEventListener("click",()=>{
 
})
