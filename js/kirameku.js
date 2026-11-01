(function () {
  "use strict";

  /* ---- 导航：高亮当前页面 ---- */
  function markActiveNav() {
    var path = location.pathname.replace(/\/+$/, "") || "/";
    var links = document.querySelectorAll("#page-header #nav .menus_items a.site-page");
    links.forEach(function (a) {
      var href = (a.getAttribute("href") || "").replace(/\/+$/, "") || "/";
      var active = href === path || (href !== "/" && path.indexOf(href) === 0);
      if (active) {
        a.classList.add("active");
      }
    });
  }

  /* ---- 时间轴：滚动渐入 ---- */
  function initTimeline() {
    var items = document.querySelectorAll("#jl-timeline .jl-item");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("jl-visible");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("jl-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach(function (el) {
      io.observe(el);
    });
  }

  function boot() {
    markActiveNav();
    initTimeline();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
