// --- KUMPULAN TEKS TARGET (Bisa ditambah sesuai keinginan) ---
const KUMPULAN_TEKS = [
    "Rekayasa Perangkat Lunak adalah satu bidang profesi yang mendalami cara-cara pengembangan perangkat lunak termasuk pembuatan, pemeliharaan, manajemen organisasi pengembangan perangkat lunak dan manajemen kualitas.",
    "Jangan takut gagal karena kegagalan adalah jembatan menuju keahlian tertinggi. Teruslah mengetik dan melatih ingatan otot tanganmu setiap hari agar kode yang kamu buat menjadi semakin bersih dan efisien.",
    "Teknologi web berkembang sangat pesat mulai dari HTML statis hingga aplikasi canggih berbasis cloud yang interaktif. Pengembang modern dituntut untuk selalu adaptif dalam mempelajari sintaksis baru.",
    "Menulis kode pemrograman komputer bukan hanya sekadar memberikan perintah kepada mesin, melainkan seni menyusun logika terstruktur yang dapat memecahkan masalah kehidupan nyata manusia."
];

// --- ELEMEN DOM ---
const textDisplay = document.getElementById('text-display');
const typingInput = document.getElementById('typing-input');
const startBtn = document.getElementById('start-btn');
const liveWpm = document.getElementById('live-wpm');
const liveTimer = document.getElementById('live-timer');
const liveAccuracy = document.getElementById('live-accuracy');

// --- STATE MANAGEMENT APLIKASI ---
let sisaWaktu = 60;
let waktuTotal = 60;
let intervalWaktu = null;
let isBerjalan = false;
let totalKarakterDitekan = 0;

// --- FUNGSI 1: MEMPERSIAPKAN TEKS BARU ---
function acakTandaiTeks() {
    // Ambil kalimat acak dari konstanta
    const teksAcak = KUMPULAN_TEKS[Math.floor(Math.random() * KUMPULAN_TEKS.length)];
    
    // Pecah teks menjadi array karakter, bungkus tiap huruf dengan tag <span>
    textDisplay.innerHTML = '';
    teksAcak.split('').forEach((karakter, indeks) => {
        const span = document.createElement('span');
        span.innerText = karakter;
        // Tandai huruf pertama sebagai target ketikan aktif saat ini
        if (indeks === 0) span.classList.add('current');
        textDisplay.appendChild(span);
    });

    // Reset kolom input mengetik
    typingInput.value = '';
}

// --- FUNGSI 2: LOGIKA UTAMA ANALISIS KETIKAN (REAL-TIME) ---
function analisisKetikan() {
    const arraySpan = textDisplay.querySelectorAll('span');
    const arrayInput = typingInput.value.split('');
    
    let karakterBenar = 0;
    totalKarakterDitekan = arrayInput.length;

    arraySpan.forEach((spanElement, indeks) => {
        const karakterInput = arrayInput[indeks];

        // Kasus A: Karakter belum diketik oleh user
        if (karakterInput == null) {
            spanElement.className = ''; // Bersihkan kelas warna
            if (indeks === arrayInput.length) {
                spanElement.classList.add('current'); // Beri garis bawah penanda aktif
            }
        } 
        // Kasus B: Ketikan user COCOK dengan teks target
        else if (karakterInput === spanElement.innerText) {
            spanElement.className = 'correct';
            karakterBenar++;
        } 
        // Kasus C: Ketikan user SALAH
        else {
            spanElement.className = 'wrong';
        }
    });

    // Perbarui Akurasi Secara Live: (Karakter Benar / Total Ketikan) * 100
    if (totalKarakterDitekan > 0) {
        const persentaseAkurasi = Math.round((karakterBenar / totalKarakterDitekan) * 100);
        liveAccuracy.innerText = `${persentaseAkurasi}%`;
    } else {
        liveAccuracy.innerText = "100%";
    }

    // Perbarui WPM Secara Live
    // Rumus Standar Internasional WPM: (Karakter Benar / 5) / Waktu Berjalan dalam Menit
    const waktuBerjalanDetik = waktuTotal - sisaWaktu;
    if (waktuBerjalanDetik > 0 && karakterBenar > 0) {
        const hitungWpm = Math.round((karakterBenar / 5) / (waktuBerjalanDetik / 60));
        liveWpm.innerText = hitungWpm;
    }

    // CEK SELESAI: Jika user berhasil mengetik seluruh teks target sebelum waktu habis
    if (totalKarakterDitekan === arraySpan.length) {
        akhiriKontes();
    }
}

// --- FUNGSI 3: MENGELOLA TIMER MUNDUR ---
function mulaiTimer() {
    liveTimer.innerText = `${sisaWaktu}s`;
    
    intervalWaktu = setInterval(() => {
        sisaWaktu--;
        liveTimer.innerText = `${sisaWaktu}s`;

        // Kalkulasi ulang WPM setiap detik agar angkanya terus bergerak stabil
        const arraySpan = textDisplay.querySelectorAll('span.correct');
        const waktuBerjalanDetik = waktuTotal - sisaWaktu;
        if (waktuBerjalanDetik > 0 && arraySpan.length > 0) {
            const hitungWpm = Math.round((arraySpan.length / 5) / (waktuBerjalanDetik / 60));
            liveWpm.innerText = hitungWpm;
        }

        // Jika waktu habis
        if (sisaWaktu === 0) {
            akhiriKontes();
        }
    }, 1000);
}

// --- FUNGSI 4: MEMULAI GAME ---
function mulaiKontes() {
    isBerjalan = true;
    sisaWaktu = 60;
    totalKarakterDitekan = 0;
    
    // Reset Skor UI
    liveWpm.innerText = '0';
    liveAccuracy.innerText = '100%';
    
    // Siapkan Teks & Aktifkan Input
    acakTandaiTeks();
    typingInput.removeAttribute('disabled');
    startBtn.setAttribute('disabled', 'true');
    startBtn.innerText = "Kontes Berjalan...";
    
    // Beri fokus otomatis ke textarea agar user bisa langsung mengetik
    typingInput.focus();
    
    // Mulai hitung mundur
    mulaiTimer();
}

// --- FUNGSI 5: MENGAKHIRI GAME ---
function akhiriKontes() {
    clearInterval(intervalWaktu);
    isBerjalan = false;
    
    typingInput.setAttribute('disabled', 'true');
    startBtn.removeAttribute('disabled');
    startBtn.innerText = "Mulai Kontes Lagi 🚀";
    
    alert(`Kontes Selesai!\nKecepatanmu: ${liveWpm.innerText} WPM\nAkurasi: ${liveAccuracy.innerText}`);
}

// --- EVENT LISTENERS ---
startBtn.addEventListener('click', mulaiKontes);

// Deteksi input ketikan user secara real-time
typingInput.addEventListener('input', () => {
    if (isBerjalan) {
        analisisKetikan();
    }
});
