// Data Menu Produk
const menuData = {
    'white-milk': {
        title: 'Kopi Susu Tetangga',
        desc: 'Perpaduan 100% Biji Kopi Arabika, susu segar, dan gula aren pilihan.',
        items: ['Kopi Susu Tetangga', 'KST Nabati', 'Caramel Macchiato', 'Cappuccino']
    },
    'black': {
        title: 'Americano & Cold Drip',
        desc: 'Ekstraksi biji kopi lokal pilihan dengan karakter rasa bersih dan segar.',
        items: ['Long Black', 'Cold Drip', 'Espresso']
    },
    'non-coffee': {
        title: 'Cokelat & Teh Rempah',
        desc: 'Pilihan minuman segar tanpa kafein kopi untuk menemani aktivitas.',
        items: ['Es Cokelat', 'Earl Grey Milk Tea', 'Lemonade']
    },
    'camilan': {
        title: 'Teman Minum Kopi',
        desc: 'Aneka jajanan pasar dan roti hangat yang dibuat setiap hari.',
        items: ['Donat Kampung', 'Bolon Pisang', 'Tahu Walik']
    }
};

// Fungsi Ganti Tab Menu
const tabButtons = document.querySelectorAll('.tab-btn');
const productDisplay = document.getElementById('product-display');
const productIngredients = document.getElementById('product-ingredients');

function renderMenu(category) {
    const data = menuData[category];
    productDisplay.innerHTML = `
        <h3>${data.title}</h3>
        <ul style="margin-top: 1rem; padding-left: 1.2rem;">
            ${data.items.map(item => `<li style="margin-bottom: 0.5rem;">${item}</li>`).join('')}
        </ul>
    `;
    productIngredients.innerHTML = `
        <h4>Komposisi Utama:</h4>
        <p style="margin-top: 0.5rem; line-height: 1.6;">${data.desc}</p>
    `;
}

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderMenu(btn.dataset.category);
    });
});

// Render kategori pertama saat halaman dibuka
renderMenu('white-milk');

// Data Lokasi Toko
const stores = [
    { name: 'KEDAI KOPIKU CIPETE', city: 'JAKARTA SELATAN', img: 'assets/toko1.jpg', map: 'https://maps.google.com' },
    { name: 'KEDAI KOPIKU BINTARO', city: 'TANGERANG SELATAN', img: 'assets/toko2.jpg', map: 'https://maps.google.com' },
    { name: 'KEDAI KOPIKU BEKASI', city: 'JAWA BARAT', img: 'assets/toko3.jpg', map: 'https://maps.google.com' }
];

let currentStore = 0;

function updateStore() {
    const store = stores[currentStore];
    document.getElementById('store-name').textContent = store.name;
    document.getElementById('store-city').textContent = store.city;
    document.getElementById('store-img').src = store.img;
    document.getElementById('store-map').href = store.map;
}

document.getElementById('next-store').addEventListener('click', () => {
    currentStore = (currentStore + 1) % stores.length;
    updateStore();
});

document.getElementById('prev-store').addEventListener('click', () => {
    currentStore = (currentStore - 1 + stores.length) % stores.length;
    updateStore();
});

// ==================================
// KARAKTER MENGIKUTI GERAKAN CURSOR
// ==================================

const hero = document.querySelector('.hero');
const character = document.getElementById('character-container');

if (hero && character) {

    // Posisi awal karakter
    character.style.left = '50%';

    hero.addEventListener('pointermove', (event) => {

        // Ambil posisi area hero
        const heroRect = hero.getBoundingClientRect();

        // Posisi cursor relatif terhadap hero
        const mouseX = event.clientX - heroRect.left;

        // Ukuran karakter
        const characterWidth = character.offsetWidth;

        // Batas gerakan kiri dan kanan
        const minPosition = 0;
        const maxPosition = heroRect.width - characterWidth;

        // Karakter mengikuti posisi horizontal cursor
        const newPosition = Math.max(
            minPosition,
            Math.min(mouseX - characterWidth / 2, maxPosition)
        );

        character.style.left = `${newPosition}px`;
        character.style.transform = 'translateX(0)';
    });

    // Kembali ke tengah ketika cursor keluar dari hero
    hero.addEventListener('pointerleave', () => {
        character.style.left = '50%';
        character.style.transform = 'translateX(-50%)';
    });
}