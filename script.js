
const sidebar = document.querySelector(".sidebar");
const hamburger = document.querySelector(".hamburger");
const paymentOverlay=document.getElementById("payment-overlaysss");

hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

function updateDateTime() {
    const dateElement = document.getElementById("current-date");
    const now = new Date();
  
 
    const options = { weekday: 'long', month: 'long', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(now);
  
  
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  
 
    dateElement.textContent = `${formattedDate}, ${time}`;
  }
  

  setInterval(updateDateTime, 1000);
  updateDateTime();
  function updateGreeting() {
    const descriptionElement = document.getElementById("description");
    const now = new Date();
    const hours = now.getHours();
    let greeting;

    
    if (hours < 12) {
      greeting = "Good Morning";
    } else if (hours < 18) {
      greeting = "Good Afternoon";
    } else {
      greeting = "Good Evening";
    }

   
    descriptionElement.textContent = greeting;
  }

  
  updateGreeting();

const navLinks = document.querySelectorAll(".sidebar ul li");
const sections = document.querySelectorAll(".content-section");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(link => link.classList.remove("active"));
    sections.forEach(section => section.classList.remove("active"));

    link.classList.add("active");
    const sectionId = link.getAttribute("data-section");
    if (sectionId) {
      document.getElementById(sectionId).classList.add("active");
    }
  });
});

document.getElementById("payments").addEventListener("DOMContentLoaded",async (e)=>{
  e.preventDefault()
  paymentOverlay.style.display = "flex";

       
  setTimeout(() => {
    
    paymentOverlay.style.display="none";
    
    
  }, 5000); 
})

   
   