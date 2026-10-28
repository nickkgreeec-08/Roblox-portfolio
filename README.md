# Nickk — Roblox Developer Portfolio

A responsive, horror-inspired portfolio built with plain HTML, CSS, and JavaScript. No build tools or frameworks required.

## Run it
1. Extract the ZIP.
2. Open `index.html` in your browser.
3. For a smoother local workflow, use VS Code's Live Server extension.

## Add a project
Open `script.js` and add an object to the `PROJECTS` array:

```js
{
  id: "my-new-render",            // Unique ID
  category: "rendering",          // animation | rendering | scripting
  title: "My New Render",
  subtitle: "Short one-line summary",
  description: "What you made and what you want people to notice.",
  image: "assets/my-render.png",  // Or "" for placeholder
  tags: ["Roblox Studio", "Lighting"],
  year: "2026",
  featured: true,
  link: ""                        // Optional public project link
}
```

Copy the image into the `assets` folder. Use PNG or JPG. The project card and details modal are generated automatically.

## Personalize before applying
- Replace the example Discord and Roblox links in `script.js`.
- Edit the About section in `index.html` to match your real skills and experience.
- Replace the sample project descriptions with accurate details.
- Remove any animation or scripting placeholder you have not made yet, or replace it with real work.
- Add screenshots, short clips, or demo links when available.
- Do not include private server assets or work you do not have permission to show.

## Files
- `index.html` — page structure and text
- `style.css` — colors, layout, responsive styles
- `script.js` — portfolio data, category tabs, project cards and modal
- `assets/` — put project images here
