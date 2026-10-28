/*
  NICKK PORTFOLIO — QUICK EDIT GUIDE
  ----------------------------------
  To add a project, copy one object in PROJECTS and change its values.
  category must be: "animation", "rendering", or "scripting".
  Put image files inside /assets and use e.g. image: "assets/my-render.png".
  Leave image: "" to show the built-in placeholder.
  Keep descriptions honest: only list work you have actually made.
*/

const PROFILE = {
  discordUrl: "https://discord.com/", // Replace with your invite/profile link if appropriate.
  robloxUrl: "https://www.roblox.com/", // Replace with your Roblox profile URL.
};

const PROJECTS = [
  {
    id: "render-noli-monochrome",
    category: "rendering",
    title: "Noli — Monochrome",
    subtitle: "High-contrast character composition",
    description: "A black-and-white Roblox Studio render focused on bold silhouettes, a split-face design, and graphic composition.",
    image: "", // Example: "assets/noli-monochrome.png"
    tags: ["Roblox Studio", "Lighting", "Composition"],
    year: "2026",
    featured: true,
    link: "" // Optional: link to a public post or video.
  },
  {
    id: "render-noli-purple",
    category: "rendering",
    title: "Noli — Neon",
    subtitle: "Purple atmospheric lighting",
    description: "A dark Noli render using strong purple and blue lighting, deep shadows, and a bright star detail to create a cinematic mood.",
    image: "", // Example: "assets/noli-purple.png"
    tags: ["Roblox Studio", "Atmosphere", "Lighting"],
    year: "2026",
    featured: true,
    link: ""
  },
  {
    id: "animation-placeholder",
    category: "animation",
    title: "Animation project",
    subtitle: "Replace with your own animation",
    description: "Add an animation you made here. Include what you animated, the intended feel, and any technical details worth showing.",
    image: "",
    tags: ["Animation", "Roblox Studio"],
    year: "2026",
    featured: false,
    link: ""
  },
  {
    id: "scripting-placeholder",
    category: "scripting",
    title: "Scripting project",
    subtitle: "Replace with your own system",
    description: "Add a Luau system you built here. Explain what it does, how it works at a high level, and what you personally implemented.",
    image: "",
    tags: ["Luau", "Roblox"],
    year: "2026",
    featured: false,
    link: ""
  }
];

const CATEGORY_LABELS = {
  animation: "Animation",
  rendering: "Rendering",
  scripting: "Scripting"
};

const grid = document.querySelector("#projectGrid");
const emptyNote = document.querySelector("#emptyNote");
const tabs = [...document.querySelectorAll(".tab")];
const dialog = document.querySelector("#projectDialog");
let activeCategory = "animation";

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function projectImage(project, extraClass = "") {
  if (project.image) {
    return `<img class="${extraClass}" src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=&quot;thumb-placeholder&quot;>N.</div>'">`;
  }
  return `<div class="thumb-placeholder" aria-label="Image placeholder">N.</div>`;
}

function renderProjects(category) {
  activeCategory = category;
  const projects = PROJECTS.filter(project => project.category === category);
  grid.innerHTML = projects.map((project, index) => `
    <button class="project-card" type="button" data-project-id="${escapeHtml(project.id)}" aria-label="View ${escapeHtml(project.title)} details">
      <div class="project-thumb">
        ${projectImage(project)}
        <span class="project-number">PROJECT / ${String(index + 1).padStart(2, "0")}</span>
        <span class="project-type">${escapeHtml(CATEGORY_LABELS[project.category] || project.category)}</span>
      </div>
      <div class="project-info">
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.subtitle || "")}</p>
        <div class="card-footer"><span>${escapeHtml(project.year || "—")}</span><span>VIEW DETAILS ↗</span></div>
      </div>
    </button>
  `).join("");
  emptyNote.hidden = projects.length !== 0;
  tabs.forEach(tab => {
    const selected = tab.dataset.category === category;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", String(selected));
  });
  ["animation", "rendering", "scripting"].forEach(key => {
    const count = PROJECTS.filter(project => project.category === key).length;
    const node = document.querySelector(`#count-${key}`);
    if (node) node.textContent = String(count).padStart(2, "0");
  });
}

function openProject(projectId) {
  const project = PROJECTS.find(item => item.id === projectId);
  if (!project) return;
  const imageNode = document.querySelector("#dialogImage");
  imageNode.innerHTML = project.image
    ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}">`
    : `<div class="thumb-placeholder">N.</div>`;
  document.querySelector("#dialogCategory").textContent = `${CATEGORY_LABELS[project.category] || project.category} / ${project.year || "PROJECT"}`;
  document.querySelector("#dialogTitle").textContent = project.title;
  document.querySelector("#dialogDescription").textContent = project.description || project.subtitle || "";
  document.querySelector("#dialogTags").innerHTML = (project.tags || []).map(tag => `<span>${escapeHtml(tag)}</span>`).join("");
  const link = document.querySelector("#dialogLink");
  if (project.link) {
    link.href = project.link;
    link.hidden = false;
  } else {
    link.hidden = true;
    link.removeAttribute("href");
  }
  dialog.showModal();
}

tabs.forEach(tab => tab.addEventListener("click", () => renderProjects(tab.dataset.category)));
grid.addEventListener("click", event => {
  const card = event.target.closest("[data-project-id]");
  if (card) openProject(card.dataset.projectId);
});
document.querySelector("#dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.querySelector("#discordLink").href = PROFILE.discordUrl;
document.querySelector("#robloxLink").href = PROFILE.robloxUrl;
document.querySelector("#year").textContent = new Date().getFullYear();

renderProjects(activeCategory);
