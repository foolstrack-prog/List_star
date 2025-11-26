/* ---------- JS FUNCTIONS ---------- */  
  
const productInput = document.getElementById("productName");  
const orderInput = document.getElementById("orderName");  
const addBtn = document.getElementById("addBtn");  
const listBody = document.getElementById("list"); // This is now the TBODY
  
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
  
/* Add item to TABLE function */  
function addItem(product, order){  
  const tr = document.createElement("tr");  
  tr.className = "item-row";  
  
  // Create Table Cells
  tr.innerHTML = `  
    <td class="td-product"><strong>${product}</strong></td>
    <td class="td-ref">${order}</td>
    <td class="actions">  
      <button class="complete" title="Done">✔</button>  
      <button class="cancel" title="Remove">✖</button>  
    </td>  
  `;  
  
  // Mark as Complete (Green Highlight)
  tr.querySelector(".complete").onclick = () => {  
    tr.style.backgroundColor = "#e6fffa"; 
    tr.style.color = "#047857";
    tr.classList.add("is-done"); 
  };  
  
  // Mark as Cancelled (Remove Row)
  tr.querySelector(".cancel").onclick = () => {  
    tr.style.opacity = "0"; 
    setTimeout(() => tr.remove(), 300); // Wait for fade out
  };  
  
  listBody.appendChild(tr);  
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
  
  // Get all table rows
  const rows = document.querySelectorAll(".item-row");
  
  if(rows.length === 0) {
    alert("The list is empty! Add items before sharing.");
    return;
  }

  let invoiceHTML = `
    <html>
    <head>
      <title>Stock Order Invoice</title>
      <style>
        body { font-family: sans-serif; padding: 40px; }
        h1 { text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #333; padding: 10px; text-align: left; }
        th { background: #f4f4f4; }
        .status-cell { text-align: center; font-weight: bold; }
        .footer { margin-top: 20px; text-align: right; font-weight: bold;}
      </style>
    </head>
    <body>
      <h1>Stock Order Invoice</h1>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Product Name</th>
            <th>Reference</th>
          </tr>
        </thead>
        <tbody>
  `;

  // Iterate through table rows to build PDF
  rows.forEach((tr) => {
     const product = tr.querySelector(".td-product").innerText;
     const ref = tr.querySelector(".td-ref").innerText;
     
     const isDone = tr.classList.contains("is-done");
     const statusText = isDone ? "COMPLETED" : "PENDING";
     const bg = isDone ? "#e6fffa" : "#fff";
     
     invoiceHTML += `
       <tr style="background:${bg}">
         <td class="status-cell">${statusText}</td>
         <td>${product}</td>
         <td>${ref}</td>
       </tr>
     `;
  });

  invoiceHTML += `
        </tbody>
      </table>
      <div class="footer">Total Items: ${rows.length}</div>
      <script>
        window.onload = () => { window.print(); }
      </script>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank', 'width=900,height=700');
  printWindow.document.write(invoiceHTML);
  printWindow.document.close();
};