/**
 * Admin / Teacher Dashboard CRUD Logic
 * Fitur: Upload Gambar, Drag & Drop Reorder, Toggle Mode Gambar Poster Utuh
 */
class Dashboard {
    static draggedIndex = null;

    static openModal() {
        if (typeof AudioEngine !== 'undefined') AudioEngine.playSound('click');
        const modal = document.getElementById("dashboard-modal");
        if (!modal) return;
        this.populateSlideManager();
        this.loadSlideEditor(GameEngine.currentSlideId);
        modal.classList.add("active");
    }

    static closeModal() {
        if (typeof AudioEngine !== 'undefined') AudioEngine.playSound('click');
        const modal = document.getElementById("dashboard-modal");
        if (modal) modal.classList.remove("active");
    }

    static populateSlideManager() {
        const container = document.getElementById("slide-manager-container");
        if (!container) return;

        container.innerHTML = `
            <label style="display:block; font-weight:700; font-size:0.85rem; color:#475569; margin-bottom:8px;">
                📜 Susunan Slide (Seret / Drag untuk Mengatur Urutan):
            </label>
            <ul id="drag-slide-list" class="drag-list">
                ${GameEngine.slidesData.map((s, idx) => `
                    <li class="drag-item ${s.id === GameEngine.currentSlideId ? 'active' : ''}" 
                        draggable="true" 
                        ondragstart="Dashboard.handleDragStart(event, ${idx})"
                        ondragover="Dashboard.handleDragOver(event)"
                        ondragleave="Dashboard.handleDragLeave(event)"
                        ondrop="Dashboard.handleDrop(event, ${idx})"
                        ondragend="Dashboard.handleDragEnd(event)"
                        onclick="Dashboard.selectSlide(${s.id})">
                        <span class="drag-handle">☰</span>
                        <span class="slide-num">#${idx + 1}</span>
                        <span class="slide-label">${s.title ? s.title.substring(0, 18) : 'Tanpa Judul'}...</span>
                        <span class="slide-type-tag">${s.type.toUpperCase()}</span>
                    </li>
                `).join('')}
            </ul>
        `;
    }

    static selectSlide(slideId) {
        GameEngine.currentSlideId = slideId;
        this.loadSlideEditor(slideId);
        this.populateSlideManager();
        GameEngine.renderSlide(slideId);
    }

    static handleDragStart(e, index) {
        this.draggedIndex = index;
        e.dataTransfer.effectAllowed = "move";
        e.currentTarget.classList.add("dragging");
    }

