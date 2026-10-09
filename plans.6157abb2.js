// "Your Plans": the connect providers in the Add a credential sheet's order,
// each with its official app icon (sources in logos/CREDITS.txt), every
// switch on.
(() => {
  const list = document.getElementById("providers");
  if (!list) return;

  const PROVIDERS = [
    { name: "Claude", caption: "Connected", img: "logos/claude.jpg" },
    { name: "ChatGPT / Codex", caption: "Connected", img: "logos/chatgpt.jpg" },
    { name: "Grok", caption: "Connected", img: "logos/grok.jpg" },
    { name: "Gemini", caption: "Connected", img: "logos/gemini.jpg" },
    { name: "Muse", caption: "Connected", img: "logos/muse.jpg" },
    { name: "DeepSeek", caption: "Connected", img: "logos/deepseek.jpg" },
    { name: "Ollama", caption: "On this device", img: "logos/ollama.png" },
    // The macOS oMLX tile is cropped from its icns; white fills the corners.
    { name: "oMLX", caption: "On this device", img: "logos/omlx.png", tile: "#ffffff" },
    { name: "LM Studio", caption: "On this device", img: "logos/lmstudio.png" },
  ];

  function switchFor(provider) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "switch";
    button.setAttribute("role", "switch");
    button.setAttribute("aria-checked", "true");
    button.setAttribute("aria-label", provider.name);
    button.innerHTML = '<span class="switch-track"><span class="switch-thumb"></span></span>';
    button.addEventListener("click", () => {
      button.setAttribute("aria-checked", String(button.getAttribute("aria-checked") !== "true"));
    });
    return button;
  }

  for (const provider of PROVIDERS) {
    const row = document.createElement("li");
    row.className = "row";
    row.innerHTML = `<span class="icon" aria-hidden="true"><img src="${provider.img}" alt="" /></span><span class="label"><strong></strong><span></span></span>`;
    if (provider.tile) row.querySelector(".icon").style.setProperty("--tile", provider.tile);
    row.querySelector("strong").textContent = provider.name;
    row.querySelector(".label span").textContent = provider.caption;
    row.append(switchFor(provider));
    list.append(row);
  }
})();
