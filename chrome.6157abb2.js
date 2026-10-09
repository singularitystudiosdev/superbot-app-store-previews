// Puts the shared device chrome around every card's screen: rim, buttons,
// island, status bar and the chat header (titled by the phone's data-title),
// then zooms the strip to fit the window. Each card's markup declares only
// its own screen (.native > content).
(() => {
  const STATUS = `
    <div class="island" aria-hidden="true"></div>
    <div class="status" aria-hidden="true">
      <span>9:41</span>
      <span class="status-icons">
        <svg width="19" height="12" viewBox="0 0 18 11" fill="#fff"><rect x="0" y="7" width="3" height="4" rx="1"/><rect x="5" y="5" width="3" height="6" rx="1"/><rect x="10" y="2.5" width="3" height="8.5" rx="1"/><rect x="15" y="0" width="3" height="11" rx="1"/></svg>
        <svg width="17" height="12" viewBox="0 0 16 12" fill="#fff"><path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3A10.3 10.3 0 0 0 8 .4 10.3 10.3 0 0 0 .8 3.3L2 4.6a8.6 8.6 0 0 1 6-2.4Zm0 3.4c1.4 0 2.6.5 3.6 1.4l1.2-1.3A7 7 0 0 0 8 3.8a7 7 0 0 0-4.8 1.9L4.4 7c1-.9 2.2-1.4 3.6-1.4Zm0 3.4c.5 0 1 .2 1.3.5L8 11 6.7 9.5c.3-.3.8-.5 1.3-.5Z"/></svg>
        <svg width="27" height="13" viewBox="0 0 27 12" fill="none"><rect x=".5" y=".5" width="23" height="11" rx="3.5" stroke="#fff" opacity=".4"/><rect x="2" y="2" width="20" height="8" rx="2" fill="#fff"/><path d="M25 4v4c.8-.3 1.3-1.1 1.3-2S25.8 4.3 25 4Z" fill="#fff" opacity=".45"/></svg>
      </span>
    </div>`;

  const header = (title) => `
    <header class="header" aria-hidden="true">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M9 5v14"/><path d="M5.6 8.5h1.4M5.6 11h1.4" stroke-linecap="round"/></svg>
      <span class="header-title"></span>
      <span class="header-actions">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m8 7 4-4 4 4"/><path d="M8 10H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-1"/></svg>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-4"/><path d="M18.4 3.6a2 2 0 0 1 2.9 2.9L13 14.8l-3.6.7.7-3.6Z"/></svg>
        <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9.5"/></svg>
      </span>
    </header>`;

  const CHEVRON = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a8a8a8" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';

  // The desktop thread composer, idle, as superbot-desktop origin/main draws it
  // for a superbot chat (packages/ui composer.tsx layout="stacked"): the field
  // row, then the controls row at the compaction level a 361px column lands on
  // (level 7: the SUPER chevron and the mode segment fold away). Icons are the
  // composer's own 12-grid glyphs, lucide Sparkle and Mic.
  const COMPOSER = `
    <div class="hub-composer-row" aria-hidden="true">
      <div class="hub-composer">
        <div class="composer">
          <div class="composer-input-row"><span class="composer-placeholder">How can superbot help you today?</span></div>
          <div class="composer-controls">
            <div class="composer-controls-left">
              <span class="bc-plus"><svg class="cl-ic" viewBox="0 0 12 12"><path d="M6 1.5v9M1.5 6h9"/></svg></span>
              <span class="bc-super">
                <span class="bc-super-cap"><svg class="bc-super-spark" viewBox="0 0 24 24"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg></span>
                <span class="bc-super-tag"><span class="bc-super-tag-word">Auto</span></span>
              </span>
            </div>
            <div class="composer-controls-right">
              <span class="bc-plat"><img class="bc-platglitch" src="art/superbot-glitch-face.svg" alt="" />superbot<svg class="cl-ic" viewBox="0 0 12 12"><path d="M3 4.5 6 7.5 9 4.5"/></svg></span>
              <span class="bc-computer"><svg class="cl-ic" viewBox="0 0 12 12"><rect x="1.5" y="2" width="9" height="6" rx="1"/><path d="M4 10.5h4M6 8v2.5"/></svg></span>
              <span class="bc-mic"><svg class="cl-ic" viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/></svg></span>
              <span class="bc-send"><svg class="cl-ic" viewBox="0 0 12 12"><path d="M6 10V2M2.5 5.5 6 2l3.5 3.5"/></svg></span>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  for (const phone of document.querySelectorAll(".phone")) {
    const native = phone.querySelector(".native");
    native.insertAdjacentHTML("afterbegin", STATUS + header());
    const title = native.querySelector(".header-title");
    title.textContent = phone.dataset.title;
    title.insertAdjacentHTML("beforeend", CHEVRON);
    if (native.classList.contains("desk")) native.insertAdjacentHTML("beforeend", COMPOSER);
    native.insertAdjacentHTML("beforeend", '<div class="home" aria-hidden="true"></div>');

    const screen = document.createElement("div");
    screen.className = "screen";
    native.replaceWith(screen);
    screen.append(native);
    phone.insertAdjacentHTML(
      "afterbegin",
      '<span class="rim" aria-hidden="true"></span>' +
        ["left action", "left vol-up", "left vol-down", "right side"]
          .map((slot) => `<span class="btn ${slot}" aria-hidden="true"></span>`)
          .join(""),
    );
  }

  // The strip scrolls sideways at full size, like the App Store's. A mouse
  // wheel's vertical turn moves it sideways too, until it reaches either end.
  const strip = document.querySelector(".cards");
  strip.addEventListener(
    "wheel",
    (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const atStart = strip.scrollLeft <= 0 && event.deltaY < 0;
      const atEnd = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 1 && event.deltaY > 0;
      if (atStart || atEnd) return;
      event.preventDefault();
      strip.scrollBy({ left: event.deltaY });
    },
    { passive: false },
  );
})();
