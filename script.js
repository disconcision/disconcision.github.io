// Bookshelf interaction - drag to resize/scroll, click books when unlocked
(function () {
  const books = document.getElementById("books");
  if (!books) return;

  // Configuration
  const MIN_HEIGHT = 96;
  const MAX_HEIGHT = 800;
  const INITIAL_HEIGHT = 257; // pixels
  const INITIAL_CENTER = 0.5; // 0 = left edge, 0.5 = center, 1 = right edge
  const ANGLE_THRESHOLD = 1.2;

  // Interactive mode threshold
  const INTERACTIVE_HEIGHT_THRESHOLD = 420; // px - height at which book interactions activate

  // State
  let startY, startX, startHeight, startScrollLeft, decided, mode;
  let startContentX, startContentWidth, cursorOffsetX;
  let isDragging = false;
  let hintTimeout = null;

  // Create hint element - append to body to escape filter containing block
  const hint = document.createElement("div");
  hint.className = "books-hint";
  document.body.appendChild(hint);

  // Hint messages
  const HINT_LOCKED = '<span class="hint-arrow">↓</span> drag to unlock books';
  const HINT_UNLOCKED = '<span class="hint-icon">✓</span> books unlocked!';

  // Apply initial state
  books.style.height = INITIAL_HEIGHT + "px";
  books.style.userSelect = "none";
  books.querySelectorAll("img").forEach((img) => {
    img.draggable = false;
  });

  // Wait a frame for layout to settle before setting scroll
  requestAnimationFrame(() => {
    const scrollableWidth = books.scrollWidth - books.clientWidth;
    books.scrollLeft = scrollableWidth * INITIAL_CENTER;
  });

  // Update interactive state based on height and drag status
  function updateInteractiveState() {
    const height = books.offsetHeight;
    const shouldBeInteractive =
      height >= INTERACTIVE_HEIGHT_THRESHOLD && !isDragging;

    if (shouldBeInteractive) {
      books.classList.add("interactive");
    } else {
      books.classList.remove("interactive");
    }
  }

  // Position the hint at center of bookshelf, in document coordinates, so
  // it stays put on the shelf when the page scrolls
  function positionHint() {
    const booksRect = books.getBoundingClientRect();
    hint.style.left = booksRect.left + scrollX + booksRect.width / 2 + "px";
    hint.style.top = booksRect.top + scrollY + 8 + "px";
  }

  // Update hint during drag - shows current lock state
  function updateHintDuringDrag() {
    const isUnlocked = books.offsetHeight >= INTERACTIVE_HEIGHT_THRESHOLD;

    // Clear any pending fade timeout
    if (hintTimeout) {
      clearTimeout(hintTimeout);
      hintTimeout = null;
    }

    // Set message based on current height
    hint.innerHTML = isUnlocked ? HINT_UNLOCKED : HINT_LOCKED;
    positionHint();
    hint.classList.add("visible");
  }

  // Show hint after drag ends - starts fade timer if unlocked
  function showHintAfterDrag() {
    const isUnlocked = books.offsetHeight >= INTERACTIVE_HEIGHT_THRESHOLD;

    // Clear any pending fade timeout
    if (hintTimeout) {
      clearTimeout(hintTimeout);
      hintTimeout = null;
    }

    hint.innerHTML = isUnlocked ? HINT_UNLOCKED : HINT_LOCKED;
    positionHint();
    hint.classList.add("visible");

    // If unlocked, fade out after 2 seconds
    if (isUnlocked) {
      hintTimeout = setTimeout(() => {
        hint.classList.remove("visible");
      }, 2000);
    }
  }

  // Show locked hint on hover (only when below threshold)
  function showLockedHint() {
    if (books.offsetHeight >= INTERACTIVE_HEIGHT_THRESHOLD) return;

    hint.innerHTML = HINT_LOCKED;
    positionHint();
    hint.classList.add("visible");
  }

  // Hide the hint immediately
  function hideHint() {
    hint.classList.remove("visible");
    if (hintTimeout) {
      clearTimeout(hintTimeout);
      hintTimeout = null;
    }
  }

  // Clear tooltips and hint when leaving
  books.addEventListener("mouseleave", () => {
    books.querySelectorAll(".book-crate").forEach((crate) => {
      crate.dataset.tooltip = "";
    });
    hideHint();
  });

  // Show hint on mouse enter - only shows locked hint, not unlocked
  books.addEventListener("mouseenter", () => {
    updateInteractiveState();
    showLockedHint();
  });

  // The crate photos load small (images/books/small/), which is all the
  // shelf needs at its resting size. The full-size ones are fetched the
  // first time a mouse reaches the shelf (only a mouse can drag it bigger),
  // and each is swapped in once decoded, so the swap only sharpens it.
  let fullSize = false;
  books.addEventListener("pointerenter", (e) => {
    if (fullSize || e.pointerType !== "mouse") return;
    fullSize = true;
    books.querySelectorAll(".book-crate img").forEach((img) => {
      const full = img.getAttribute("src").replace("/small/", "/");
      const big = new Image();
      big.src = full;
      big.decode().then(() => (img.src = full), () => {});
    });
  });

  // Track clicked book link for click-vs-drag detection
  let clickedBookLink = null;

  // Drag handling - works everywhere, including on book links
  books.addEventListener("mousedown", (e) => {
    e.preventDefault();

    // Check if we clicked on a book link while interactive
    clickedBookLink = null;
    if (books.classList.contains("interactive")) {
      const bookLink = e.target.closest("svg a");
      if (bookLink) {
        clickedBookLink = bookLink;
      }
    }

    isDragging = true;
    books.classList.remove("interactive");

    startX = e.clientX;
    startY = e.clientY;
    startHeight = books.offsetHeight;
    startScrollLeft = books.scrollLeft;

    const rect = books.getBoundingClientRect();
    cursorOffsetX = e.clientX - rect.left;
    startContentX = books.scrollLeft + cursorOffsetX;
    startContentWidth = books.scrollWidth;

    decided = false;
    mode = null;
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
  });

  function onDrag(e) {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (!decided && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
      decided = true;
      mode =
        Math.abs(dy) > Math.abs(dx) * ANGLE_THRESHOLD ? "resize" : "scroll";
      books.style.cursor = mode === "resize" ? "ns-resize" : "grab";
      // Once we're dragging, clear the clicked book link - it's a drag, not a click
      clickedBookLink = null;
    }

    if (mode === "resize") {
      const newHeight = Math.min(
        Math.max(startHeight + dy, MIN_HEIGHT),
        MAX_HEIGHT
      );
      books.style.height = newHeight + "px";

      const scale = books.scrollWidth / startContentWidth;
      const newContentX = startContentX * scale;
      books.scrollLeft = newContentX - cursorOffsetX;

      // Update hint to reflect current state during resize
      updateHintDuringDrag();
    } else if (mode === "scroll") {
      books.scrollLeft = startScrollLeft - dx;
    }
  }

  function stopDrag() {
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
    books.style.cursor = "";
    decided = false;
    mode = null;
    isDragging = false;

    // If we clicked a book link and didn't drag, open the link
    if (clickedBookLink) {
      const href = clickedBookLink.getAttribute("href");
      if (href) {
        window.open(href, "_blank", "noopener");
      }
      clickedBookLink = null;
    }

    // Update hint (will start fade timer if unlocked)
    showHintAfterDrag();

    // Re-enable interactive mode after drag ends
    updateInteractiveState();
  }
})();

