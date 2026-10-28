const PROFILE = {
  discordUrl: "https://discord.com/users/1435599404106256394",
  robloxUrl: "https://www.roblox.com/users/4053258054/profile",
};

const PROJECTS = [
  {
    id: "render-noli-yaai",
    category: "rendering",
    title: "YAAI noli skin rerender",
    subtitle: "YAAI Noli skin but if i rendered it",
    description: "One of my latest works. I personally love it :)",
    image: "assets/YaaiNoli.png",
    tags: ["Roblox Studio", "Lighting", "Composition"],
    year: "2026",
    featured: true,
    link: ""
  },
  {
    id: "render-noli-default",
    category: "rendering",
    title: "Default Noli rerender",
    subtitle: "High contrast default noli render",
    description: "Made right after YAAI noli.",
    image: "assets/DefaultNoli", // Example: "assets/noli-purple.png"
    tags: ["Roblox Studio", "Atmosphere", "Lighting"],
    year: "2026",
    featured: true,
    link: ""
  },
  {
    id: "render-mafioso",
    category: "rendering",
    title: "Mafioso rerender",
    subtitle: "Mafioso rendered in a more cinematic style",
    description: "Mafioso from Forsaken rerendered",
    image: "assets/MafiosoCinematic",
    tags: ["Lighting","CInematic", "Roblox Studio"],
    year: "2026",
    featured: false,
    link: ""
  },
  {
    id: "Nick-engine",
    category: "scripting",
    title: "Nick Engine",
    subtitle: "A utility engine made from the ground up.",
    description: "A utility Engine i use to make scripting WAY easier. (no image)",
    image: "",
    tags: ["Luau", "Roblox"],
    year: "2026",
    featured: false,
    link: ""
  },
  {
    id: "ob12",
    category: "scripting",
    title: "Oofed by 12:00",
    subtitle: "An Asymetrical horror game i animate and script for.",
    description: "Asym horror game i work for (NOT OWNED BY ME!)",
    image: "assets/ob12.png",
    tags: ["Luau", "Roblox"],
    year: "2026",
    featured: false,
    link: "https://discord.gg/SATdGxPeY"
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
