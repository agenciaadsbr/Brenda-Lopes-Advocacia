/* Interações visuais da LP Brenda Lopes — independentes do formulário (app.js).
 * Texto digitado no hero, revelação ao rolar, setas do painel trabalhista
 * e clique do botão flutuante. Tudo respeita prefers-reduced-motion. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Texto digitado: "Atendimento para ..." */
  function initTyping() {
    var el = document.getElementById("typed");
    if (!el || reduce) return;
    var words = ["quem trabalha", "quem precisa do INSS", "mães e gestantes", "sua família"];
    var wi = 0, ci = words[0].length, del = false, hold = 26;
    setInterval(function () {
      var w = words[wi];
      if (!del) {
        if (ci < w.length) { ci++; }
        else if (--hold <= 0) { del = true; hold = 26; }
      } else if (ci > 0) { ci--; }
      else { del = false; wi = (wi + 1) % words.length; }
      el.textContent = w.slice(0, ci);
    }, 75);
  }

  /* Revelação ao rolar */
  function initReveal() {
    var items = document.querySelectorAll(".rv");
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* Setas anterior/próximo do painel trabalhista: aciona a aba vizinha */
  function initSteps() {
    document.querySelectorAll("[data-step]").forEach(function (b) {
      b.addEventListener("click", function () {
        var root = b.closest("[data-picker]");
        if (!root) return;
        var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
        var cur = tabs.findIndex(function (t) { return t.getAttribute("aria-selected") === "true"; });
        var next = tabs[(cur + parseInt(b.getAttribute("data-step"), 10) + tabs.length) % tabs.length];
        if (next) next.click();
      });
    });
  }

  /* Botão flutuante: evento de contato no Meta (somente se o Pixel estiver ativo) */
  function initFab() {
    var fab = document.querySelector(".fab");
    if (!fab) return;
    fab.addEventListener("click", function () {
      try { if (window.fbq) window.fbq("track", "Contact"); } catch (e) {}
    });
  }

  /* Menu: destaca a seção visível (desktop e atalhos do celular) */
  function initSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"], .mnav a[href^="#"]'));
    if (!links.length || !("IntersectionObserver" in window)) return;
    var ids = [];
    links.forEach(function (a) { var id = a.getAttribute("href").slice(1); if (ids.indexOf(id) < 0) ids.push(id); });
    var mnav = document.querySelector(".mnav");
    function mark(id) {
      links.forEach(function (a) {
        var on = a.getAttribute("href") === "#" + id;
        a.classList.toggle("is-active", on);
        if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        if (on && mnav && a.parentNode === mnav && mnav.scrollWidth > mnav.clientWidth) {
          mnav.scrollTo({ left: a.offsetLeft - 16, behavior: reduce ? "auto" : "smooth" });
        }
      });
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) mark(en.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ids.forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* Carrossel do previdenciário no celular: indicador de posição */
  function initSwipeDots() {
    var grid = document.getElementById("prev-grid");
    var dots = document.querySelectorAll(".swipe-dots span");
    if (!grid || !dots.length) return;
    var ticking = false;
    grid.addEventListener("scroll", function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var cards = grid.children, best = 0, bestD = Infinity, mid = grid.scrollLeft + grid.clientWidth / 2;
        for (var i = 0; i < cards.length; i++) {
          var c = cards[i], d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
          if (d < bestD) { bestD = d; best = i; }
        }
        dots.forEach(function (s, i) { s.classList.toggle("on", i === best); });
      });
    }, { passive: true });
  }

  function boot() { initTyping(); initReveal(); initSteps(); initFab(); initSpy(); initSwipeDots(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
