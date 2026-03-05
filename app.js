const logoGrid = document.getElementById("logoGrid");
const productGrid = document.getElementById("productGrid");
const lifestyleGrid = document.getElementById("lifestyleGrid");
const categorySelect = document.getElementById("categorySelect");
const colorSelect = document.getElementById("colorSelect");
const sizeSelect = document.getElementById("sizeSelect");
const productCount = document.getElementById("productCount");

const state = {
  products: [],
  category: "all",
  color: "all",
  size: Number(sizeSelect.value),
};

function titleFromFile(file) {
  return file
    .replace(/-4k\.svg$/, "")
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

function renderLogos(logos) {
  logoGrid.innerHTML = logos
    .map(
      (file) => `
      <article class="logo-card reveal">
        <img src="./public/assets/logos/${file}" alt="${titleFromFile(file)}" loading="lazy" />
        <div class="card-body">
          <h3 class="card-title">${titleFromFile(file).replace("Sonic Logo ", "")}</h3>
          <p class="card-meta">4K vector logo concept</p>
        </div>
      </article>
    `,
    )
    .join("");
}

function renderLifestyle(files) {
  lifestyleGrid.innerHTML = files
    .map(
      (file) => `
      <article class="life-card reveal">
        <img src="./public/assets/lifestyle/${file}" alt="${titleFromFile(file)}" loading="lazy" />
        <div class="card-body">
          <h3 class="card-title">${titleFromFile(file)}</h3>
          <p class="card-meta">AI-styled lifestyle concept render</p>
        </div>
      </article>
    `,
    )
    .join("");
}

function fillFilters(products) {
  const categories = [
    ...new Set(products.map((p) => JSON.stringify({ id: p.category, label: p.category_label }))),
  ].map((s) => JSON.parse(s));
  const colors = [...new Set(products.map((p) => p.color))];

  categorySelect.innerHTML = [
    `<option value="all">All Categories</option>`,
    ...categories.map((c) => `<option value="${c.id}">${c.label}</option>`),
  ].join("");

  colorSelect.innerHTML = [
    `<option value="all">All Colors</option>`,
    ...colors.map((c) => `<option value="${c}">${c[0].toUpperCase() + c.slice(1)}</option>`),
  ].join("");
}

function getFilteredProducts() {
  return state.products.filter((item) => {
    const categoryMatch = state.category === "all" || item.category === state.category;
    const colorMatch = state.color === "all" || item.color === state.color;
    return categoryMatch && colorMatch;
  });
}

function renderProducts() {
  const filtered = getFilteredProducts();
  const sample = filtered.slice(0, state.size);

  productGrid.innerHTML = sample
    .map(
      (item) => `
      <article class="product-card reveal">
        <img src="./public/assets/products/${item.file}" alt="${item.model} ${item.color}" loading="lazy" />
        <div class="card-body">
          <h3 class="card-title">${item.model}</h3>
          <p class="card-meta">${item.category_label}</p>
          <p class="card-meta"><span class="color-dot" style="background:${item.color_hex};"></span>${item.color}</p>
        </div>
      </article>
    `,
    )
    .join("");

  productCount.textContent = `Showing ${sample.length} of ${filtered.length} matching assets (${state.products.length} total renders).`;
  setupReveals();
}

function setupReveals() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 },
  );

  document.querySelectorAll(".reveal:not(.show)").forEach((node) => observer.observe(node));
}

async function init() {
  const response = await fetch("./assets-manifest.json");
  const manifest = await response.json();

  state.products = manifest.products;

  renderLogos(manifest.logos);
  renderLifestyle(manifest.lifestyle);
  fillFilters(manifest.products);
  renderProducts();

  categorySelect.addEventListener("change", (event) => {
    state.category = event.target.value;
    renderProducts();
  });

  colorSelect.addEventListener("change", (event) => {
    state.color = event.target.value;
    renderProducts();
  });

  sizeSelect.addEventListener("change", (event) => {
    state.size = Number(event.target.value);
    renderProducts();
  });

  setupReveals();
}

init().catch((error) => {
  productCount.textContent = `Unable to load manifest: ${error.message}`;
});
