// Fills the settled turn's VideoList with the channel's real newest uploads
// (youtube.com/@MrBeast/videos, 2026-10-08; thumbs/CREDITS.txt).
(() => {
  const list = document.querySelector(".desk .video-list");
  if (!list) return;

  const VIDEOS = [
    { id: "plN7JMbadRg", title: "Eat Everything In A Grocery Store, Win $1,000,000", views: "192M" },
    { id: "v9QtM6qnG50", title: "I Built A City To Save Kids From Illegal Labor", views: "95M" },
    { id: "gTKS8SAwUzE", title: "I Survived The Most Extreme Places On Earth", views: "123M" },
    { id: "Qtl8lJwbd4g", title: "Escape 100 Cops, Win $500,000", views: "116M" },
    { id: "Af6i6ChAVTw", title: "Last To Leave Mansion, Keeps It", views: "124M" },
    { id: "lVylRtlPOIE", title: "I Granted 100 Kids Their Biggest Wish!", views: "67M" },
  ];
  const PLAY = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 3l14 9-14 9z"/></svg>';

  for (const video of VIDEOS) {
    const card = document.createElement("div");
    card.className = "video-card";
    card.setAttribute("role", "listitem");
    card.innerHTML =
      `<div class="video-media"><img src="thumbs/${video.id}.jpg" alt="" /><span class="video-play"><span>${PLAY}</span></span></div>` +
      '<div class="video-text"><span class="video-title"></span><span class="video-meta"></span></div>';
    card.querySelector(".video-title").textContent = video.title;
    card.querySelector(".video-meta").textContent = `MrBeast · ${video.views} views`;
    list.append(card);
  }
})();
