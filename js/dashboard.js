/**
 * Admin / Teacher Dashboard CRUD Logic
 * Fitur: Bebas Password/PIN, Upload Gambar Latar (Viewport & Kotak), Tambah/Hapus Slide
 */
class Dashboard {
    // Membuka modal langsung tanpa verifikasi password/PIN
    static openModal() {
        AudioEngine.playSound('click');
        const modal = document.getElementById("dashboard-modal");
        if (!modal) return;
        this.populateSlideSelector();
        this.loadSlideEditor(GameEngine.currentSlideId);
        modal.classList.add("active");
    }

    static closeModal() {
        AudioEngine.playSound('click');
        const modal = document.getElementById("dashboard-modal");
        if (modal) modal.classList.remove("active");
    }

    static populateSlideSelector(selectedId = null) {
        const select = document.getElementById("slide-selector");
        if (!select) return;
        const targetId = selectedId || GameEngine.currentSlideId;
        
        select.innerHTML = GameEngine.slidesData.map(s => `
            <option value="${s.id}" ${s.id === targetId ? 'selected' : ''}>
                Slide ${s.id}: ${s.title ? s.title.substring(0, 22) : 'Tanpa Judul'}... (${s.type.toUpperCase()})
            </option>
        `).join('');
    }

    static loadSlideEditor(slideId) {
        const id = parseInt(slideId, 10);
        const slide = GameEngine.slidesData.find(s => s.id === id);
        const form = document.getElementById("dash-editor-form");
        if (!slide || !form) return;

        let formHtml = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <h3>Edit Slide ${slide.id} (${slide.type.toUpperCase()})</h3>
                <button type="button" class="btn btn-sm" style="background:#ef4444; color:white;" onclick="Dashboard.deleteSlide(${slide.id})">
                    <i class="fa-solid fa-trash"></i> Hapus Slide
                </button>
            </div>
            <hr class="mb-3">
            
            <div class="form-group">
                <label>Judul Slide:</label>
                <input type="text" id="edit-title" class="form-control" value="${slide.title || ''}">
            </div>
            <div class="form-group">
                <label>Sub-Judul / Label:</label>
                <input type="text" id="edit-subtitle" class="form-control" value="${slide.subtitle || ''}">
            </div>

            <!-- HIASAN & PENGATURAN BACKGROUND LATAR BELAKANG -->
            <div style="background:#f0fdf4; border:2px solid #86efac; padding:14px; border-radius:12px; margin-bottom:15px;">
                <h4 style="color:#166534; font-size:0.95rem; margin-bottom:10px;">🎨 Hiasan & Background Latar Belakang</h4>
                
                <div class="form-group">
                    <label>Avatar / Emoji Maskot:</label>
                    <div style="display:flex; gap:8px; align-items:center;">
                        <input type="text" id="edit-avatar" class="form-control" style="width:80px; text-align:center; font-size:1.3rem;" value="${slide.avatar || '👑'}">
                        <small style="color:#475569;">Preset: 
                            <span style="cursor:pointer; font-size:1.2rem; margin:0 2px;" onclick="document.getElementById('edit-avatar').value='👑'">👑</span>
                            <span style="cursor:pointer; font-size:1.2rem; margin:0 2px;" onclick="document.getElementById('edit-avatar').value='🌳'">🌳</span>
                            <span style="cursor:pointer; font-size:1.2rem; margin:0 2px;" onclick="document.getElementById('edit-avatar').value='🍃'">🍃</span>
                            <span style="cursor:pointer; font-size:1.2rem; margin:0 2px;" onclick="document.getElementById('edit-avatar').value='🏰'">🏰</span>
                            <span style="cursor:pointer; font-size:1.2rem; margin:0 2px;" onclick="document.getElementById('edit-avatar').value='🌊'">🌊</span>
                            <span style="cursor:pointer; font-size:1.2rem; margin:0 2px;" onclick="document.getElementById('edit-avatar').value='🌟'">🌟</span>
                        </small>
                    </div>
                </div>

                <div class="form-group">
                    <label>Gambar Banner Konten (PNG/JPG):</label>
                    <input type="file" class="form-control" accept="image/*" onchange="Dashboard.handleImageUpload(event)">
                    <input type="hidden" id="edit-image-url" value="${slide.imageUrl || ''}">
                    <div id="image-preview-container" style="margin-top:6px;">
                        ${slide.imageUrl ? `<img src="${slide.imageUrl}" style="max-height:80px; border-radius:8px; border:1px solid #ccc;"> <button type="button" class="btn btn-sm btn-secondary" onclick="Dashboard.removeImage()">Hapus Gambar</button>` : '<small style="color:#64748b;">Belum ada gambar konten.</small>'}
                    </div>
                </div>

                <!-- 1. BACKGROUND LUAR (DI BELAKANG KOTAK) -->
                <hr style="margin:12px 0; border-top:1px dashed #86efac;">
                <h5 style="color:#15803d; font-size:0.9rem; margin-bottom:8px;">🏞️ Latar Belakang Luar (Di Belakang Kotak / Game Screen)</h5>
                
                <div class="form-group">
                    <label>Unggah Gambar Background Belakang Kotak (PNG/JPG):</label>
                    <input type="file" class="form-control" accept="image/*" onchange="Dashboard.handleViewportBgUpload(event)">
                    <input type="hidden" id="edit-viewport-bg-image" value="${slide.viewportBgImage || ''}">
                    <div id="viewport-bg-preview-container" style="margin-top:6px;">
                        ${slide.viewportBgImage ? `<img src="${slide.viewportBgImage}" style="max-height:80px; border-radius:8px; border:1px solid #ccc;"> <button type="button" class="btn btn-sm btn-secondary" onclick="Dashboard.removeViewportBgImage()">Hapus Background Belakang Kotak</button>` : '<small style="color:#64748b;">Menggunakan background luar standar.</small>'}
                    </div>
                </div>

                <div class="form-group">
                    <label>Warna Latar Belakang Luar (Jika Tanpa Gambar):</label>
                    <input type="color" id="edit-viewport-bg-color" class="form-control" style="height:38px; width:80px; cursor:pointer;" value="${slide.viewportBgColor || '#0f172a'}">
                </div>

                <!-- 2. BACKGROUND DALAM KOTAK SLIDE -->
                <hr style="margin:12px 0; border-top:1px dashed #86efac;">
                <h5 style="color:#15803d; font-size:0.9rem; margin-bottom:8px;">📜 Latar Belakang Dalam Kotak Slide</h5>
                
                <div class="form-group">
                    <label>Unggah Gambar Background Dalam Kotak (PNG/JPG):</label>
                    <input type="file" class="form-control" accept="image/*" onchange="Dashboard.handleBgUpload(event)">
                    <input type="hidden" id="edit-bg-image" value="${slide.bgImage || ''}">
                    <div id="bg-preview-container" style="margin-top:6px;">
                        ${slide.bgImage ? `<img src="${slide.bgImage}" style="max-height:80px; border-radius:8px; border:1px solid #ccc;"> <button type="button" class="btn btn-sm btn-secondary" onclick="Dashboard.removeBgImage()">Hapus Background Kotak</button>` : '<small style="color:#64748b;">Menggunakan background kotak standar.</small>'}
                    </div>
                </div>

                <div class="form-group">
                    <label>Warna Latar Belakang Kotak (Jika Tanpa Gambar):</label>
                    <input type="color" id="edit-bg-color" class="form-control" style="height:38px; width:80px; cursor:pointer;" value="${slide.bgColor || '#fffdf5'}">
                </div>
            </div>
        `;

        if (slide.type === 'quiz') {
            formHtml += `
                <div class="form-group">
                    <label>Pertanyaan / Soal:</label>
                    <textarea id="edit-question" class="form-control">${slide.question || ''}</textarea>
                </div>
                <h4 class="mt-3 mb-2">Pilihan Jawaban (3 Opsi):</h4>
            `;
            (slide.options || []).forEach((opt, idx) => {
                formHtml += `
                    <div class="option-edit-box">
                        <label>Opsi ${opt.id}:</label>
                        <input type="text" id="edit-opt-text-${idx}" class="form-control mb-1" value="${opt.text || ''}">
                        <div class="radio-correct">
                            <input type="radio" name="correct-opt" id="opt-correct-${idx}" value="${idx}" ${opt.isCorrect ? 'checked' : ''}>
                            <label for="opt-correct-${idx}">Set sebagai Kunci Jawaban Benar</label>
                        </div>
                    </div>
                `;
            });
        } else {
            formHtml += `
                <div class="form-group">
                    <label>Isi Teks / Materi (Mendukung HTML):</label>
                    <textarea id="edit-content" class="form-control" style="min-height:100px;">${slide.content || ''}</textarea>
                </div>
            `;
        }

        form.innerHTML = formHtml;
    }

    // Convert gambar konten ke Base64
    static handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Str = e.target.result;
            document.getElementById("edit-image-url").value = base64Str;
            document.getElementById("image-preview-container").innerHTML = `
                <img src="${base64Str}" style="max-height:80px; border-radius:8px; border:1px solid #ccc;">
                <button type="button" class="btn btn-sm btn-secondary" onclick="Dashboard.removeImage()">Hapus Gambar</button>
            `;
        };
        reader.readAsDataURL(file);
    }

    static removeImage() {
        document.getElementById("edit-image-url").value = "";
        document.getElementById("image-preview-container").innerHTML = '<small style="color:#64748b;">Gambar dihapus.</small>';
    }

    // Convert gambar background LUAR (belakang kotak) ke Base64
    static handleViewportBgUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Str = e.target.result;
            document.getElementById("edit-viewport-bg-image").value = base64Str;
            document.getElementById("viewport-bg-preview-container").innerHTML = `
                <img src="${base64Str}" style="max-height:80px; border-radius:8px; border:1px solid #ccc;">
                <button type="button" class="btn btn-sm btn-secondary" onclick="Dashboard.removeViewportBgImage()">Hapus Background Belakang Kotak</button>
            `;
        };
        reader.readAsDataURL(file);
    }

    static removeViewportBgImage() {
        document.getElementById("edit-viewport-bg-image").value = "";
        document.getElementById("viewport-bg-preview-container").innerHTML = '<small style="color:#64748b;">Background luar dihapus.</small>';
    }

    // Convert gambar background DALAM KOTAK ke Base64
    static handleBgUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Str = e.target.result;
            document.getElementById("edit-bg-image").value = base64Str;
            document.getElementById("bg-preview-container").innerHTML = `
                <img src="${base64Str}" style="max-height:80px; border-radius:8px; border:1px solid #ccc;">
                <button type="button" class="btn btn-sm btn-secondary" onclick="Dashboard.removeBgImage()">Hapus Background Kotak</button>
            `;
        };
        reader.readAsDataURL(file);
    }

    static removeBgImage() {
        document.getElementById("edit-bg-image").value = "";
        document.getElementById("bg-preview-container").innerHTML = '<small style="color:#64748b;">Background kotak dihapus.</small>';
    }

    static addNewSlide() {
        const type = prompt("Pilih Jenis Slide Baru:\n1 = Materi\n2 = Quiz", "1");
        if (!type) return;

        const newId = GameEngine.slidesData.length > 0 ? Math.max(...GameEngine.slidesData.map(s => s.id)) + 1 : 1;
        const isQuiz = type === "2";

        const newSlide = {
            id: newId,
            type: isQuiz ? "quiz" : "materi",
            title: isQuiz ? `Kuis Baru #${newId}` : `Materi Baru #${newId}`,
            subtitle: "Sub-judul slide",
            avatar: isQuiz ? "❓" : "📖",
            imageUrl: "",
            viewportBgImage: "",
            viewportBgColor: "#0f172a",
            bgImage: "",
            bgColor: "#fffdf5",
            content: isQuiz ? "" : "Tuliskan isi materi pembelajaran di sini...",
            question: isQuiz ? "Tuliskan pertanyaan kuis di sini?" : "",
            options: isQuiz ? [
                { id: "A", text: "Pilihan A", isCorrect: true },
                { id: "B", text: "Pilihan B", isCorrect: false },
                { id: "C", text: "Pilihan C", isCorrect: false }
            ] : [],
            buttons: [{ text: "Lanjut ➡️", target: newId + 1, style: "btn-gold" }]
        };

