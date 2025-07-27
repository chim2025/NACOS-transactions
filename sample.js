function generateAndPrintReceipt(transactionData) {
  const formattedAmount = capitalizeWords(numberToWords(transactionData.Amount));
  
  
  const receiptHTML = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Official Receipt</title>
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
          <p>Payment Purpose: ${transactionData.PaymentPurpose}</p>
          <p>Transaction Mode: ${transactionData.PaymentMode}</p>
          <p>Reference Number: ${transactionData.ReferenceID}</p>
          <p>Narration:  ${transactionData.Name}'s payment for ${transactionData.PaymentPurpose}</p>
          <p>Received by: ${transactionData.Issuer || "Director of Finance"}</p>
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