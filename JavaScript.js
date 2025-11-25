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
  
  // Mark as Complete
  div.querySelector(".complete").onclick = () => {  
    div.style.opacity = "0.5";  
    div.style.border = "1px solid #10b981"; 
    div.classList.add("is-done"); 
  };  
  
  // Mark as Cancelled
  div.querySelector(".cancel").onclick = () => {  
    div.style.opacity = "0.5";  
    div.style.border = "1px solid #ef4444";  
    div.remove(); 
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
  
/* ---------------------------------------------------- */
/* FIXED SHARE LOGIC (Direct WhatsApp Link)             */
/* ---------------------------------------------------- */
document.querySelector(".pdf-download").onclick = () => {  
  
  // 1. Get all items currently in the list
  const items = document.querySelectorAll(".item");
  
  if(items.length === 0) {
    alert("The list is empty! Add items before sharing.");
    return;
  }

  // 2. Build the formatted WhatsApp message
  let message = "*📋 STOCK ORDER REPORT*\n------------------\n";
  
  items.forEach((div, index) => {
     const product = div.querySelector("strong").innerText;
     const ref = div.querySelector("small").innerText;
     
     // Check if the item was marked as done
     const isDone = div.classList.contains("is-done");
     const statusIcon = isDone ? "✅" : "⬜";
     
     message += `${index + 1}. ${statusIcon} *${product}*\n   Ref: ${ref}\n\n`;
  });

  message += `_Total Items: ${items.length}_`;

  // 3. Share Functionality (FIXED)
  // We bypassed navigator.share because it was causing the "PDF Title" bug.
  // Now we send the text directly to WhatsApp.
  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');

};