var tombolJualan = document.querySelector(".btn-orange");

if (tombolJualan) {
    
    tombolJualan.onclick = function() {
        alert("Anda menekan tombol Mulai Berjualan!");
    
        return false; 
    }
    
} else {
    console.log("Tombol tidak ditemukan");
}