# 🏰 Kingdom of Green — Panduan Penggunaan Website

Selamat datang di **Kingdom of Green**, media pembelajaran interaktif berbasis web yang dirancang untuk mengedukasi siswa mengenai kelestarian lingkungan dan pengelolaan sampah melalui petualangan gamifikasi yang seru!

---

## 📌 Daftar Isi
1. [Fitur Utama](#-fitur-utama)
2. [Panduan untuk Pemain (Siswa)](#-panduan-untuk-pemain-siswa)
3. [Panduan untuk Pengelola (Guru / Admin)](#-panduan-untuk-pengelola-guru--admin)
   - [Mengakses Dashboard Admin](#1-mengakses-dashboard-admin)
   - [Mengedit Teks & Soal Kuis](#2-mengedit-teks--soal-kuis)
   - [Mengganti Emoji & Gambar Hiasan Slide](#3-mengganti-emoji--gambar-hiasan-slide)
   - [Mengubah Latar Belakang (Background)](#4-mengubah-latar-belakang-background)
   - [Menambah & Menghapus Slide](#5-menambah--menghapus-slide)
   - [Reset Data ke Default](#6-reset-data-ke-default)
4. [Struktur Berkas Proyek](#-struktur-berkas-proyek)

---

## 🌟 Fitur Utama

- **Bebas Akses (Tanpa Password):** Pengguna dan guru dapat langsung masuk tanpa hambatan sistem kata sandi.
- **Peta Petualangan Interaktif (World Map):** Membagi alur pembelajaran menjadi 5 wilayah dengan bintang sebagai pengunci progres.
- **Kuis & Feedback Instan:** Soal pilihan ganda yang langsung memberikan respon suara dan efek confeti saat jawaban benar.
- **Visual Kustom Tanpa Server:** Mendukung unggah gambar dari perangkat lokal (*Base64*) yang tersimpan otomatis di *LocalStorage* *browser*.
- **Efek Suara Interaktif (Web Audio API):** Suara klip intuitif untuk klik, jawaban benar, salah, dan perolehan bintang.

---

## 🎮 Panduan untuk Pemain (Siswa)

1. **Mulai Petualangan:**
   - Buka file `index.html` pada peramban web (*Google Chrome, Microsoft Edge, Safari, dll*).
   - Klik tombol **"MULAI PETUALANGAN 🚀"** pada halaman utama.
   - Kamu juga bisa mengklik tombol **"📖 Panduan Bermain"** di sebelah tombol mulai untuk melihat petunjuk ringkas.

2. **Jelajahi Peta Kerajaan:**
   - Kamu akan berada di halaman Peta (*World Map*).
   - Pilih area yang terbuka (dimulai dari *Green Valley*) untuk membaca materi dan menyelesaikan soal kuis.

3. **Mengumpulkan Bintang:**
   - Jawab setiap pertanyaan kuis dengan cermat.
   - Setiap kali menyelesaikan wilayah tantangan, kamu akan membuka 1 Bintang ⭐.
   - Kumpulkan total **5 Bintang** untuk menyelesaikan permainan dan menyelamatkan *Kingdom of Green*!

4. **Mengatur Suara:**
   - Gunakan ikon speaker (🔊) di pojok kanan atas untuk mengaktifkan atau mematikan efek suara (*Sound FX*).

---

## 🛠️ Panduan untuk Pengelola (Guru / Admin)

### 1. Mengakses Dashboard Admin
- Klik tombol **"Edit Materi & Quiz"** (berwarna kuning emas) yang terletak di pojok kanan atas layar.
- Dashboard akan langsung terbuka tanpa memerlukan masukan kata sandi atau PIN.

### 2. Mengedit Teks & Soal Kuis
1. Pada bilah samping (sidebar) sebelah kiri Dashboard, pilih slide yang ingin diubah pada menu **"Pilih Slide untuk Diedit"**.
2. **Slide Materi:**
   - Ubah **Judul Slide**, **Sub-Judul**, dan **Isi Teks / Materi** pada formulir yang tersedia.
3. **Slide Kuis:**
   - Ubah teks **Pertanyaan / Soal**.
   - Masukkan teks opsi pilihan A, B, dan C.
   - Tandai salah satu opsi sebagai kunci jawaban benar melalui tombol *radio button* **"Set sebagai Kunci Jawaban Benar"**.
4. Klik tombol **"Simpan Perubahan"** di pojok kanan bawah modal.

### 3. Mengganti Emoji & Gambar Hiasan Slide
1. Pilih slide yang akan diberi dekorasi visual.
2. **Emoji Maskot / Avatar:**
   - Masukkan emoji pada kolom *Avatar / Emoji Maskot* atau klik salah satu preset emoji yang tersedia (👑, 🌳, 🍃, 🏰, 🌊, 🌟).
3. **Unggah Gambar Banner Konten:**
   - Pada bagian **"Gambar Banner Konten (PNG/JPG)"**, klik tombol pilih file.
   - Pilih gambar ilustrasi dari perangkat kamu. Gambar akan otomatis dipasang sebagai banner di atas teks materi.
   - Untuk menghapus gambar, klik **"Hapus Gambar"**.

### 4. Mengubah Latar Belakang (Background)
Di dalam Dashboard Admin, terdapat dua tingkatan pengaturan latar belakang yang dapat disesuaikan per slide:

- **Latar Belakang Luar (Di Belakang Kotak Slide):**
  - Mengubah tampilan area layar luar (`.game-viewport`).
  - Kamu dapat mengunggah **Gambar Background Belakang Kotak** atau memilih **Warna Latar Belakang Luar** menggunakan fitur pemilih warna (*Color Picker*).
- **Latar Belakang Dalam Kotak Slide:**
  - Mengubah tampilan di dalam wadah konten utama (`.slide-card`).
  - Kamu dapat mengunggah gambar latar khusus atau mengubah warna dasarnya.

### 5. Menambah & Menghapus Slide
- **Menambah Slide Baru:**
  1. Klik tombol **"+ Tambah Slide Baru"** pada bilah samping Dashboard.
  2. Pilih jenis slide: ketik `1` untuk **Materi** atau `2` untuk **Quiz**.
  3. Slide baru akan otomatis dibuat dan siap diisi.
- **Menghapus Slide:**
  1. Pilih slide yang ingin dihapus pada menu drop-down.
  2. Klik tombol **"Hapus Slide"** (berwarna merah) di bagian atas formulir editor.
  3. Konfirmasi penghapusan.

### 6. Reset Data ke Default
- Jika ingin mengembalikan seluruh materi, kuis, dan tampilan ke pengaturan standar awal modul, klik tombol **"Reset ke Standar Modul"** di pojok kiri bawah Dashboard.

---

## 📁 Struktur Berkas Proyek

```text
kingdom-of-green/
│
├── index.html          # File utama HTML (Kontainer UI & Modal Panduan/Dashboard)
├── README.md           # Berkas panduan penggunaan
│
├── css/
│   ├── style.css       # Layout global, reset CSS, & tema warna utama
│   ├── components.css  # Desain kartu slide, avatar, tombol opsi, & banner hiasan
│   └── dashboard.css   # Desain modal editor Dashboard Admin
│
└── js/
    ├── data.js         # Data default 30 slide modul & manajemen LocalStorage
    ├── audio.js        # Efek suara sintetis menggunakan Web Audio API
    ├── game.js         # Engine game (rendering slide, peta dunia, & modal panduan)
    └── dashboard.js    # Logika CRUD Dashboard Admin & pengunggah gambar (Base64)
```

---
*Kerajaan Lingkungan membutuhkan bantuanmu. Selamat belajar dan mengajar bersama Kingdom of Green!* 🌿👑