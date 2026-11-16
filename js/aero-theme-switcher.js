(function () {
  "use strict";

  /* 4 套配色（与演示站 sh1nn.top 一致） */
  var palettes = [
    { primary: "#3c7fb1", highlight: "#aaddfa", secondary: "#d8e1e7", bg: "/images/aero/bg-blue.jpg" },
    { primary: "#ba57b4", highlight: "#faaafa", secondary: "#e6d8e7", bg: "/images/aero/bg-purple.webp" },
    { primary: "#47ba40", highlight: "#aafaaa", secondary: "#d8e7d9", bg: "/images/aero/bg-green.webp" },
    { primary: "#3c57b1", highlight: "#aab5fa", secondary: "#d8dde7", bg: "/images/aero/bg-indigo.webp" }
  ];

  function apply(index) {
    var p = palettes[index] || palettes[0];
    var root = document.documentElement.style;
    root.setProperty("--primary-color", p.primary);
    root.setProperty("--highlight-color", p.highlight);
    root.setProperty("--secondary-color", p.secondary);
    root.setProperty("--bg-image", "url('" + p.bg + "')");

    document.querySelectorAll(".theme-dot").forEach(function (dot, i) {
      dot.classList.toggle("active", i === index);
    });

    try {
      localStorage.setItem("aero-theme-index", String(index));
    } catch (e) {
      /* ignore */
    }
  }

  function init() {
    var saved = parseInt(localStorage.getItem("aero-theme-index") || "0", 10);
    if (!(saved >= 0 && saved < palettes.length)) saved = 0;

    apply(saved);

    document.querySelectorAll(".theme-dot").forEach(function (dot) {
      dot.addEventListener("click", function () {
        apply(parseInt(dot.getAttribute("data-index"), 10));
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
