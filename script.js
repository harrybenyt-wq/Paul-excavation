const DEFAULT_PHOTOS = [
  "710848012_1030923566127966_5498724316692358561_n.jpg",
  "713303149_2167298204036805_2631653210056213586_n.jpg",
  "715058152_985101861169909_507492742169073460_n.jpg",
  "718815527_1711658340287542_5888378489225439318_n.jpg"
];

function getGalleryPhotos() {
  try {
    const stored = localStorage.getItem("paulExcavationGallery");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length === 4) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn("Impossible de charger les photos :", error);
  }
  return DEFAULT_PHOTOS;
}

function renderGallery(gridId, photos) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = "";
  photos.forEach((src, index) => {
    const card = document.createElement("div");
    card.className = "gallery-card";
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Photo de chantier ${index + 1}`;
    card.appendChild(img);
    grid.appendChild(card);
  });
}

function populateAdminForm() {
  const photos = getGalleryPhotos();
  photos.forEach((src, index) => {
    const input = document.getElementById(`photo${index + 1}`);
    if (input) input.value = src;
  });
  renderGallery("preview-grid", photos);
}

function saveGalleryPhotos(event) {
  event.preventDefault();
  const photos = [];
  for (let i = 1; i <= 4; i += 1) {
    const input = document.getElementById(`photo${i}`);
    photos.push(input && input.value.trim() ? input.value.trim() : DEFAULT_PHOTOS[i - 1]);
  }
  localStorage.setItem("paulExcavationGallery", JSON.stringify(photos));
  renderGallery("preview-grid", photos);
  alert("Photos enregistrées. La page Galerie affiche maintenant les nouvelles images.");
}

function initGalleryPage() {
  const photos = getGalleryPhotos();
  renderGallery("gallery-grid", photos);
}

function initAdminPage() {
  populateAdminForm();
  const form = document.getElementById("photo-form");
  if (form) {
    form.addEventListener("submit", saveGalleryPhotos);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("gallery-grid")) {
    initGalleryPage();
  }
  if (document.getElementById("photo-form")) {
    initAdminPage();
  }
});
