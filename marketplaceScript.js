document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const products = document.querySelectorAll('#productList .product-card');

  if (!searchInput) {
    console.error("Elemen dengan id='searchInput' tidak ditemukan!");
    return;
  }

  searchInput.addEventListener('keyup', () => {
    const filter = searchInput.value.toLowerCase();
    products.forEach(card => {
      const nameEl = card.querySelector('h3');
      const name = nameEl ? nameEl.textContent.toLowerCase() : '';
      card.style.display = name.includes(filter) ? '' : 'none';
    });
  });
});
