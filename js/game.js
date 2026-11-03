/**
 * Core Game Engine & Slide Renderer for Kingdom of Green
 */
class GameEngine {
    static currentSlideId = 1;
    static unlockedStars = [false, false, false, false, false];
    static slidesData = [];

    static init() {
        this.slidesData = DataManager.getSlides();
        this.renderSlide(this.currentSlideId);
    }

    static openGuideModal() {
        if (typeof AudioEngine !== 'undefined') AudioEngine.playSound('click');
        const modal = document.getElementById("guide-modal");
        if (modal) modal.classList.add("active");
    }

    static closeGuideModal() {
        if (typeof AudioEngine !== 'undefined') AudioEngine.playSound('click');
        const modal = document.getElementById("guide-modal");
        if (modal) modal.classList.remove("active");
    }

    // Modal & Render Sertifikat
    static openCertificateModal() {
        if (typeof AudioEngine !== 'undefined') AudioEngine.playSound('click');
        const modal = document.getElementById("certificate-modal");
        if (modal) {
            modal.classList.add("active");
            this.drawCertificatePreview("Pahlawan Lingkungan");
        }
    }

    static closeCertificateModal() {
        if (typeof AudioEngine !== 'undefined') AudioEngine.playSound('click');
        const modal = document.getElementById("certificate-modal");
        if (modal) modal.classList.remove("active");
    }

    static drawCertificatePreview(name) {
        const canvas = document.getElementById("certificate-canvas");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "#fffbeb";
        ctx.fillRect(0, 0, 800, 600);

        ctx.lineWidth = 14;
        ctx.strokeStyle = "#ca8a04";
        ctx.strokeRect(15, 15, 770, 570);

        ctx.lineWidth = 4;
        ctx.strokeStyle = "#854d0e";
        ctx.strokeRect(30, 30, 740, 540);

        ctx.font = "italic bold 18px 'Quicksand', sans-serif";
        ctx.fillStyle = "#854d0e";
        ctx.textAlign = "center";
        ctx.fillText("🏆 SERTIFIKAT KELULUSAN 🏆", 400, 80);

        ctx.font = "bold 40px 'Fredoka One', cursive";
        ctx.fillStyle = "#166534";
        ctx.fillText("PAHLAWAN LINGKUNGAN", 400, 150);

        ctx.font = "bold 20px 'Quicksand', sans-serif";
        ctx.fillStyle = "#1e293b";
        ctx.fillText("Diberikan dengan penuh kehormatan kepada:", 400, 220);

        ctx.font = "italic bold 42px cursive";
        ctx.fillStyle = "#b45309";
        ctx.fillText((name || "Pahlawan Lingkungan").toUpperCase(), 400, 290);

        ctx.font = "bold 16px 'Quicksand', sans-serif";
        ctx.fillStyle = "#475569";
        ctx.fillText("Atas keberanian, dedikasi, dan kepedulian yang luar biasa", 400, 350);
        ctx.fillText("dalam menyelamatkan serta melestarikan alam di Kingdom of Green.", 400, 380);

        ctx.font = "bold 16px 'Quicksand', sans-serif";
        ctx.fillStyle = "#854d0e";
        ctx.fillText("🎖️ KELAS PETUALANG LINGKUNGAN", 400, 440);

        const tgl = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
        ctx.fillText(`Kerajaan Hijau, ${tgl}`, 400, 470);

        ctx.fillStyle = "#ca8a04";
        ctx.beginPath();
        ctx.arc(400, 530, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 11px 'Fredoka One', cursive";
        ctx.fillText("GREEN", 400, 526);
        ctx.fillText("SEAL", 400, 541);
    }

    static downloadCertificate() {
        const inputName = document.getElementById("player-name-cert").value || "Pahlawan Lingkungan";
        this.drawCertificatePreview(inputName);
        const canvas = document.getElementById("certificate-canvas");
        if (!canvas) return;

        const downloadLink = document.createElement("a");
        downloadLink.download = `sertifikat_kingdom_of_green_${inputName.replace(/\s+/g, '_')}.png`;
        downloadLink.href = canvas.toDataURL("image/png");
        downloadLink.click();
    }

    static goToSlide(slideId) {
        if (typeof AudioEngine !== 'undefined') AudioEngine.playSound('click');
        this.currentSlideId = slideId;
        const card = document.getElementById("slide-card-container");
        card.style.opacity = 0;
        card.style.transform = "scale(0.97)";

        setTimeout(() => {
            this.renderSlide(slideId);
            card.style.opacity = 1;
            card.style.transform = "scale(1)";
        }, 200);
    }

    static updateStarCount() {
        const count = this.unlockedStars.filter(Boolean).length;
        const starEl = document.getElementById("star-count");
        if (starEl) starEl.innerText = count;
    }

    static handleQuizAnswer(optionIndex, slideId) {
        const slide = this.slidesData.find(s => s.id === slideId);
        if (!slide || !slide.options || !slide.options[optionIndex]) return;

        const selected = slide.options[optionIndex];
        if (selected.isCorrect) {
            if (typeof AudioEngine !== 'undefined') AudioEngine.playSound('correct');
            this.goToSlide(selected.targetCorrect || (slideId + 1));
        } else {
            if (typeof AudioEngine !== 'undefined') AudioEngine.playSound('wrong');
            this.goToSlide(selected.targetWrong || (slideId + 2));
        }
    }

    static triggerConfetti() {
        const canvas = document.getElementById("confetti-canvas");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = Array.from({ length: 70 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            color: ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#ec4899'][Math.floor(Math.random() * 5)],
            size: Math.random() * 8 + 4,
            speedY: Math.random() * 4 + 2,
            speedX: Math.random() * 2 - 1
        }));

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.y += p.speedY;
                p.x += p.speedX;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            if (particles.some(p => p.y < canvas.height)) {
                requestAnimationFrame(render);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        };
        render();
    }

