/* =============================================
   Wedding Invitation — Mukul weds Sailly
   JavaScript — Complete Interactivity
   ============================================= */

(function () {
  'use strict';

  /* ------------------------------------------
     Module 0: Envelope Cover
     Full-viewport overlay with a wax seal.
     Tapping the seal slides the cover away
     and unlocks body scroll.
  ------------------------------------------ */
  function initEnvelope() {
    try {
      var cover = document.getElementById('envelope-cover');
      var seal = document.getElementById('envelope-seal');
      if (!cover || !seal) return;

      document.body.classList.add('envelope-locked');

      /* Pre-hide hero for entrance animation */
      var hero = document.querySelector('.i-hero');
      if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
      }

      function openEnvelope() {
        seal.removeEventListener('click', openEnvelope);

        /* Stage 1 (0-300ms): Seal pulse with golden glow */
        seal.classList.add('is-pulsing');

        /* Stage 2 (200-800ms): Cover content fades, split halves open */
        setTimeout(function () {
          var inner = cover.querySelector('.envelope-cover__overlay');
          if (inner) {
            inner.style.transition = 'opacity 0.4s ease-out';
            inner.style.opacity = '0';
          }

          /* Make cover bg transparent so split overlays reveal the hero */
          cover.style.background = 'transparent';

          /* Create top/bottom split overlays */
          var topHalf = document.createElement('div');
          var bottomHalf = document.createElement('div');
          topHalf.className = 'envelope-split envelope-split--top';
          bottomHalf.className = 'envelope-split envelope-split--bottom';
          cover.appendChild(topHalf);
          cover.appendChild(bottomHalf);
        }, 200);

        /* Stage 3 (600-1200ms): Fade cover remnants + hero entrance */
        setTimeout(function () {
          cover.style.transition = 'opacity 0.4s ease-out';
          cover.style.opacity = '0';

          /* Hero entrance: fade in from below */
          if (hero) {
            hero.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
          }

          /* Unlock scroll */
          document.body.classList.remove('envelope-locked');
        }, 600);

        /* Stage 4 (1200ms): Remove cover from DOM */
        setTimeout(function () {
          cover.style.display = 'none';
        }, 1200);
      }

      seal.addEventListener('click', openEnvelope);

      var skipBtn = document.getElementById('envelope-skip');
      if (skipBtn) {
        skipBtn.addEventListener('click', openEnvelope);
      }
    } catch (e) {
      console.warn('[Envelope]', e);
    }
  }

  /* ------------------------------------------
     Module 1: Loader
     Fade after 1.2 s, display:none on
     transitionend, 2.5 s fallback.
  ------------------------------------------ */
  function initLoader() {
    try {
      var loader = document.getElementById('loader');
      if (!loader) { initScrollReveal(); return; }

      var hidden = false;

      function hideLoader() {
        if (hidden) return;
        hidden = true;
        loader.classList.add('is-hidden');
      }

      /* Kick scroll-reveal once the loader is truly gone */
      function onLoaderGone() {
        loader.style.display = 'none';
        initScrollReveal();
      }

      /* After 1.2 s start the CSS opacity transition */
      setTimeout(hideLoader, 1200);

      /* display:none when the opacity transition finishes */
      loader.addEventListener('transitionend', function handler() {
        loader.removeEventListener('transitionend', handler);
        onLoaderGone();
      });

      /* Fallback: force-hide after 2.5 s even if transitionend never fires */
      setTimeout(function () {
        hideLoader();
        /* Give the transition time to land, then force */
        setTimeout(function () {
          if (loader.style.display !== 'none') onLoaderGone();
        }, 700);
      }, 2500);
    } catch (e) {
      console.warn('[Loader]', e);
      initScrollReveal();
    }
  }

  /* ------------------------------------------
     Module 2: Scroll Reveal
     IntersectionObserver, one-shot .is-visible.
     Called after loader hides so hero entrance
     animations play after the overlay is gone.
  ------------------------------------------ */
  var revealReady = false;

  function initScrollReveal() {
    try {
      if (revealReady) return;
      revealReady = true;

      var allEls = document.querySelectorAll('.reveal');
      if (!allEls.length) return;

      if (!('IntersectionObserver' in window)) {
        allEls.forEach(function (el) { el.classList.add('is-visible'); });
        return;
      }

      /* Separate top-level reveals from nested ones.
         A nested reveal is one whose ancestor also has .reveal —
         it will be staggered by its parent instead of observed individually. */
      var topLevel = [];
      allEls.forEach(function (el) {
        var parent = el.parentElement;
        while (parent) {
          if (parent.classList && parent.classList.contains('reveal')) {
            return; /* nested — skip */
          }
          parent = parent.parentElement;
        }
        topLevel.push(el);
      });

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');

            /* Stagger nested .reveal children */
            var children = entry.target.querySelectorAll('.reveal');
            children.forEach(function (child, i) {
              child.style.transitionDelay = ((i + 1) * 0.1) + 's';
              requestAnimationFrame(function () {
                child.classList.add('is-visible');
              });
            });

            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
      });

      topLevel.forEach(function (el) { observer.observe(el); });
    } catch (e) {
      console.warn('[ScrollReveal]', e);
    }
  }

  /* ------------------------------------------
     Module 3: Countdown Timer
     Target: Nov 30 2026 7:00 PM IST.
     Updates every second, .tick pulse on change.
  ------------------------------------------ */
  function initCountdown() {
    try {
      var target = new Date('2026-11-30T19:00:00+05:30');
      var daysEl    = document.getElementById('cd-days');
      var hoursEl   = document.getElementById('cd-hours');
      var minutesEl = document.getElementById('cd-minutes');
      var secondsEl = document.getElementById('cd-seconds');

      if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

      var prev = { d: '', h: '', m: '', s: '' };
      var intervalId;

      function pad(n) { return n < 10 ? '0' + n : String(n); }

      function pulse(el) {
        el.classList.remove('tick');
        void el.offsetWidth;            /* force reflow so animation replays */
        el.classList.add('tick');
        setTimeout(function () { el.classList.remove('tick'); }, 500);
      }

      function update() {
        var diff = target.getTime() - Date.now();
        if (diff <= 0) {
          daysEl.textContent = '00';
          hoursEl.textContent = '00';
          minutesEl.textContent = '00';
          secondsEl.textContent = '00';
          if (intervalId) clearInterval(intervalId);
          return;
        }

        var total = Math.floor(diff / 1000);
        var d = pad(Math.floor(total / 86400));
        var h = pad(Math.floor((total % 86400) / 3600));
        var m = pad(Math.floor((total % 3600) / 60));
        var s = pad(total % 60);

        if (prev.d !== d) { daysEl.textContent = d; pulse(daysEl); prev.d = d; }
        if (prev.h !== h) { hoursEl.textContent = h; pulse(hoursEl); prev.h = h; }
        if (prev.m !== m) { minutesEl.textContent = m; pulse(minutesEl); prev.m = m; }
        if (prev.s !== s) { secondsEl.textContent = s; pulse(secondsEl); prev.s = s; }
      }

      update();
      intervalId = setInterval(update, 1000);
    } catch (e) {
      console.warn('[Countdown]', e);
    }
  }

  /* ------------------------------------------
     Module 4: SVG-Heart Scratch Cards
     DPR-aware canvas, gold foil fill,
     destination-out erasing, reveal at > 45 %.
     ISSUE 2: Updated for .i-scratch__group wrapper
     and "Reveal the date" button.
  ------------------------------------------ */
  function initScratchCards() {
    try {
      var canvases = document.querySelectorAll('.i-scratch__canvas');
      if (!canvases.length) return;

      var revealedCount = 0;
      var totalCards = canvases.length;

      /* ---- Heart path matching CSS clip-path ---- */
      /* CSS clip-path coordinates are for 85 × 80 parent box.
         Scale them to whatever the actual CSS dimensions are. */
      function heartPath(ctx, w, h) {
        var sx = w / 85;
        var sy = h / 80;
        ctx.beginPath();
        ctx.moveTo(42.5 * sx, 72 * sy);
        ctx.bezierCurveTo(27.6 * sx, 61.8 * sy,  0,        46.5 * sy, 0,         25.5 * sy);
        ctx.bezierCurveTo(0,         8.7 * sy,  12.75 * sx, 0,         23.4 * sx,  3.6 * sy);
        ctx.bezierCurveTo(31.9 * sx, 5.8 * sy,  39 * sx,   13.8 * sy, 42.5 * sx, 21.1 * sy);
        ctx.bezierCurveTo(46 * sx,   13.8 * sy, 53.1 * sx,  5.8 * sy, 61.6 * sx,  3.6 * sy);
        ctx.bezierCurveTo(72.25 * sx, 0,        85 * sx,    8.7 * sy,  85 * sx,   25.5 * sy);
        ctx.bezierCurveTo(85 * sx,   46.5 * sy, 57.4 * sx, 61.8 * sy, 42.5 * sx, 72 * sy);
        ctx.closePath();
      }

      function drawGoldHeart(ctx, w, h) {
        ctx.save();
        ctx.globalCompositeOperation = 'source-over';
        var grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0,    '#8a6a2c');
        grad.addColorStop(0.25, '#d9b866');
        grad.addColorStop(0.5,  '#a98238');
        grad.addColorStop(0.75, '#f3e2a8');
        grad.addColorStop(1,    '#9a7633');
        ctx.fillStyle = grad;
        heartPath(ctx, w, h);
        ctx.fill();
        ctx.restore();
      }

      function countOpaque(ctx, cw, ch) {
        var data = ctx.getImageData(0, 0, cw, ch).data;
        var n = 0;
        for (var i = 3; i < data.length; i += 4) { if (data[i] > 0) n++; }
        return n;
      }

      /* ---- Per-canvas setup ---- */
      canvases.forEach(function (canvas) {
        var dpr  = window.devicePixelRatio || 1;
        var wrap = canvas.parentElement;            /* .i-scratch__heart */
        var cssW = wrap.offsetWidth;
        var cssH = wrap.offsetHeight;

        /* DPR-aware buffer */
        canvas.width  = cssW * dpr;
        canvas.height = cssH * dpr;

        var ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.scale(dpr, dpr);

        /* Gold fill */
        drawGoldHeart(ctx, cssW, cssH);

        /* Remember the initial opaque count for % calculation */
        var initialOpaque = countOpaque(ctx, canvas.width, canvas.height);

        /* Switch to erasing mode */
        ctx.globalCompositeOperation = 'destination-out';

        var state = { scratching: false, revealed: false };

        /* ---- Helpers ---- */
        function eraseXY(x, y) {
          ctx.beginPath();
          ctx.arc(x, y, 14, 0, Math.PI * 2);
          ctx.fill();
        }

        function posFromMouse(e) {
          var r = canvas.getBoundingClientRect();
          return { x: e.clientX - r.left, y: e.clientY - r.top };
        }

        function posFromTouch(e) {
          if (!e.touches || !e.touches.length) return null;
          var r = canvas.getBoundingClientRect();
          return { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top };
        }

        function checkReveal() {
          if (state.revealed) return;
          var remaining = countOpaque(ctx, canvas.width, canvas.height);
          var erased = initialOpaque - remaining;
          if (initialOpaque === 0 || erased / initialOpaque > 0.45) {
            state.revealed = true;
            revealedCount++;

            /* Clear the entire canvas so text underneath is fully visible */
            ctx.fillRect(0, 0, cssW, cssH);

            /* Mark wrapper */
            wrap.classList.add('is-revealed');

            /* All 3 done → reveal the date display */
            if (revealedCount >= totalCards) {
              var dateEl = document.querySelector('.i-date__revealed');
              if (dateEl) dateEl.classList.add('is-visible');
              /* Hide the reveal button */
              var revBtn = document.getElementById('reveal-date-btn');
              if (revBtn) revBtn.style.display = 'none';
            }
          }
        }

        /* ---- Mouse events ---- */
        canvas.addEventListener('mousedown', function (e) {
          state.scratching = true;
          var p = posFromMouse(e); eraseXY(p.x, p.y);
        });
        canvas.addEventListener('mousemove', function (e) {
          if (!state.scratching) return;
          var p = posFromMouse(e); eraseXY(p.x, p.y);
        });
        canvas.addEventListener('mouseup', function () {
          state.scratching = false; checkReveal();
        });
        canvas.addEventListener('mouseleave', function () {
          if (state.scratching) { state.scratching = false; checkReveal(); }
        });

        /* ---- Touch events ---- */
        canvas.addEventListener('touchstart', function (e) {
          state.scratching = true;
          var p = posFromTouch(e); if (p) eraseXY(p.x, p.y);
        }, { passive: true });

        canvas.addEventListener('touchmove', function (e) {
          e.preventDefault();                       /* stop page scroll */
          if (!state.scratching) return;
          var p = posFromTouch(e); if (p) eraseXY(p.x, p.y);
        }, { passive: false });

        canvas.addEventListener('touchend', function () {
          state.scratching = false; checkReveal();
        });
        canvas.addEventListener('touchcancel', function () {
          state.scratching = false; checkReveal();
        });
      });

      /* ---- "Reveal the date" button ---- */
      var revealBtn = document.getElementById('reveal-date-btn');
      if (revealBtn) {
        revealBtn.addEventListener('click', function () {
          canvases.forEach(function (canvas) {
            var wrap = canvas.parentElement;
            if (!wrap.classList.contains('is-revealed')) {
              var ctx = canvas.getContext('2d');
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              wrap.classList.add('is-revealed');
            }
          });
          var dateEl = document.querySelector('.i-date__revealed');
          if (dateEl) dateEl.classList.add('is-visible');
          revealBtn.style.display = 'none';
        });
      }
    } catch (e) {
      console.warn('[ScratchCards]', e);
    }
  }

  /* ------------------------------------------
     Module 5: Hero Parallax
     rAF-throttled, 0.25 desktop / 0.12 mobile.
  ------------------------------------------ */
  function initParallax() {
    try {
      var blurImg = document.querySelector('.i-hero__bg-blur');
      if (!blurImg) return;

      var ticking  = false;
      var mqMobile = window.matchMedia('(max-width: 767px)');

      function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          var sy = window.scrollY;
          if (sy < window.innerHeight) {
            var factor = mqMobile.matches ? 0.12 : 0.25;
            /* Preserve the base scale(1.15) from CSS */
            blurImg.style.transform =
              'scale(1.15) translateY(' + (sy * factor) + 'px)';
          }
          ticking = false;
        });
      }

      window.addEventListener('scroll', onScroll, { passive: true });
    } catch (e) {
      console.warn('[Parallax]', e);
    }
  }

  /* ------------------------------------------
     Module 6: Music Toggle — ISSUE 5
     Now targets .bottom-nav__music-btn instead
     of the removed floating .music-toggle.
  ------------------------------------------ */
  function initMusicToggle() {
    try {
      var btn = document.querySelector('.bottom-nav__music-btn');
      if (!btn) return;

      btn.addEventListener('click', function () {
        btn.classList.toggle('is-paused');
      });
    } catch (e) {
      console.warn('[MusicToggle]', e);
    }
  }

  /* ------------------------------------------
     Module 7: RSVP WhatsApp Form Builder
     Reads name / attending / message from
     #rsvp-form, opens wa.me in a new tab.
  ------------------------------------------ */
  function initRSVP() {
    try {
      var form = document.getElementById('rsvp-form');
      if (!form) return;

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var nameInput      = form.querySelector('input[name="name"]');
        var attendingInput = form.querySelector('input[name="attending"]:checked');
        var messageInput   = form.querySelector('textarea[name="message"]');

        var name      = nameInput      ? nameInput.value.trim()      : '';
        var attending = attendingInput  ? attendingInput.value        : 'yes';
        var message   = messageInput   ? messageInput.value.trim()   : '';

        /* Name is required */
        if (!name) { if (nameInput) nameInput.focus(); return; }

        var text;
        if (attending === 'yes') {
          text = "Hi! I\u2019m " + name +
                 " and I\u2019ll be there for Mukul & Sailly\u2019s wedding! \uD83C\uDF89";
          if (message) text += '\n\nNote: ' + message;
        } else {
          text = "Hi! I\u2019m " + name +
                 ". Unfortunately, I won\u2019t be able to make it to Mukul & Sailly\u2019s wedding. Wishing them all the best! \uD83D\uDC90";
          if (message) text += '\n\nNote: ' + message;
        }

        var url = 'https://wa.me/919999999999?text=' + encodeURIComponent(text);
        window.open(url, '_blank');
      });
    } catch (e) {
      console.warn('[RSVP]', e);
    }
  }

  /* ------------------------------------------
     Module 8: Smooth Scroll
     For all a[href^='#'] anchors.
  ------------------------------------------ */
  function initSmoothScroll() {
    try {
      var anchors = document.querySelectorAll('a[href^="#"]');
      anchors.forEach(function (a) {
        a.addEventListener('click', function (e) {
          var href = this.getAttribute('href');
          if (!href || href === '#') return;
          var el = document.getElementById(href.substring(1));
          if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    } catch (e) {
      console.warn('[SmoothScroll]', e);
    }
  }

  /* ------------------------------------------
     Module 9: Gallery Carousel
     Horizontal scroll-snap carousel with a
     progress bar that tracks scroll position.
  ------------------------------------------ */
  function initGalleryCarousel() {
    try {
      var carousel = document.querySelector('.i-gallery__carousel');
      var bar = document.querySelector('.i-gallery__progress-bar');
      if (!carousel || !bar) return;

      var ticking = false;

      function updateProgress() {
        var max = carousel.scrollWidth - carousel.clientWidth;
        if (max <= 0) { bar.style.width = '100%'; return; }
        var pct = Math.min(Math.max(carousel.scrollLeft / max, 0), 1) * 100;
        bar.style.width = pct + '%';
      }

      carousel.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          updateProgress();
          ticking = false;
        });
      }, { passive: true });

      /* Set initial state */
      updateProgress();
    } catch (e) {
      console.warn('[GalleryCarousel]', e);
    }
  }

  /* ------------------------------------------
     Module 10: Share Button
     Web Share API with clipboard fallback.
  ------------------------------------------ */
  function initShareButton() {
    try {
      var btn = document.getElementById('share-btn');
      if (!btn) return;

      btn.addEventListener('click', function () {
        if (navigator.share) {
          navigator.share({
            title: 'Mukul weds Sailly',
            text: 'You are invited to our wedding!',
            url: window.location.href
          }).catch(function () { /* user cancelled */ });
        } else if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href).then(function () {
            var orig = btn.textContent;
            btn.textContent = 'Link copied!';
            setTimeout(function () { btn.textContent = orig; }, 2000);
          });
        }
      });
    } catch (e) {
      console.warn('[ShareButton]', e);
    }
  }

  /* ------------------------------------------
     Module 11: Active Nav Highlighting
     IntersectionObserver on sections, gold
     underline on the current bottom-nav item.
  ------------------------------------------ */
  function initNavHighlight() {
    try {
      var sections = document.querySelectorAll('section[id]');
      var navItems = document.querySelectorAll('.bottom-nav__item');
      if (!sections.length || !navItems.length) return;

      if (!('IntersectionObserver' in window)) return;

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navItems.forEach(function (item) {
              item.classList.remove('is-active');
            });
            var link = document.querySelector('.bottom-nav__item[href="#' + id + '"]');
            if (link) {
              link.classList.add('is-active');
            }
          }
        });
      }, {
        threshold: 0.3
      });

      sections.forEach(function (section) {
        observer.observe(section);
      });
    } catch (e) {
      console.warn('[NavHighlight]', e);
    }
  }

  /* ------------------------------------------
     Init — DOMContentLoaded
     Each module in its own try/catch so one
     failure never breaks the rest.
  ------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    initEnvelope();
    initLoader();           /* also triggers initScrollReveal when done */
    initCountdown();
    initScratchCards();
    initParallax();
    initMusicToggle();
    initRSVP();
    initSmoothScroll();
    initGalleryCarousel();
    initShareButton();
    initNavHighlight();
  });

})();
