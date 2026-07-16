/* ============================================================
   Pierre Moreau — portfolio interactions (vanilla, no deps)
   - reveal on scroll
   - count-up metrics
   - scroll-spy nav highlight
   Le contenu / le markup sont générés par build.js.
   ============================================================ */
(function () {
  "use strict";

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Reveal on scroll ---------------------------------- */
  function initReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    if (!els.length) return;

    var show = function (el) { el.classList.add("is-visible"); };

    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(show);
      return;
    }

    els.forEach(function (el) {
      var d = el.getAttribute("data-reveal-delay");
      if (d) el.style.transitionDelay = d + "ms";
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0 });

    els.forEach(function (el) { io.observe(el); });

    // Filets de sécurité : impression + timeout
    var showAll = function () { els.forEach(show); };
    window.addEventListener("beforeprint", showAll);
    setTimeout(showAll, 2200);
  }

  /* ---- Count-up metrics ---------------------------------- */
  function initCount() {
    var nodes = document.querySelectorAll("[data-count]");
    if (!nodes.length || !("IntersectionObserver" in window)) return;

    var run = function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var final = el.textContent;
      if (reduce) { el.textContent = final; return; }
      var dur = 1100, start = null;
      var step = function (now) {
        if (start === null) start = now;
        var p = Math.min(1, (now - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(eased * target));
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = final;
      };
      requestAnimationFrame(step);
    };

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.5 });

    Array.prototype.forEach.call(nodes, function (el) { io.observe(el); });
  }

  /* ---- Scroll-spy nav highlight -------------------------- */
  function initSpy() {
    if (!("IntersectionObserver" in window)) return;
    var links = document.querySelectorAll("[data-nav]");
    if (!links.length) return;

    var setActive = function (id) {
      Array.prototype.forEach.call(links, function (a) {
        a.classList.toggle("is-active", a.getAttribute("data-nav") === id);
      });
    };

    var ids = ["home", "about", "work", "experience", "research", "skills", "contact"];
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    ids.forEach(function (id) {
      var s = document.getElementById(id);
      if (s) io.observe(s);
    });
  }

  function init() { initReveal(); initCount(); initSpy(); }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
