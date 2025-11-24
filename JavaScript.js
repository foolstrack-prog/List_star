/* ---------- JS FUNCTIONS ---------- */  
  
const productInput = document.getElementById("productName");  
const orderInput = document.getElementById("orderName");  
const addBtn = document.getElementById("addBtn");  
const listDiv = document.getElementById("list");  
  
/* Add Item */  
addBtn.onclick = () => {  
  const product = productInput.value.trim();  
  const order = orderInput.value.trim();  
  
  if(product === "" || order === ""){  
    alert("Please fill both fields");  
    return;  
  }  
  
  addItem(product, order);  
  
  productInput.value = "";  
  orderInput.value = "";  
};  
  
/* Add item to UI */  
function addItem(product, order){  
  const div = document.createElement("div");  
  div.className = "item";  
  
  div.innerHTML = `  
    <div>  
      <strong>${product}</strong><br>  
      <small>${order}</small>  
    </div>  
  
    <div class="actions">  
      <button class="complete">Done</button>  
      <button class="cancel">Cancel</button>  
    </div>  
  `;  
  
  div.querySelector(".complete").onclick = () => {  
    div.style.opacity = "0.5";  
    div.style.border = "1px solid #10b981";  
  };  
  
  div.querySelector(".cancel").onclick = () => {  
    div.style.opacity = "0.5";  
    div.style.border = "1px solid #ef4444";  
  };  
  
  listDiv.appendChild(div);  
}  
  
/* Import JSON */  
document.getElementById("importBtn").onclick = () => {  
  const json = prompt("Paste JSON: [{product:'', order:''}]");  
  
  try{  
    const arr = JSON.parse(json);  
    arr.forEach(x => addItem(x.product, x.order));  
  }catch(e){  
    alert("Invalid JSON");  
  }  
};  
  
/* Share PDF (Using the Fixed Code from the previous interaction) */  
document.querySelector(".pdf-download").onclick = () => {  
  const filename = "Orders_Report.pdf";
  const shareText = "Check out the latest stock orders report: " + filename;
  
  // --- OPTION 1: Use Web Share API (Best for modern mobile browsers) ---
  if (navigator.share) {
    navigator.share({
        title: 'Orders Report',
        text: shareText,
        // url: 'https://yourwebsite.com/path/to/Orders_Report.pdf', 
    })
    .then(() => console.log('Successful share'))
    .catch((error) => {
        console.log('Error sharing or user cancelled:', error);
        triggerDownload(); 
    });
  } else {
    // --- OPTION 2: Fallback to direct download link (for desktop/older browsers) ---
    triggerDownload();
  }

  function triggerDownload() {
    alert(`Web Share API not supported or failed. Simulating download for manual sharing of ${filename}.`);
    console.log(`Simulating download of ${filename}.`);
  }
};