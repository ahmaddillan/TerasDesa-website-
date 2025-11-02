function cekKetersediaan() {
    const cekButtons = document.querySelectorAll(".cek-ketersediaan");
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popup-title");
    const popupText = document.getElementById("popup-text");
    const popupClose = document.getElementById("popup-close");

    cekButtons.forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".card");
            const namaAset = card.querySelector("h3").textContent;
            const status = card.dataset.status; 

            popupTitle.textContent = namaAset;

            if (status === "tersedia") {
                popupText.textContent = "Aset ini saat ini tersedia. Silakan datang ke kantor Desa untuk meminjam atau hubungi Sekretaris Desa.";
                popup.querySelector(".popup-content") 
            } else {
                popupText.textContent = "Maaf, aset ini sedang digunakan dan tidak tersedia saat ini.";
                popup.querySelector(".popup-content")
            }

            popup.style.display = "flex";
        });
    });

    popupClose.addEventListener("click", () => {
        popup.style.display = "none";
    });

    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.style.display = "none";
        }
    });
}