        GameEngine.slidesData.push(newSlide);
        DataManager.saveSlides(GameEngine.slidesData);
        this.populateSlideSelector(newId);
        this.loadSlideEditor(newId);
        this.showToast(`Slide #${newId} berhasil ditambahkan!`);
    }

    static deleteSlide(slideId) {
        if (GameEngine.slidesData.length <= 1) {
            alert("Tidak bisa menghapus slide terakhir!");
            return;
        }
        if (confirm(`Apakah Anda yakin ingin menghapus Slide #${slideId}?`)) {
            GameEngine.slidesData = GameEngine.slidesData.filter(s => s.id !== slideId);
            DataManager.saveSlides(GameEngine.slidesData);
            const nextSlide = GameEngine.slidesData[0];
            GameEngine.currentSlideId = nextSlide.id;
            GameEngine.renderSlide(nextSlide.id);
            this.populateSlideSelector(nextSlide.id);
            this.loadSlideEditor(nextSlide.id);
            this.showToast(`Slide #${slideId} dihapus.`);
        }
    }

    static saveCurrentSlide() {
        const select = document.getElementById("slide-selector");
        const id = parseInt(select.value, 10);
        const slide = GameEngine.slidesData.find(s => s.id === id);
        if (!slide) return;

        slide.title = document.getElementById("edit-title").value;
        slide.subtitle = document.getElementById("edit-subtitle").value;
        slide.avatar = document.getElementById("edit-avatar").value;
        slide.imageUrl = document.getElementById("edit-image-url").value;
        
        slide.viewportBgImage = document.getElementById("edit-viewport-bg-image").value;
        slide.viewportBgColor = document.getElementById("edit-viewport-bg-color").value;
        
        slide.bgImage = document.getElementById("edit-bg-image").value;
        slide.bgColor = document.getElementById("edit-bg-color").value;

        if (slide.type === 'quiz') {
            slide.question = document.getElementById("edit-question").value;
            const selectedCorrectIdx = parseInt(document.querySelector('input[name="correct-opt"]:checked').value, 10);
            slide.options.forEach((opt, idx) => {
                opt.text = document.getElementById(`edit-opt-text-${idx}`).value;
                opt.isCorrect = (idx === selectedCorrectIdx);
            });
        } else {
            slide.content = document.getElementById("edit-content").value;
        }

        DataManager.saveSlides(GameEngine.slidesData);
        GameEngine.renderSlide(GameEngine.currentSlideId);
        this.showToast("Slide & Background berhasil disimpan!");
        this.closeModal();
    }

    static resetToDefault() {
        if (confirm("Apakah Anda yakin ingin mengembalikan seluruh slide ke materi awal modul?")) {
            GameEngine.slidesData = DataManager.resetSlides();
            GameEngine.renderSlide(GameEngine.currentSlideId);
            this.showToast("Data di-reset ke standar modul.");
            this.closeModal();
        }
    }

    static showToast(msg) {
        const toast = document.getElementById("toast");
        if (!toast) return;
        toast.innerText = msg;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3000);
    }
}