# ⚡ Speed Typing Test (TypeRacer Clone) dengan Analisis WPM & Akurasi

Proyek aplikasi web interaktif berbasis **Vanilla JavaScript (ES6+)** yang berfungsi untuk menguji kecepatan mengetik (*Words Per Minute*) dan tingkat akurasi ketikan pengguna dalam batas waktu 60 detik. 

Proyek ini dibuat dengan pendekatan kode yang bersih (*clean code*) dan terstruktur, sangat cocok sebagai referensi pembelajaran manipulasi DOM tingkat lanjut serta logika pemrosesan string (*string matching*) secara *real-time*.

---

## 🚀 Fitur Utama

*   **Real-time Character Matching:** Teks target dipecah menjadi sekumpulan komponen huruf (`<span>`) secara dinamis. Warna huruf akan berubah secara instan:
    *   **Hijau:** Jika karakter yang diketik benar.
    *   **Merah:** Jika terjadi kesalahan ketik (*typo*).
    *   **Garis Bawah Oranye:** Penanda posisi karakter aktif yang harus diketik saat ini.
*   **Live WPM Calculation:** Menghitung kecepatan mengetik menggunakan Rumus Standar Internasional:
    $$WPM = \frac{\text{Jumlah Karakter Benar} / 5}{\text{Waktu Berjalan (Menit)}}$$
    Angka WPM diperbarui secara *real-time* setiap kali pengguna menekan tombol keyboard dan setiap detik berjalan.
*   **Live Accuracy Analytics:** Menampilkan persentase ketepatan jari secara langsung dengan membandingkan rasio karakter yang benar terhadap total tombol yang telah ditekan.
*   **Smart Memory Cleanup:** Menghentikan *interval* waktu (*timer*) dengan aman dan mencegah kebocoran memori (*memory leak*) pada browser setelah sesi kontes berakhir atau teks berhasil diselesaikan sepenuhnya.
*   **Auto-Focus Input:** Kolom teks otomatis mendapatkan fokus kursor segera setelah tombol "Mulai Kontes" diklik demi kenyamanan pengalaman pengguna (*UX*).

---

## 📂 Struktur Folder Proyek

```text
├── index.html       # Struktur dasar aplikasi, dashboard skor, dan area input
├── style.css        # Tema warna gelap (Dark Mode) modern dan gaya status karakter (.correct, .wrong, .current)
└── script.js        # Logika utama: timer, pengacak kalimat, analitik WPM, dan manipulasi DOM