    static renderSlide(id) {
        const slide = this.slidesData.find(s => s.id === id);
        const container = document.getElementById("slide-card-container");
        const viewport = document.querySelector(".game-viewport");
        if (!slide || !container) return;

        // 1. BACKGROUND LUAR
        if (viewport) {
            if (slide.viewportBgImage && slide.viewportBgImage.trim() !== '') {
                viewport.style.backgroundImage = `url('${slide.viewportBgImage}')`;
                viewport.style.backgroundSize = 'cover';
                viewport.style.backgroundPosition = 'center';
            } else if (slide.viewportBgColor) {
                viewport.style.backgroundImage = 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)';
                viewport.style.backgroundColor = slide.viewportBgColor;
            } else {
                viewport.style.backgroundImage = '';
                viewport.style.backgroundColor = '';
            }
        }

        // 2. BACKGROUND KOTAK SLIDE
        if (slide.bgImage && slide.bgImage.trim() !== '') {
            container.style.backgroundImage = `linear-gradient(rgba(255, 253, 245, 0.85), rgba(255, 253, 245, 0.85)), url('${slide.bgImage}')`;
            container.style.backgroundSize = 'cover';
            container.style.backgroundPosition = 'center';
        } else if (slide.bgColor) {
            container.style.backgroundImage = 'radial-gradient(#fef3c7 1px, transparent 1px)';
            container.style.backgroundColor = slide.bgColor;
            container.style.backgroundSize = '16px 16px';
        } else {
            container.style.backgroundImage = '';
            container.style.backgroundColor = '#fffdf5';
        }

        let html = ``;

        // Pengecekan visibilitas Judul dan Sub-judul
        if (!slide.hideTitle && slide.title) {
            html += `
                <div class="slide-header">
                    <h1 class="slide-title">${slide.title}</h1>
                    ${(!slide.hideSubtitle && slide.subtitle) ? `<div class="slide-subtitle">${slide.subtitle}</div>` : ''}
                </div>
            `;
        }

        html += `<div class="slide-body">`;

        // Pengecekan visibilitas Gambar Banner
        if (!slide.hideImage && slide.imageUrl && slide.imageUrl.trim() !== '') {
            html += `
                <div class="slide-decor-banner">
                    <img src="${slide.imageUrl}" alt="Hiasan Slide ${slide.id}" class="slide-decor-img" onerror="this.style.display='none'">
                </div>
            `;
        }

