// ==============================
// Konfigurasi Tailwind
// Warna mengambil nilai dari variabel CSS di css/style.css
// ==============================
if (window.tailwind) {
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          bg: "var(--bg)",
          surface: "var(--surface)",
          ink: "var(--ink)",
          muted: "var(--muted)",
          line: "var(--line)",
          accent: "var(--accent)",
        },
      },
    },
  };
}

// ==============================
// Mode terang / gelap
// ==============================
const htmlRoot = document.documentElement;

const apakahGelap = () => htmlRoot.classList.contains("dark");

const perbaruiLabelTema = () => {
  const tombol = document.querySelector("#tombol-tema");
  if (tombol) {
    tombol.textContent = apakahGelap() ? "Mode terang" : "Mode gelap";
  }
};

// Awal: ikuti pengaturan tema sistem (dipasang segera agar tidak berkedip)
htmlRoot.classList.toggle(
  "dark",
  window.matchMedia("(prefers-color-scheme: dark)").matches
);

document.addEventListener("DOMContentLoaded", () => {
  perbaruiLabelTema();

  document.querySelector("#tombol-tema").addEventListener("click", () => {
    htmlRoot.classList.toggle("dark");
    perbaruiLabelTema();
  });
});