// Newsfeed dates: a heading for each year, then just the month on each entry.
// The markup stays <dt>Month YYYY</dt>; this only changes how it's shown.
(function () {
  let prevYear = null;
  document.querySelectorAll("#newsfeed dt").forEach((dt) => {
    const m = dt.textContent.trim().match(/^([A-Za-z]+)\.?\s+(\d{4})$/);
    if (!m) return;
    dt.dataset.full = m[1] + " " + m[2];
    dt.textContent = m[1].slice(0, 3);
    if (m[2] !== prevYear) {
      const year = document.createElement("dt");
      year.className = "year";
      year.textContent = prevYear = m[2];
      dt.before(year);
    }
  });
})();

// Newsfeed: a measured expand, and a count of what's hidden
(function () {
  const feed = document.getElementById("newsfeed");
  const dl = feed && feed.querySelector("dl");
  const btn = feed && feed.querySelector(".feed-more");
  if (!dl || !btn) return;
  const isOpen = () => feed.classList.contains("open");

  // entries the collapsed list cuts off; only measurable while collapsed
  let hidden = 0;
  function update() {
    if (!isOpen())
      hidden = [...dl.querySelectorAll("dd")].filter((dd) => dd.offsetTop - dl.offsetTop + dd.offsetHeight > dl.clientHeight + 4).length;
    btn.textContent = isOpen() ? "less" : hidden ? hidden + " more" : "more";
  }

  btn.addEventListener("click", () => {
    const open = !isOpen();
    feed.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
    dl.style.height = open ? dl.scrollHeight + "px" : "";
    btn.textContent = open ? "less" : hidden ? hidden + " more" : "more";
  });
  dl.addEventListener("transitionend", (e) => e.target === dl && update());
  window.addEventListener("resize", () => {
    if (isOpen()) dl.style.height = dl.scrollHeight + "px";
    else update();
  });
  window.addEventListener("load", update);
  update();
})();

// The footer's "updated" date follows the newest news entry
(function () {
  const newest = document.querySelector("#newsfeed dt:not(.year)");
  const updated = document.querySelector("footer .updated");
  if (newest && updated) updated.textContent = (newest.dataset.full || newest.textContent).trim().toLowerCase();
})();
