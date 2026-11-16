(function () {
  "use strict";

  var TYPE_SPEED = 110; 
  var START_DELAY = 350; 

  function typeInto(el) {
    var text = (el.getAttribute("data-text") || el.textContent || "").trim();
    if (!text) return;
    el.setAttribute("data-text", text);
    el.textContent = "";

    var span = document.createElement("span");
    span.className = "type-text";

    var cursor = document.createElement("span");
    cursor.className = "type-cursor";
    cursor.setAttribute("aria-hidden", "true");
    cursor.textContent = "|";

    el.appendChild(span);
    el.appendChild(cursor);

    var i = 0;
    var timer = null;

    function step() {
      i += 1;
      span.textContent = text.slice(0, i);
      if (i >= text.length) {
        window.clearTimeout(timer);
        cursor.classList.add("type-cursor--idle");
        return;
      }
      timer = window.setTimeout(step, TYPE_SPEED);
    }

    timer = window.setTimeout(step, START_DELAY);
  }

  function init() {
    var title = document.querySelector(".blog-title");
    if (!title) return;
    if (title.getAttribute("data-typing") === "done") return;
    title.setAttribute("data-typing", "done");
    typeInto(title);
  }

  function boot() {
    init();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  
  document.addEventListener("pjax:complete", boot);
})();
