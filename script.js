const DEFAULT_PHOTOS = [
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1543778929-5b2c0882b12b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1545324419-e1a6f29c6f18?auto=format&fit=crop&w=900&q=80"
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
