/**
 * Data Storage & Default 30 Slides Schema for Kingdom of Green
 */
const STORAGE_KEY = "KINGDOM_OF_GREEN_SLIDES_V2";

const DEFAULT_SLIDES = [
    // BAGIAN 1: PEMBUKAAN
    // Di dalam array slidesData pada js/data.js
{
    id: 1,
    type: "cover",
    title: "KINGDOM OF GREEN",
    subtitle: "Petualangan Menyelamatkan Kerajaan Lingkungan",
    avatar: "👑",
    imageUrl: "",
    content: "Selamat datang di Kingdom of Green! Kerajaan sedang dalam bahaya karena lingkungan mulai kotor. Ayo bantu menyelamatkan kerajaan dengan mempelajari cara menyayangi lingkungan!",
    buttons: [
        { text: "MULAI PETUALANGAN 🚀", target: 2, style: "btn-gold" },
        { text: "📖 Panduan Bermain", target: "guide", style: "btn-secondary" } // Tombol ditaro di samping
    ]
},


    {
        id: 2,
        title: "Misi Penyelamatan Kerajaan",
        subtitle: "Panduan & Aturan Bermain",
        type: "info",
        avatar: "📜",
        content: "Untuk menyelamatkan kerajaan, kamu harus melewati lima wilayah. Setiap wilayah memiliki materi dan satu tantangan. Jawablah dengan benar untuk mendapatkan bintang penghargaan. Kumpulkan 5 bintang dan jadilah Pahlawan Lingkungan!",
        buttons: [
            { text: "KEMBALI ⬅️", target: 1, style: "btn-secondary" },
            { text: "LIHAT PETA 🗺️", target: 3, style: "btn-gold" }
        ]
    },
    {
        id: 3,
        title: "Peta Petualangan Kingdom of Green",
        subtitle: "Pilih Wilayah Kerajaan",
        type: "world_map",
        buttons: [
            { text: "KEMBALI KE COVER 🏠", target: 1, style: "btn-secondary" }
        ]
    },

    // BAGIAN 2: MAP 1 - GREEN VALLEY
    {
        id: 4,
        title: "MAP 1: GREEN VALLEY",
        subtitle: "Mengenal Lingkungan",
        type: "materi",
        avatar: "🌳",
        content: "Lingkungan adalah segala sesuatu yang ada di sekitar kita dan memengaruhi kehidupan sehari-hari.<br><br>Contoh lingkungan: <b>Rumah, Sekolah, Taman, Sungai, dan Tempat Bermain</b>.<br>Lingkungan yang bersih membuat kita merasa nyaman ketika belajar dan bermain.",
        materiCards: [
            { icon: "fa-house", title: "Rumah" },
            { icon: "fa-school", title: "Sekolah" },
            { icon: "fa-tree", title: "Taman" },
            { icon: "fa-water", title: "Sungai" }
        ],
        buttons: [
            { text: "PETA KERAJAAN 🗺️", target: 3, style: "btn-secondary" },
            { text: "LANJUTKAN MISI ⚔️", target: 5, style: "btn-gold" }
        ]
    },
    {
        id: 5,
        title: "Tantangan 1: Kenali Lingkungan!",
        subtitle: "Soal Map 1",
        type: "quiz",
        avatar: "❓",
        question: "Kesatria kecil, bantu kerajaan menjawab pertanyaan berikut! Manakah yang termasuk contoh lingkungan di sekitar kita?",
        options: [
            { id: "A", text: "Rumah, sekolah, dan taman", isCorrect: true, targetCorrect: 6, targetWrong: 7 },
            { id: "B", text: "Sepatu, pensil, dan tas", isCorrect: false, targetCorrect: 6, targetWrong: 7 },
            { id: "C", text: "Buku, penghapus, dan penggaris", isCorrect: false, targetCorrect: 6, targetWrong: 7 }
        ],
        buttons: [
            { text: "KEMBALI KE MATERI 📖", target: 4, style: "btn-secondary" }
        ]
    },
    {
        id: 6,
        title: "HEBAT! KAMU BENAR!",
        subtitle: "Jawaban Benar Tantangan 1",
        type: "feedback_correct",
        avatar: "🌟",
        content: "Selamat! Jawaban kamu benar! 🏡 🏫 🛝<br>Rumah, sekolah, dan taman merupakan contoh lingkungan di sekitar kita. Kamu berhasil mengembalikan keindahan Green Valley!",
        rewardName: "⭐ BINTANG ALAM ⭐",
        buttons: [
            { text: "AMBIL REWARD 🌟", target: 8, style: "btn-gold" }
        ]
    },
    {
        id: 7,
        title: "YUK, COBA LAGI!",
        subtitle: "Jawaban Salah Tantangan 1",
        type: "feedback_wrong",
        avatar: "💡",
        content: "Belum tepat, ayo belajar lagi!<br>Ingat, lingkungan adalah segala sesuatu yang ada di sekitar kita, seperti rumah, sekolah, taman, dan sungai. Jangan menyerah!",
        buttons: [
            { text: "PELAJARI LAGI 📖", target: 4, style: "btn-secondary" },
            { text: "COBA LAGI 🔄", target: 5, style: "btn-gold" }
        ]
    },
    {
        id: 8,
        title: "Bintang Alam Berhasil Didapatkan!",
        subtitle: "Reward Map 1",
        type: "reward",
        starMap: 1,
        content: "Yeay! Kamu berhasil menyelesaikan tantangan pertama! Green Valley kini kembali indah dan nyaman.",
        buttons: [
            { text: "LIHAT PETA 🗺️", target: 3, style: "btn-secondary" },
            { text: "LANJUT KE MAP 2 🚀", target: 9, style: "btn-gold" }
        ]
    },

    // BAGIAN 3: MAP 2 - ORGANIC FOREST
    {
        id: 9,
        title: "MAP 2: ORGANIC FOREST",
        subtitle: "Mengenal Jenis Sampah",
        type: "materi",
        avatar: "🍃",
        content: "Tahukah kamu bahwa sampah memiliki dua jenis?<br><b>1. Sampah Organik:</b> Berasal dari makhluk hidup & mudah terurai alami (kulit pisang, daun kering, sisa sayuran). Bermanfaat untuk kompos.<br><b>2. Sampah Anorganik:</b> Sulit terurai secara alami (botol plastik, bungkus makanan, kaleng, kaca).",
        buttons: [
            { text: "PETA KERAJAAN 🗺️", target: 3, style: "btn-secondary" },
            { text: "LANJUTKAN MISI ⚔️", target: 10, style: "btn-gold" }
        ]
    },
    {
        id: 10,
        title: "Tantangan 2: Penjaga Hutan!",
        subtitle: "Soal Map 2",
        type: "quiz",
        avatar: "❓",
        question: "Wah! Ada sampah yang harus dipilah di Organic Forest. Manakah kelompok yang seluruhnya termasuk sampah organik?",
        options: [
            { id: "A", text: "Botol plastik, kaleng, dan kaca", isCorrect: false, targetCorrect: 11, targetWrong: 12 },
            { id: "B", text: "Kulit pisang, daun kering, dan sisa sayuran", isCorrect: true, targetCorrect: 11, targetWrong: 12 },
            { id: "C", text: "Bungkus makanan, botol plastik, dan kaleng", isCorrect: false, targetCorrect: 11, targetWrong: 12 }
        ],
        buttons: [
            { text: "KEMBALI KE MATERI 📖", target: 9, style: "btn-secondary" }
        ]
    },
    {
        id: 11,
        title: "LUAR BIASA! JAWABANMU BENAR!",
        subtitle: "Jawaban Benar Tantangan 2",
        type: "feedback_correct",
        avatar: "🌟",
        content: "Selamat! Jawaban kamu benar! 🍌 🍂 🥦<br>Kulit pisang, daun kering, dan sisa sayuran merupakan sampah organik. Kamu berhasil membantu penghuni Organic Forest memilah sampah!",
        rewardName: "⭐ BINTANG PEMILAH ⭐",
        buttons: [
            { text: "AMBIL REWARD 🌟", target: 13, style: "btn-gold" }
        ]
    },
    {
        id: 12,
        title: "OOPS! BELUM TEPAT!",
        subtitle: "Jawaban Salah Tantangan 2",
        type: "feedback_wrong",
        avatar: "💡",
        content: "Belum tepat, ayo belajar lagi!<br>Ingat:<br>• Organik: kulit pisang, daun kering, sisa sayuran.<br>• Anorganik: botol plastik, kaleng, kaca.",
        buttons: [
            { text: "PELAJARI LAGI 📖", target: 9, style: "btn-secondary" },
            { text: "COBA LAGI 🔄", target: 10, style: "btn-gold" }
        ]
    },
    {
        id: 13,
        title: "Bintang Pemilah Berhasil Didapatkan!",
        subtitle: "Reward Map 2",
        type: "reward",
        starMap: 2,
        content: "Hebat! Kamu sudah berhasil menyelamatkan Organic Forest. Kini sampah di hutan dapat dipilah sesuai jenisnya.",
        buttons: [
            { text: "LIHAT PETA 🗺️", target: 3, style: "btn-secondary" },
            { text: "LANJUT KE MAP 3 🚀", target: 14, style: "btn-gold" }
        ]
    },

    // BAGIAN 4: MAP 3 - HEALTHY KINGDOM
    {
        id: 14,
        title: "MAP 3: HEALTHY KINGDOM",
        subtitle: "Manfaat Menjaga Kebersihan",
        type: "materi",
        avatar: "🏰",
        content: "Mengapa kita harus menjaga kebersihan lingkungan?<br>1. Membuat nyaman belajar & bermain.<br>2. Menjaga kesehatan keluarga.<br>3. Mengurangi sarang lalat & nyamuk.<br>4. Mencegah saluran air tersumbat.<br>5. Lingkungan terlihat lebih indah.",
        buttons: [
            { text: "PETA KERAJAAN 🗺️", target: 3, style: "btn-secondary" },
            { text: "LANJUTKAN MISI ⚔️", target: 15, style: "btn-gold" }
        ]
    },
    {
        id: 15,
        title: "Tantangan 3: Selamatkan Healthy Kingdom!",
        subtitle: "Soal Map 3",
        type: "quiz",
        avatar: "❓",
        question: "Kerajaan membutuhkan bantuanmu! Apa manfaat menjaga kebersihan lingkungan?",
        options: [
            { id: "A", text: "Membuat lingkungan menjadi kotor", isCorrect: false, targetCorrect: 16, targetWrong: 17 },
            { id: "B", text: "Menyebabkan banyak sampah berserakan", isCorrect: false, targetCorrect: 16, targetWrong: 17 },
            { id: "C", text: "Membuat lingkungan nyaman dan membantu menjaga kesehatan", isCorrect: true, targetCorrect: 16, targetWrong: 17 }
        ],
        buttons: [
            { text: "KEMBALI KE MATERI 📖", target: 14, style: "btn-secondary" }
        ]
    },
    {
        id: 16,
        title: "SELAMAT! KAMU HEBAT!",
        subtitle: "Jawaban Benar Tantangan 3",
        type: "feedback_correct",
        avatar: "🌟",
        content: "Benar sekali! Lingkungan yang bersih membuat kita nyaman belajar dan bermain serta membantu menjaga kesehatan. Kamu berhasil mengembalikan kesehatan Healthy Kingdom!",
        rewardName: "⭐ BINTANG KESEHATAN ⭐",
        buttons: [
            { text: "AMBIL REWARD 🌟", target: 18, style: "btn-gold" }
        ]
    },
    {
        id: 17,
        title: "AYO, JANGAN MENYERAH!",
        subtitle: "Jawaban Salah Tantangan 3",
        type: "feedback_wrong",
        avatar: "💡",
        content: "Belum tepat, ayo belajar lagi!<br>Ingat, lingkungan yang bersih membuat kita nyaman, sehat, dan dapat mengurangi tempat berkembang biaknya lalat dan nyamuk.",
        buttons: [
            { text: "PELAJARI LAGI 📖", target: 14, style: "btn-secondary" },
            { text: "COBA LAGI 🔄", target: 15, style: "btn-gold" }
        ]
    },
    {
        id: 18,
        title: "Bintang Kesehatan Berhasil Didapatkan!",
        subtitle: "Reward Map 3",
        type: "reward",
        starMap: 3,
        content: "Hebat! Healthy Kingdom kini kembali sehat, bersih, dan nyaman. Teruskan petualanganmu!",
        buttons: [
            { text: "LIHAT PETA 🗺️", target: 3, style: "btn-secondary" },
            { text: "LANJUT KE MAP 4 🚀", target: 19, style: "btn-gold" }
        ]
    },

    // BAGIAN 5: MAP 4 - RIVER OF DANGER
    {
        id: 19,
        title: "MAP 4: RIVER OF DANGER",
        subtitle: "Bahaya Membuang Sampah Sembarangan",
        type: "materi",
        avatar: "🌊",
        content: "Apa yang terjadi jika membuang sampah sembarangan?<br>• Lingkungan kotor & menimbulkan bau busuk.<br>• Tempat berkembangnya kuman & hewan pembawa penyakit.<br>• Menyumbat selokan sehingga meningkatkan risiko banjir.<br>• Sampah plastik mencemari air & membahayakan hewan.",
        buttons: [
            { text: "PETA KERAJAAN 🗺️", target: 3, style: "btn-secondary" },
            { text: "LANJUTKAN MISI ⚔️", target: 20, style: "btn-gold" }
        ]
    },
    {
        id: 20,
        title: "Tantangan 4: Selamatkan Sungai!",
        subtitle: "Soal Map 4",
        type: "quiz",
        avatar: "❓",
        question: "Waduh! Sungai kerajaan dipenuhi sampah. Apa yang dapat terjadi jika sampah menyumbat selokan?",
        options: [
            { id: "A", text: "Aliran air menjadi lancar", isCorrect: false, targetCorrect: 21, targetWrong: 22 },
            { id: "B", text: "Meningkatkan risiko banjir ketika hujan turun", isCorrect: true, targetCorrect: 21, targetWrong: 22 },
            { id: "C", text: "Air menjadi semakin bersih", isCorrect: false, targetCorrect: 21, targetWrong: 22 }
        ],
        buttons: [
            { text: "KEMBALI KE MATERI 📖", target: 19, style: "btn-secondary" }
        ]
    },
    {
        id: 21,
        title: "YEAAY! KAMU BERHASIL!",
        subtitle: "Jawaban Benar Tantangan 4",
        type: "feedback_correct",
        avatar: "🌟",
        content: "Jawaban kamu benar! Sampah yang menyumbat selokan dapat menghambat aliran air dan meningkatkan risiko banjir ketika hujan turun. Kamu berhasil menyelamatkan River of Danger!",
        rewardName: "⭐ BINTANG PENYELAMAT ⭐",
        buttons: [
            { text: "AMBIL REWARD 🌟", target: 23, style: "btn-gold" }
        ]
    },
    {
        id: 22,
        title: "BELUM BERHASIL!",
        subtitle: "Jawaban Salah Tantangan 4",
        type: "feedback_wrong",
        avatar: "💡",
        content: "Belum tepat, ayo belajar lagi!<br>Ingat, sampah yang menyumbat selokan dapat menghambat aliran air. Akibatnya, risiko banjir dapat meningkat ketika hujan turun.",
        buttons: [
            { text: "PELAJARI LAGI 📖", target: 19, style: "btn-secondary" },
            { text: "COBA LAGI 🔄", target: 20, style: "btn-gold" }
        ]
    },
    {
        id: 23,
        title: "Bintang Penyelamat Berhasil Didapatkan!",
        subtitle: "Reward Map 4",
        type: "reward",
        starMap: 4,
        content: "Selamat! Kamu berhasil menyelamatkan sungai kerajaan. Kini River of Danger kembali menjadi sungai yang bersih dan nyaman.",
        buttons: [
            { text: "LIHAT PETA 🗺️", target: 3, style: "btn-secondary" },
            { text: "LANJUT KE MAP 5 🚀", target: 24, style: "btn-gold" }
        ]
    },

    // BAGIAN 6: MAP 5 - NATURE CASTLE
    {
        id: 24,
        title: "MAP 5: NATURE CASTLE",
        subtitle: "Cara Menyayangi Lingkungan",
        type: "materi",
        avatar: "🏰",
        content: "Bagaimana cara kita menyayangi lingkungan?<br>1. Membuang sampah pada tempatnya.<br>2. Memilah sampah organik dan anorganik.<br>3. Melaksanakan piket kelas.<br>4. Membersihkan halaman & menyiram tanaman.<br>5. Mengurangi penggunaan plastik sekali pakai.",
        buttons: [
            { text: "PETA KERAJAAN 🗺️", target: 3, style: "btn-secondary" },
            { text: "LANJUTKAN MISI ⚔️", target: 25, style: "btn-gold" }
        ]
    },
    {
        id: 25,
        title: "Tantangan Terakhir: Jadilah Pahlawan!",
        subtitle: "Soal Map 5",
        type: "quiz",
        avatar: "❓",
        question: "Ini adalah tantangan terakhir! Manakah tindakan yang menunjukkan kebiasaan menyayangi lingkungan?",
        options: [
            { id: "A", text: "Membuang sampah ke sungai", isCorrect: false, targetCorrect: 26, targetWrong: 27 },
            { id: "B", text: "Membiarkan sampah berserakan di kelas", isCorrect: false, targetCorrect: 26, targetWrong: 27 },
            { id: "C", text: "Membuang sampah pada tempatnya dan merawat tanaman", isCorrect: true, targetCorrect: 26, targetWrong: 27 }
        ],
        buttons: [
            { text: "KEMBALI KE MATERI 📖", target: 24, style: "btn-secondary" }
        ]
    },
    {
        id: 26,
        title: "SELAMAT! KAMU PAHLAWAN LINGKUNGAN!",
        subtitle: "Jawaban Benar Tantangan 5",
        type: "feedback_correct",
        avatar: "🌟",
        content: "Jawaban kamu benar! Membuang sampah pada tempatnya dan merawat tanaman merupakan contoh kebiasaan menyayangi lingkungan. Kamu berhasil menyelesaikan seluruh tantangan!",
        rewardName: "⭐ BINTANG PAHLAWAN ⭐",
        buttons: [
            { text: "KUMPULKAN BINTANG 🏆", target: 28, style: "btn-gold" }
        ]
    },
    {
        id: 27,
        title: "SEDIKIT LAGI! COBA LAGI!",
        subtitle: "Jawaban Salah Tantangan 5",
        type: "feedback_wrong",
        avatar: "💡",
        content: "Belum tepat, ayo belajar lagi!<br>Ingat, kita dapat menyayangi lingkungan dengan membuang sampah pada tempatnya, merawat tanaman, dan melaksanakan piket kelas.",
        buttons: [
            { text: "PELAJARI LAGI 📖", target: 24, style: "btn-secondary" },
            { text: "COBA LAGI 🔄", target: 25, style: "btn-gold" }
        ]
    },

    // BAGIAN 7: PENYELESAIAN & REFLEKSI
    {
        id: 28,
        title: "SELAMAT! MISI BERHASIL DISELESAIKAN!",
        subtitle: "Kemenangan Kingdom of Green",
        type: "victory",
        avatar: "🏆",
        content: "Horeee! Kamu berhasil menyelesaikan 5 tantangan! Sekarang Kingdom of Green kembali bersih, sehat, indah, dan nyaman.<br><br>Kamu telah mendapatkan 5 Bintang Penghargaan. Mulai sekarang, kamu resmi menjadi <b>PAHLAWAN LINGKUNGAN</b>!",
        buttons: [
            { text: "MAIN LAGI 🔄", target: 3, style: "btn-secondary" },
            { text: "LANJUT KE REFLEKSI 📜", target: 29, style: "btn-gold" }
        ]
    },
    {
        id: 29,
        title: "Ayo, Refleksikan Petualanganmu!",
        subtitle: "Jurnal Refleksi Peserta Didik",
        type: "refleksi",
        buttons: [
            { text: "SELESAI & CETAK SERTIFIKAT 🎓", target: 30, style: "btn-gold" }
        ]
    },
    {
        id: 30,
        title: "TERIMA KASIH, PAHLAWAN LINGKUNGAN!",
        subtitle: "Penutup",
        type: "penutup",
        avatar: "🌟",
        content: "Petualangan kita telah selesai. Ingatlah, lingkungan yang bersih dan sehat dimulai dari kebiasaan kecil yang kita lakukan setiap hari.<br><br><h3 class='text-green text-center'>&quot;LINGKUNGAN BERSIH, HIDUP SEHAT, HATI GEMBIRA!&quot;</h3>",
        buttons: [
            { text: "KEMBALI KE AWAL 🏠", target: 1, style: "btn-gold" }
        ]
    }
];

// LocalStorage Helper
class DataManager {
    static getSlides() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.warn("LocalStorage tidak dapat diakses, menggunakan data standar:", e);
        }
        return JSON.parse(JSON.stringify(DEFAULT_SLIDES));
    }

    static saveSlides(slides) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(slides));
        } catch (e) {
            console.warn("Gagal menyimpan ke LocalStorage:", e);
        }
    }

    static resetSlides() {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            console.warn("Gagal menghapus LocalStorage:", e);
        }
        return JSON.parse(JSON.stringify(DEFAULT_SLIDES));
    }
}
