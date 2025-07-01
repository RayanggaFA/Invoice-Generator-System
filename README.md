# 🧾 Invoice Generator System

Sebuah aplikasi berbasis web yang memungkinkan pengguna untuk membuat invoice dalam format PDF secara otomatis, hanya dengan mengisi formulir sederhana. Dibangun menggunakan Node.js, Express, dan PDFKit.

---

## 🚀 Fitur Utama

- Formulir input dinamis untuk nama klien, tanggal, dan item invoice
- Tambah item sebanyak yang diinginkan
- Hasilkan file PDF secara otomatis
- Tautan langsung untuk mengunduh PDF invoice
- Notifikasi ketika berhasil atau gagal membuat invoice

---

## 📁 Struktur Folder
invoice-generator/
├── controllers/
│ └── invoiceController.js # Logika utama pembuatan PDF
├── routes/
│ └── invoiceRoutes.js # Routing endpoint API
├── public/
│ ├── index.html # Frontend form sederhana
│ └── invoices/ # Folder hasil invoice PDF
├── server.js # Entry point Express.js
├── package.json
└── README.md

---

## 🛠️ Cara Menjalankan

### 1. Clone Repository

git clone https://github.com/username/invoice-generator.git
cd invoice-generator

### 2. Install Dependencies
npm install

### 3. Jalankan Server
node server.js

### 4. Buka di Browser
Akses aplikasi di:
http://localhost:3000


🧮 Algoritma Program (Ringkas)
🔹 Frontend (index.html)
User mengisi form (nama klien, tanggal, item-item).

Saat submit:

Form dikonversi ke JSON.

Dikirim ke endpoint POST /api/invoice/generate.

Jika berhasil:

Menampilkan tautan unduhan file PDF.

Menampilkan notifikasi sukses.

🔹 Backend (invoiceController.js)
Menerima JSON berisi:

clientName

date

items[]: nama item, qty, dan harga

Validasi data.

Buat PDF baru menggunakan PDFKit:

Tulis judul, nama klien, tanggal, dan daftar item + subtotal.

Hitung total harga.

Simpan file ke public/invoices.

Kirim respon JSON dengan path file PDF.

💡 Contoh Struktur JSON yang Dikirim ke Backend :
{
  "clientName": "PT Sumber Jaya",
  "date": "2025-07-01",
  "items": [
    { "name": "Printer Epson", "qty": 2, "price": 1200000 },
    { "name": "Kertas A4 80gsm", "qty": 5, "price": 45000 }
  ]
}


📋 Dependencies
Express.js

PDFKit

Node.js



