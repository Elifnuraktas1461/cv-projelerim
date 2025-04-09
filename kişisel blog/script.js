document.addEventListener("DOMContentLoaded", function () {
    function changeSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }

    document.querySelectorAll(".nav-link, .fancy-button").forEach(element => {
        element.addEventListener("click", function () {
            const sectionId = this.getAttribute("data-section");
            if (sectionId) {
                changeSection(sectionId);
            }
        });
    });

    changeSection("home");

    // Blog kartlarına tıklayınca modal açsın
    document.querySelectorAll(".blog-card").forEach(card => {
        card.addEventListener("click", function () {
            document.getElementById("modal-title").textContent = this.getAttribute("data-title");
            document.getElementById("modal-text").textContent = this.getAttribute("data-content");
            document.getElementById("modal").style.display = "block";
        });
    });

    // Modalı kapatma kodu
    document.querySelector(".close").addEventListener("click", function () {
        document.getElementById("modal").style.display = "none";
    });
});