    static handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add("drag-over");
    }

    static handleDragLeave(e) {
        e.currentTarget.classList.remove("drag-over");
    }

    static handleDrop(e, targetIndex) {
        e.preventDefault();
        e.currentTarget.classList.remove("drag-over");
        const sourceIndex = this.draggedIndex;
        if (sourceIndex === null || sourceIndex === targetIndex) return;

        const [movedSlide] = GameEngine.slidesData.splice(sourceIndex, 1);
        GameEngine.slidesData.splice(targetIndex, 0, movedSlide);

        DataManager.saveSlides(GameEngine.slidesData);
        this.populateSlideManager();
        this.showToast("Urutan slide berhasil diubah!");
    }

    static handleDragEnd(e) {
        e.currentTarget.classList.remove("dragging");
        this.draggedIndex = null;
    }

    static loadSlideEditor(slideId) {
        const id = parseInt(slideId, 10);
        const slide = GameEngine.slidesData.find(s => s.id === id);
        const form = document.getElementById("dash-editor-form");
        if (!slide || !form) return;

        let formHtml = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <h3>Edit Slide #${slide.id} (${slide.type.toUpperCase()})</h3>
                <button type="button" class="btn btn-sm" style="background:#ef4444; color:white;" onclick="Dashboard.deleteSlide(${slide.id})">
                    <i class="fa-solid fa-trash"></i> Hapus Slide
                </button>
            </div>
            <hr class="mb-3">

            <!-- FITUR UTAMA: TOGGLE GAMBAR POSTER UTUH -->
            <div style="background:#fef3c7; border:2px solid #f59e0b; padding:12px; border-radius:12px; margin-bottom:15px;">
                <h4 style="color:#92400e; font-size:0.95rem; margin-bottom:8px;">🖼️ Pengaturan Gambar Slide Utama</h4>
                <label style="font-weight:700; color:#78350f; font-size:0.9rem; display:flex; align-items:center; gap:8px; cursor:pointer;">
                    <input type="checkbox" id="toggle-full-poster" style="width:18px; height:18px;" ${slide.isFullPoster ? 'checked' : ''}> 
                    <span><strong>Mode Gambar Poster Utuh</strong> (Hapus lapisan putih pudar & sembunyikan semua teks bawaan)</span>
                </label>
            </div>

            <!-- TOGGLE SEMBUNYIKAN ELEMEN SPESIFIK -->
            <div style="background:#fffbeb; border:1px solid #fef08a; padding:10px; border-radius:10px; margin-bottom:15px;">
                <h5 style="color:#854d0e; font-size:0.85rem; margin-bottom:6px;">👁️ Opsi Penyembunyian Manual:</h5>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:6px;">
                    <label style="font-weight:700; color:#78350f; font-size:0.8rem;"><input type="checkbox" id="toggle-hide-title" ${slide.hideTitle ? 'checked' : ''}> Hapus Judul</label>
                    <label style="font-weight:700; color:#78350f; font-size:0.8rem;"><input type="checkbox" id="toggle-hide-subtitle" ${slide.hideSubtitle ? 'checked' : ''}> Hapus Sub-judul</label>
                    <label style="font-weight:700; color:#78350f; font-size:0.8rem;"><input type="checkbox" id="toggle-hide-content" ${slide.hideContent ? 'checked' : ''}> Hapus Kotak Isi Teks</label>
                    <label style="font-weight:700; color:#78350f; font-size:0.8rem;"><input type="checkbox" id="toggle-hide-buttons" ${slide.hideButtons ? 'checked' : ''}> Hapus Tombol Navigasi</label>
                </div>
            </div>
            
            <div class="form-group">
                <label>Judul Slide:</label>
                <input type="text" id="edit-title" class="form-control" value="${slide.title || ''}">
            </div>
            <div class="form-group">
                <label>Sub-Judul / Label:</label>
                <input type="text" id="edit-subtitle" class="form-control" value="${slide.subtitle || ''}">
            </div>

            <!-- BACKGROUND KOTAK & VIEWPORT -->
            <div style="background:#f0fdf4; border:2px solid #86efac; padding:14px; border-radius:12px; margin-bottom:15px;">
                <h4 style="color:#166534; font-size:0.95rem; margin-bottom:10px;">🎨 Unggah Gambar Latar / Poster</h4>
                
                <div class="form-group">
                    <label>🖼️ Unggah Gambar Slide Utama / Background Kotak (PNG/JPG):</label>
                    <input type="file" class="form-control" accept="image/*" onchange="Dashboard.handleBgUpload(event)">
                    <input type="hidden" id="edit-bg-image" value="${slide.bgImage || ''}">
                    <div id="bg-preview-container" style="margin-top:6px;">
                        ${slide.bgImage ? `<img src="${slide.bgImage}" style="max-height:80px; border-radius:8px; border:1px solid #ccc;"> <button type="button" class="btn btn-sm btn-secondary" onclick="Dashboard.removeBgImage()">Hapus Gambar</button>` : '<small style="color:#64748b;">Belum ada gambar slide.</small>'}
                    </div>
                </div>

                <div class="form-group">
                    <label>Warna Latar Belakang Kotak (Jika Tanpa Gambar):</label>
                    <input type="color" id="edit-bg-color" class="form-control" style="height:38px; width:80px; cursor:pointer;" value="${slide.bgColor || '#fffdf5'}">
                </div>

                <hr style="margin:12px 0; border-top:1px dashed #86efac;">
                <h5 style="color:#15803d; font-size:0.9rem; margin-bottom:8px;">🏞️ Latar Belakang Luar Screen</h5>
                
                <div class="form-group">
                    <label>Unggah Gambar Luar (PNG/JPG):</label>
                    <input type="file" class="form-control" accept="image/*" onchange="Dashboard.handleViewportBgUpload(event)">
                    <input type="hidden" id="edit-viewport-bg-image" value="${slide.viewportBgImage || ''}">
                    <div id="viewport-bg-preview-container" style="margin-top:6px;">
                        ${slide.viewportBgImage ? `<img src="${slide.viewportBgImage}" style="max-height:80px; border-radius:8px; border:1px solid #ccc;"> <button type="button" class="btn btn-sm btn-secondary" onclick="Dashboard.removeViewportBgImage()">Hapus Background Luar</button>` : '<small style="color:#64748b;">Menggunakan background luar standar.</small>'}
                    </div>
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
                    <label>Isi Teks / Materi (HTML):</label>
                    <textarea id="edit-content" class="form-control" style="min-height:100px;">${slide.content || ''}</textarea>
                </div>
            `;
        }

        form.innerHTML = formHtml;
    }

    static handleBgUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById("edit-bg-image").value = e.target.result;
            document.getElementById("bg-preview-container").innerHTML = `
                <img src="${e.target.result}" style="max-height:80px; border-radius:8px; border:1px solid #ccc;">
                <button type="button" class="btn btn-sm btn-secondary" onclick="Dashboard.removeBgImage()">Hapus Gambar</button>
            `;
        };
        reader.readAsDataURL(file);
    }

    static removeBgImage() {
        document.getElementById("edit-bg-image").value = "";
        document.getElementById("bg-preview-container").innerHTML = '<small style="color:#64748b;">Gambar dihapus.</small>';
    }

    static handleViewportBgUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById("edit-viewport-bg-image").value = e.target.result;
            document.getElementById("viewport-bg-preview-container").innerHTML = `
                <img src="${e.target.result}" style="max-height:80px; border-radius:8px; border:1px solid #ccc;">
                <button type="button" class="btn btn-sm btn-secondary" onclick="Dashboard.removeViewportBgImage()">Hapus Background Luar</button>
            `;
        };
        reader.readAsDataURL(file);
    }

    static removeViewportBgImage() {
        document.getElementById("edit-viewport-bg-image").value = "";
        document.getElementById("viewport-bg-preview-container").innerHTML = '<small style="color:#64748b;">Background luar dihapus.</small>';
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
            isFullPoster: false,
            hideTitle: false,
            hideSubtitle: false,
            hideContent: false,
            hideButtons: false,
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
        this.populateSlideManager();
        this.selectSlide(newId);
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
            this.populateSlideManager();
            this.loadSlideEditor(nextSlide.id);
            this.showToast(`Slide #${slideId} dihapus.`);
        }
    }

    static saveCurrentSlide() {
        const id = GameEngine.currentSlideId;
        const slide = GameEngine.slidesData.find(s => s.id === id);
        if (!slide) return;

        slide.title = document.getElementById("edit-title").value;
        slide.subtitle = document.getElementById("edit-subtitle").value;

        slide.viewportBgImage = document.getElementById("edit-viewport-bg-image").value;
        slide.bgImage = document.getElementById("edit-bg-image").value;
        slide.bgColor = document.getElementById("edit-bg-color").value;

        // Simpan Opsi Poster Utuh & Sembunyikan Elemen
        slide.isFullPoster = document.getElementById("toggle-full-poster").checked;
        slide.hideTitle = document.getElementById("toggle-hide-title").checked;
        slide.hideSubtitle = document.getElementById("toggle-hide-subtitle").checked;
        slide.hideContent = document.getElementById("toggle-hide-content").checked;
        slide.hideButtons = document.getElementById("toggle-hide-buttons").checked;

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
        this.populateSlideManager();
        GameEngine.renderSlide(GameEngine.currentSlideId);
        this.showToast("Slide berhasil diperbarui!");
        this.closeModal();
    }

    static resetToDefault() {
        if (confirm("Apakah Anda yakin ingin mengembalikan seluruh slide ke materi awal modul?")) {
            GameEngine.slidesData = DataManager.resetSlides();
            GameEngine.renderSlide(GameEngine.currentSlideId);
            this.populateSlideManager();
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