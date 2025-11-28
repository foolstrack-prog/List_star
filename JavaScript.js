/* ---------- JS FUNCTIONS ---------- */

const productInput = document.getElementById("productName");
const orderInput = document.getElementById("orderName");
const addBtn = document.getElementById("addBtn");
const listBody = document.getElementById("list"); 

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

  tr.innerHTML = `
    <td class="td-product"><strong>${product}</strong></td>
    <td class="td-ref">${order}</td>
    <td class="actions">
      <button class="complete" title="Done">✔</button>
      <button class="cancel" title="Remove">✖</button>
    </td>
  `;

  tr.querySelector(".complete").onclick = () => {
    tr.style.backgroundColor = "#e6fffa";
    tr.style.color = "#047857";
    tr.classList.add("is-done");
  };

  tr.querySelector(".cancel").onclick = () => {
    tr.style.opacity = "0";
    setTimeout(() => tr.remove(), 300);
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
/* SHARED HELPER: Generate Invoice Content              */
/* ---------------------------------------------------- */
function getInvoiceContent() {
  const rows = document.querySelectorAll(".item-row");
  if(rows.length === 0) return null;

  let content = `
    <div style="padding: 20px; font-family: sans-serif;">
      <h1 style="text-align: center; color: #333;">Stock Order List</h1>
      <p style="text-align: center; color: #666; font-size: 12px; margin-bottom: 20px;">
        Generated: ${new Date().toLocaleString()}
      </p>
      <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
        <thead style="background: #f4f4f4;">
          <tr>
            <th style="padding:10px; border:1px solid #ddd; text-align:left;">Status</th>
            <th style="padding:10px; border:1px solid #ddd; text-align:left;">Product</th>
            <th style="padding:10px; border:1px solid #ddd; text-align:left;">Reference</th>
          </tr>
        </thead>
        <tbody>
  `;

  rows.forEach((tr) => {
     const product = tr.querySelector(".td-product").innerText;
     const ref = tr.querySelector(".td-ref").innerText;
     const isDone = tr.classList.contains("is-done");
     const statusText = isDone ? "COMPLETED" : "PENDING";
     const bg = isDone ? "#e6fffa" : "#fff";
     
     content += `
       <tr style="background:${bg}">
         <td style="padding:10px; border:1px solid #ddd; font-weight:bold; font-size:12px;">${statusText}</td>
         <td style="padding:10px; border:1px solid #ddd;">${product}</td>
         <td style="padding:10px; border:1px solid #ddd;">${ref}</td>
       </tr>
     `;
  });

  content += `
        </tbody>
      </table>
      <div style="margin-top: 20px; text-align: right; font-weight: bold;">
        Total Items: ${rows.length}
      </div>
    </div>
  `;
  
  return content;
}

/* ---------------------------------------------------- */
/* BUTTON ACTIONS                                       */
/* ---------------------------------------------------- */

// 1. PRINT BUTTON
document.getElementById("printBtn").onclick = () => {
  const content = getInvoiceContent();
  if(!content) { alert("List is empty!"); return; }

  const printWindow = window.open('', '_blank', 'width=900,height=700');
  printWindow.document.write(`<html><head><title>Print</title></head><body>${content}</body></html>`);
  printWindow.document.close();
  printWindow.print();
};

// 2. DOWNLOAD PDF BUTTON (Uses html2pdf)
document.getElementById("downloadPdfBtn").onclick = () => {
  const content = getInvoiceContent();
  if(!content) { alert("List is empty!"); return; }

  // Create a temporary container for the HTML
  const element = document.createElement('div');
  element.innerHTML = content;

  // Options for the PDF generation
  const opt = {
    margin:       0.5,
    filename:     'Stock_Order_List.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  // Generate and Save
  html2pdf().set(opt).from(element).save();
};

// 3. WHATSAPP BUTTON
document.getElementById("waBtn").onclick = () => {
    const rows = document.querySelectorAll(".item-row");
    if(rows.length === 0) { alert("List is empty!"); return; }

    let message = "📋 *STOCK ORDER REPORT* 📋\n\n";
    rows.forEach((tr, index) => {
        const product = tr.querySelector(".td-product").innerText;
        const ref = tr.querySelector(".td-ref").innerText;
        const isDone = tr.classList.contains("is-done");
        const icon = isDone ? "✅" : "⬜"; 
        message += `${index + 1}. ${icon} *${product}*\n   Ref: ${ref}\n\n`;
    });
    message += `_Total Items: ${rows.length}_`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
};