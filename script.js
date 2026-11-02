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

// Newsfeed: a measured expand
(function () {
  const feed = document.getElementById("newsfeed");
  const dl = feed && feed.querySelector("dl");
  const btn = feed && feed.querySelector(".feed-more");
  if (!dl || !btn) return;
  const isOpen = () => feed.classList.contains("open");

  btn.addEventListener("click", () => {
    const open = !isOpen();
    feed.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
    dl.style.height = open ? dl.scrollHeight + "px" : "";
    btn.textContent = open ? "less" : "more";
  });
  window.addEventListener("resize", () => {
    if (isOpen()) dl.style.height = dl.scrollHeight + "px";
  });
})();

// The footer's "updated" date follows the newest news entry that isn't in the future
(function () {
  const now = new Date();
  const full = (dt) => (dt.dataset.full || dt.textContent).trim();
  const notFuture = (dt) => {
    const d = new Date(full(dt).replace(/^(\w+) (\d{4})$/, "$1 1, $2"));
    return isNaN(d) || d <= now;
  };
  const newest = [...document.querySelectorAll("#newsfeed dt:not(.year)")].find(notFuture);
  const updated = document.querySelector("footer .updated");
  if (newest && updated) updated.textContent = full(newest).toLowerCase();
})();
