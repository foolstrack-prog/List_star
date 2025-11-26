# 📚 Stock Order Manager - Clean UI Demo

## ✨ Project Overview

This is a simple, single-page **Stock Order Manager** application built using **HTML, CSS, and vanilla JavaScript**. It provides a clean, mobile-friendly (9:16 aspect ratio) user interface for quickly listing and tracking product orders.

The design features a modern **"Colorful Glass"** aesthetic and includes a dedicated interface section styled like a WhatsApp file message for sharing reports.

## 🚀 Key Features

* **Order Entry:** Quickly add new stock items with a Product Name and Supplier/Order Reference.
* **Status Management:** Mark listed orders as **Done** or **Cancel** with immediate visual feedback (color-coded borders).
* **Data Import:** Supports importing multiple orders via a simple **JSON array format**.
* **Web Share Integration:** The "Share" button utilizes the **Web Share API** (if supported by the browser) to trigger the native sharing menu (including options like WhatsApp, email, etc.) for the report link/title.

## 🛠️ Setup and Usage

### 1. Running the Application

This project is contained in a single HTML file and does not require a web server to run.

1.  Save the entire code (HTML, CSS, and JavaScript) into a file named `index.html`.
2.  Open `index.html` by double-clicking it in your file explorer. It will launch directly in your web browser.

### 2. Basic Workflow

1.  **Add:** Fill in the **Product Name** and **Supplier / Order Ref** fields and click **Add**.
2.  **Update Status:** Click the **Done** (green) or **Cancel** (red) buttons next to an item to update its status visually.

### 3. Data Import

Click the **Import** button and paste a valid JSON array into the prompt box.

**Required JSON Format:**
```json
[
  {"product": "USB C Adapter", "order": "Supplier A / PO-123"},
  {"product": "Wireless Mouse", "order": "Vendor Z / 998-INV"}
]