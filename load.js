document.addEventListener("DOMContentLoaded", () => {
    const paymentOverlay = document.getElementById("payment-overlay");
    
    
    paymentOverlay.style.display = "flex";
  
    
    setTimeout(() => {
      paymentOverlay.style.display = "none";
    }, 2000); 
  });
  