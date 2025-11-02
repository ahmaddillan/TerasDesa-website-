// memastikan semua HTML sudah siap sebelum menjalankan JavaScript
document.addEventListener('DOMContentLoaded', function() {

    // Ambil elemen-elemen yang kita butuhkan
    const btnKurang = document.getElementById('btn-kurang');
    const btnTambah = document.getElementById('btn-tambah');
    const inputJumlah = document.getElementById('input-jumlah');

    // Ketika tombol TAMBAH di-klik
    btnTambah.addEventListener('click', function() {
        // Ambil nilai saat ini, ubah ke angka, lalu tambah 1
        let jumlah = parseInt(inputJumlah.value);
        inputJumlah.value = jumlah + 1;
    });

    // Ketika tombol KURANG di-klik
    btnKurang.addEventListener('click', function() {
        // Ambil nilai saat ini
        let jumlah = parseInt(inputJumlah.value);

        // Cek dulu, jangan sampai jumlahnya kurang dari 1
        if (jumlah > 1) {
            inputJumlah.value = jumlah - 1;
        }
    });

});