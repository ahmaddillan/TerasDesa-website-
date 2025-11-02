function animateCountUp(id, target, duration) {

    const element = document.getElementById(id);

    let targetNumber = parseInt(target.toString().replace(/,/g, ''));
    
    let start = 0;
    let startTime = null;

    // untuk update angka
    function step(currentTime) {
        if (startTime === null) {
            startTime = currentTime;
        }

        // Hitung sudah berapa lama animasi berjalan
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Hitung angka yang harus ditampilkan sekarang
        let currentNumber = Math.floor(progress * targetNumber);

        // angkanya di layar
        element.innerText = currentNumber.toLocaleString('id-ID');

        // Lanjutkan animasi jika belum selesai
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.innerText = target.toLocaleString('id-ID');
        }
    }

    //Mulai animasinya
    window.requestAnimationFrame(step);
}


document.addEventListener("DOMContentLoaded", function() {
    //                               ID elemen,    Angka Target, Durasi (ms)
    animateCountUp("stat-penduduk",   2456,         2000); // 2 detik
    animateCountUp("stat-produk",     487,          2000); // 2 detik
    animateCountUp("stat-pengrajin",  156,          2000); // 2 detik
    animateCountUp("stat-proyek",     8,            1500); // 1.5 detik
});