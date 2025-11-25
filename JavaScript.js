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
    // Add a class to track completion status for the report
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
/* SHARE LOGIC (PDF Invoice Print)                      */
/* ---------------------------------------------------- */
document.querySelector(".pdf-download").onclick = () => {  
  
  // 1. Get all items currently in the list
  const items = document.querySelectorAll(".item");
  
  if(items.length === 0) {
    alert("The list is empty! Add items before sharing.");
    return;
  }

  // 2. Build the HTML structure for a clean "invoice paper" style
  // Using white background and black text as requested.
  let invoiceHTML = `
    <html>
    <head>
      <title>Stock Order Invoice</title>
      <style>
        body { 
            font-family: 'Inter', system-ui, sans-serif; 
            background: #ffffff; /* White Paper */
            color: #000000;      /* Black Text */
            padding: 40px; 
        }
        h1 { text-align: center; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 30px;}
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 2px solid #000; padding: 12px; text-align: left; }
        th { background: #f0f0f0; font-weight: 800; }
        .status-cell { font-weight: bold; text-align: center;}
        .footer { margin-top: 30px; text-align: right; font-weight: 800; font-size: 18px;}
        /* Ensure background colors print */
        @media print {
            body { -webkit-print-color-adjust: exact; }
        }
      </style>
    </head>
    <body>
      <h1>Stock Order Invoice</h1>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Product Name</th>
            <th>Supplier / Reference</th>
          </tr>
        </thead>
        <tbody>
  `;

  // 3. Iterate through list items and add table rows
  items.forEach((div) => {
     // Extract text from DOM elements
     const product = div.querySelector("strong").innerText;
     const ref = div.querySelector("small").innerText;
     
     // Check status based on the class added earlier
     const isDone = div.classList.contains("is-done");
     const statusText = isDone ? "COMPLETED" : "PENDING";
     
     invoiceHTML += `
       <tr>
         <td class="status-cell">${statusText}</td>
         <td>${product}</td>
         <td>${ref}</td>
       </tr>
     `;
  });

  // 4. Close HTML and trigger print on load
  invoiceHTML += `
        </tbody>
      </table>
      <div class="footer">Total Items: ${items.length}</div>
      <script>
        // Automatically trigger print dialog when popup loads
        window.onload = () => { 
             window.print(); 
             // Optional: close window after printing (some browsers block this)
             // window.close(); 
        }
      </script>
    </body>
    </html>
  `;

  // 5. Open new window and write the invoice content
  const printWindow = window.open('', '_blank', 'width=900,height=700,scrollbars=yes');
  printWindow.document.open();
  printWindow.document.write(invoiceHTML);
  printWindow.document.close(); // necessary for IE >= 10 for onload to fire

};