        // Render Tipe Slide
        if (slide.type === 'cover' || slide.type === 'info' || slide.type === 'penutup') {
            html += `
                ${!slide.hideAvatar ? `
                <div class="character-box">
                    <div class="avatar-icon">${slide.avatar || '👑'}</div>
                    <div class="speech-bubble">${slide.content}</div>
                </div>` : `<div style="padding: 10px 0;">${slide.content}</div>`}
            `;
        } else if (slide.type === 'world_map') {
            html += `
                <div class="map-grid">
                    <div class="map-card ${this.unlockedStars[0] || true ? 'unlocked' : 'locked'}" onclick="GameEngine.goToSlide(4)">
                        <div class="map-icon">🏡</div>
                        <h4>1. Green Valley</h4>
                        <small>${this.unlockedStars[0] ? '⭐ Selesai' : '🔓 Terbuka'}</small>
                    </div>
                    <div class="map-card ${this.unlockedStars[0] ? 'unlocked' : 'locked'}" onclick="${this.unlockedStars[0] ? 'GameEngine.goToSlide(9)' : ''}">
                        <div class="map-icon">🍃</div>
                        <h4>2. Organic Forest</h4>
                        <small>${this.unlockedStars[1] ? '⭐ Selesai' : (this.unlockedStars[0] ? '🔓 Terbuka' : '🔒 Terkunci')}</small>
                    </div>
                    <div class="map-card ${this.unlockedStars[1] ? 'unlocked' : 'locked'}" onclick="${this.unlockedStars[1] ? 'GameEngine.goToSlide(14)' : ''}">
                        <div class="map-icon">🏰</div>
                        <h4>3. Healthy Kingdom</h4>
                        <small>${this.unlockedStars[2] ? '⭐ Selesai' : (this.unlockedStars[1] ? '🔓 Terbuka' : '🔒 Terkunci')}</small>
                    </div>
                    <div class="map-card ${this.unlockedStars[2] ? 'unlocked' : 'locked'}" onclick="${this.unlockedStars[2] ? 'GameEngine.goToSlide(19)' : ''}">
                        <div class="map-icon">🌊</div>
                        <h4>4. River of Danger</h4>
                        <small>${this.unlockedStars[3] ? '⭐ Selesai' : (this.unlockedStars[2] ? '🔓 Terbuka' : '🔒 Terkunci')}</small>
                    </div>
                    <div class="map-card ${this.unlockedStars[3] ? 'unlocked' : 'locked'}" onclick="${this.unlockedStars[3] ? 'GameEngine.goToSlide(24)' : ''}">
                        <div class="map-icon">👑</div>
                        <h4>5. Nature Castle</h4>
                        <small>${this.unlockedStars[4] ? '⭐ Selesai' : (this.unlockedStars[3] ? '🔓 Terbuka' : '🔒 Terkunci')}</small>
                    </div>
                </div>
            `;
        } else if (slide.type === 'materi') {
            html += `
                ${!slide.hideAvatar ? `
                <div class="character-box">
                    <div class="avatar-icon">${slide.avatar || '📖'}</div>
                    <div class="speech-bubble">${slide.content}</div>
                </div>` : `<div style="padding: 10px 0;">${slide.content}</div>`}
            `;
            if (slide.materiCards) {
                html += `<div class="materi-grid">`;
                slide.materiCards.forEach(c => {
                    html += `
                        <div class="materi-card">
                            <i class="fa-solid ${c.icon} text-green"></i>
                            <h4>${c.title}</h4>
                        </div>
                    `;
                });
                html += `</div>`;
            }
        } else if (slide.type === 'quiz') {
            html += `
                ${!slide.hideAvatar ? `
                <div class="character-box">
                    <div class="avatar-icon">${slide.avatar || '❓'}</div>
                    <div class="speech-bubble">${slide.question}</div>
                </div>` : `<div style="padding: 10px 0; font-weight: bold;">${slide.question}</div>`}
                <div class="options-grid">
            `;
            slide.options.forEach((opt, idx) => {
                html += `
                    <button class="btn-option" onclick="GameEngine.handleQuizAnswer(${idx}, ${slide.id})">
                        <span class="opt-badge">${opt.id}</span>
                        <span>${opt.text}</span>
                    </button>
                `;
            });
            html += `</div>`;
        } else if (slide.type === 'feedback_correct' || slide.type === 'feedback_wrong') {
            const isCorrect = slide.type === 'feedback_correct';
            html += `
                <div class="character-box" style="border-color: ${isCorrect ? '#10b981' : '#ef4444'}">
                    <div class="avatar-icon" style="background: ${isCorrect ? '#d1fae5' : '#fee2e2'}">${slide.avatar}</div>
                    <div class="speech-bubble">${slide.content}</div>
                </div>
            `;
        } else if (slide.type === 'reward') {
            if (slide.starMap) {
                this.unlockedStars[slide.starMap - 1] = true;
                this.updateStarCount();
                if (typeof AudioEngine !== 'undefined') AudioEngine.playSound('star');
                this.triggerConfetti();
            }
            html += `
                <div class="reward-display">
                    <i class="fa-solid fa-star big-star"></i>
                    <h2 class="text-amber mt-2" style="font-size: 1.8rem;">⭐ BINTANG TERBUKA ⭐</h2>
                    <p class="mt-2" style="font-size: 1.15rem; font-weight:700;">${slide.content}</p>
                </div>
            `;
        } else if (slide.type === 'victory') {
            if (typeof AudioEngine !== 'undefined') AudioEngine.playSound('star');
            this.triggerConfetti();
            html += `
                <div class="character-box" style="border-color: #f59e0b; background: #fffbeb;">
                    <div class="avatar-icon">🏆</div>
                    <div class="speech-bubble">${slide.content}</div>
                </div>
                <div style="text-align: center; margin-top: 15px;">
                    <button class="btn btn-gold" onclick="GameEngine.openCertificateModal()">
                        <i class="fa-solid fa-award"></i> Klaim & Cetak Sertifikat Pahlawan 🏆
                    </button>
                </div>
            `;
        } else if (slide.type === 'refleksi') {
            html += `
                <p>Setelah menyelesaikan petualangan, mari kita ingat kembali apa yang sudah dipelajari. Berikan tanda centang pada pernyataan di bawah ini!</p>
                <div class="checklist-group">
                    <label class="check-item"><input type="checkbox"> Saya dapat menjelaskan mengapa menjaga kebersihan lingkungan itu penting.</label>
                    <label class="check-item"><input type="checkbox"> Saya dapat membedakan sampah organik dan anorganik.</label>
                    <label class="check-item"><input type="checkbox"> Saya dapat menyebutkan dampak membuang sampah sembarangan.</label>
                    <label class="check-item"><input type="checkbox"> Saya dapat menyebutkan kebiasaan menyayangi lingkungan.</label>
                </div>
            `;
        }

        html += `</div>`; // End slide-body

        // Footer Buttons
        if (slide.buttons && slide.buttons.length > 0) {
            html += `<div class="slide-footer" style="display:flex; gap:12px; align-items:center;">`;
            slide.buttons.forEach(btn => {
                if (btn.target === "guide" || btn.action === "guide") {
                    html += `
                        <button class="btn ${btn.style || 'btn-secondary'}" onclick="GameEngine.openGuideModal()">
                            ${btn.text}
                        </button>
                    `;
                } else {
                    html += `
                        <button class="btn ${btn.style || 'btn-gold'}" onclick="GameEngine.goToSlide(${btn.target})">
                            ${btn.text}
                        </button>
                    `;
                }
            });

            // Menyediakan tombol "Panduan Bermain" di samping pada Slide 1 jika belum terdaftar
            if (slide.id === 1 && !slide.buttons.some(b => b.target === "guide" || b.action === "guide")) {
                html += `
                    <button class="btn btn-secondary" onclick="GameEngine.openGuideModal()">
                        <i class="fa-solid fa-book-open"></i> Panduan Bermain
                    </button>
                `;
            }

            html += `</div>`;
        }

        container.innerHTML = html;
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => GameEngine.init());
} else {
    GameEngine.init();
}