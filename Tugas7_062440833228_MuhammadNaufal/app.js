// ==============================
// Seleksi elemen DOM
// ==============================
const form = document.querySelector("#form-tugas");
const input = document.querySelector("#input-tugas");
const daftar = document.querySelector("#todo-list");
const pesanError = document.querySelector("#pesan-error");
const infoKosong = document.querySelector("#info-kosong");
const ringkasan = document.querySelector("#ringkasan");

// ==============================
// Fungsi tampilan
// ==============================
const tampilkanError = (tampil) => {
  pesanError.classList.toggle("hidden", !tampil);
  input.classList.toggle("border-red-500", tampil);
  input.classList.toggle("border-line", !tampil);
};

const perbaruiRingkasan = () => {
  const total = daftar.children.length;
  const selesai = daftar.querySelectorAll("li[data-selesai='true']").length;

  infoKosong.classList.toggle("hidden", total > 0);
  ringkasan.classList.toggle("hidden", total === 0);
  ringkasan.textContent = `${total - selesai} unit belum selesai, ${selesai} selesai`;
};

// ==============================
// 4. Toggle State (Selesai): efek coret dengan classList.toggle()
// ==============================
const toggleSelesai = (item) => {
  const teksTugas = item.querySelector("span");
  const tombolSelesai = item.querySelector("[data-aksi='selesai']");

  teksTugas.classList.toggle("line-through");
  teksTugas.classList.toggle("text-muted");

  const sudahSelesai = teksTugas.classList.contains("line-through");
  item.dataset.selesai = String(sudahSelesai);
  tombolSelesai.textContent = sudahSelesai ? "Batal" : "Selesai";
};

// ==============================
// 3. Penciptaan Elemen Dinamis: <li> + teks + tombol selesai + tombol hapus
// ==============================
const buatItemTugas = (teks) => {
  const item = document.createElement("li");
  item.dataset.selesai = "false";
  item.className =
    "flex items-center justify-between gap-3 rounded-md border border-line px-4 py-3";

  // textContent dipakai agar aman dari injeksi HTML
  const teksTugas = document.createElement("span");
  teksTugas.textContent = teks;
  teksTugas.className = "flex-1 break-words";

  const tombolSelesai = document.createElement("button");
  tombolSelesai.type = "button";
  tombolSelesai.textContent = "Selesai";
  tombolSelesai.dataset.aksi = "selesai";
  tombolSelesai.className =
    "rounded-md border border-line px-3 py-1 text-sm hover:bg-surface";

  const tombolHapus = document.createElement("button");
  tombolHapus.type = "button";
  tombolHapus.textContent = "Hapus";
  tombolHapus.dataset.aksi = "hapus";
  tombolHapus.className =
    "rounded-md border border-line px-3 py-1 text-sm text-red-600 hover:bg-surface";

  // 4. Event listener tombol selesai
  tombolSelesai.addEventListener("click", () => {
    toggleSelesai(item);
    perbaruiRingkasan();
  });

  // 5. Hapus Item: event listener tombol hapus memakai .remove()
  tombolHapus.addEventListener("click", () => {
    item.remove();
    perbaruiRingkasan();
  });

  item.append(teksTugas, tombolSelesai, tombolHapus);
  return item;
};

// ==============================
// 1. Form Input: event submit dengan preventDefault()
// ==============================
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const teks = input.value.trim();

  // 2. Validasi Input: kosong atau hanya spasi
  if (teks === "") {
    tampilkanError(true);
    input.focus();
    return;
  }

  tampilkanError(false);
  daftar.appendChild(buatItemTugas(teks));
  perbaruiRingkasan();

  // 6. Reset Form: kosongkan input dan kembalikan fokus
  input.value = "";
  input.focus();
});

// Hilangkan pesan error saat pengguna mulai mengetik lagi
input.addEventListener("input", () => tampilkanError(false));

perbaruiRingkasan();

// ==============================
// Mode terang / gelap
// ==============================
const tombolTema = document.querySelector("#tombol-tema");

const perbaruiLabelTema = () => {
  const gelap = document.documentElement.classList.contains("dark");
  tombolTema.textContent = gelap ? "Mode terang" : "Mode gelap";
};

tombolTema.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  perbaruiLabelTema();
});

perbaruiLabelTema();
