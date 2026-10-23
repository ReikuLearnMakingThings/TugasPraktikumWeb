// ==============================
// Data sparepart (array of objects)
// ==============================
const produk = [
  {
    id: 1,
    nama: "SSD 256GB",
    kategori: "Penyimpanan",
    harga: 350000,
    stok: 10,
  },
  {
    id: 2,
    nama: "RAM DDR4 8GB",
    kategori: "Memori",
    harga: 280000,
    stok: 15,
  },
  {
    id: 3,
    nama: "Baterai Laptop Universal",
    kategori: "Daya",
    harga: 320000,
    stok: 0,
  },
  {
    id: 4,
    nama: "Charger Laptop 65W",
    kategori: "Daya",
    harga: 180000,
    stok: 20,
  },
  {
    id: 5,
    nama: "Keyboard Laptop",
    kategori: "Input",
    harga: 150000,
    stok: 7,
  },
  {
    id: 6,
    nama: "Thermal Paste",
    kategori: "Pendingin",
    harga: 45000,
    stok: 30,
  },
];

// ==============================
// Fungsi bantu
// ==============================
const formatRupiah = (angka) => `Rp ${angka.toLocaleString("id-ID")}`;

// ==============================
// 1. Filtering: produk dengan stok > 0
// ==============================
const filterStokTersedia = (daftar) => daftar.filter(({ stok }) => stok > 0);

// ==============================
// 2. Pencarian: produk berdasarkan id
// ==============================
const cariProdukById = (daftar, idDicari) =>
  daftar.find(({ id }) => id === idDicari);

// ==============================
// 3. Transformasi: potongan harga 10% untuk semua item
// ==============================
const hitungDiskon = (daftar, persen = 10) =>
  daftar.map((item) => ({
    ...item,
    hargaDiskon: item.harga - (item.harga * persen) / 100,
  }));

// ==============================
// 4. Output ke console
// ==============================
console.log("=== DATA SPAREPART AWAL ===");
console.table(produk);

// Hasil filter
const produkTersedia = filterStokTersedia(produk);
console.log(
  `\n=== SPAREPART STOK TERSEDIA (${produkTersedia.length} dari ${produk.length}) ===`
);
produkTersedia.forEach(({ id, nama, harga, stok }) => {
  console.log(`[${id}] ${nama} | ${formatRupiah(harga)} | stok: ${stok}`);
});

// Hasil pencarian
const idDicari = 2;
const hasilCari = cariProdukById(produk, idDicari);
console.log(`\n=== PENCARIAN SPAREPART ID ${idDicari} ===`);
if (hasilCari) {
  const { nama, kategori, harga, stok } = hasilCari;
  console.log(
    `Ditemukan: ${nama} (${kategori}) - ${formatRupiah(harga)}, stok ${stok}`
  );
} else {
  console.log(`Sparepart dengan id ${idDicari} tidak ditemukan.`);
}

// Pencarian id yang tidak ada
const idTidakAda = 99;
const hasilKosong = cariProdukById(produk, idTidakAda);
console.log(
  hasilKosong
    ? `Ditemukan: ${hasilKosong.nama}`
    : `Sparepart dengan id ${idTidakAda} tidak ditemukan.`
);

// Hasil diskon
const produkDiskon = hitungDiskon(produk);
console.log("\n=== HARGA SETELAH DISKON 10% ===");
produkDiskon.forEach(({ nama, harga, hargaDiskon }) => {
  console.log(`${nama}: ${formatRupiah(harga)} -> ${formatRupiah(hargaDiskon)}`);
});

// ==============================
// 5. Tampilkan di halaman (jika tabelnya ada)
// ==============================
const buatBarisTabel = ({ nama, kategori, harga, hargaDiskon, stok }) => `
  <tr>
    <td class="px-4 py-3 font-medium">${nama}</td>
    <td class="px-4 py-3 text-muted">${kategori}</td>
    <td class="px-4 py-3 text-right text-muted line-through">${formatRupiah(harga)}</td>
    <td class="px-4 py-3 text-right font-semibold">${formatRupiah(hargaDiskon)}</td>
    <td class="px-4 py-3 text-right">${stok > 0 ? stok : "Habis"}</td>
  </tr>`;

const badanTabel = document.querySelector("#tabel-sparepart");

if (badanTabel) {
  badanTabel.innerHTML = produkDiskon.map(buatBarisTabel).join("");
}
