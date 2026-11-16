(function () {
  "use strict";

  var TYPE_SPEED = 110;
  var START_DELAY = 350;
  var LOOP_MS = 5000;
  var charTimer = null;
  var loopTimer = null;

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

    function step() {
      i += 1;
      span.textContent = text.slice(0, i);
      if (i >= text.length) {
        window.clearTimeout(charTimer);
        cursor.classList.add("type-cursor--idle");
        return;
      }
      charTimer = window.setTimeout(step, TYPE_SPEED);
    }

    charTimer = window.setTimeout(step, START_DELAY);
  }

  function startLoop() {
    window.clearInterval(loopTimer);
    window.clearTimeout(charTimer);

    var title = document.querySelector(".blog-title");
    if (!title) return;

    typeInto(title);

    loopTimer = window.setInterval(function () {
      if (document.hidden) return;
      var el = document.querySelector(".blog-title");
      if (!el) return;
      window.clearTimeout(charTimer);
      typeInto(el);
    }, LOOP_MS);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startLoop);
  } else {
    startLoop();
  }

  document.addEventListener("pjax:complete", startLoop);
})();
