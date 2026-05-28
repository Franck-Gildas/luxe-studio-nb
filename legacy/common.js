// LUXE STUDIO NB — shared behavior (nav lang switch + floating concierge)

(function () {
  // Inject concierge if not present
  if (!document.querySelector('.concierge')) {
    const wrap = document.createElement('div');
    wrap.className = 'concierge';
    wrap.innerHTML = `
      <div class="concierge-panel" role="dialog" aria-label="Concierge">
        <div class="concierge-head">
          <div class="concierge-avatar"></div>
          <div class="concierge-id">
            <div class="name">Élise — Concierge</div>
            <div class="role"><span class="live"></span>Atelier · Moncton · open</div>
          </div>
          <button class="concierge-close" aria-label="Close concierge">CLOSE</button>
        </div>

        <div class="concierge-body">
          <div class="concierge-msg them">
            <em>Bonsoir.</em> Welcome to the atelier. I'm Élise — I tend the room when the artists are at the chair. How may I make the next hour yours?
          </div>
          <div class="concierge-chips">
            <button class="concierge-chip">◇ Book a ritual</button>
            <button class="concierge-chip">◇ The menu</button>
            <button class="concierge-chip">◇ Gift card</button>
            <button class="concierge-chip">◇ Hours &amp; address</button>
          </div>
          <div class="concierge-msg them">
            Or simply tell me what your week has been like — I'll suggest something quiet.
            <span style="display:block; margin-top:8px; font-family: var(--serif-italic); font-style: italic; color: var(--rose); font-size: 13px;">Je parle aussi français — n'hésitez pas.</span>
          </div>
        </div>

        <div class="concierge-input">
          <input type="text" placeholder="A note, in EN or FR…" aria-label="Message">
          <button class="send" aria-label="Send">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7 L 12 7 M 8 3 L 12 7 L 8 11" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="concierge-foot"><span class="glow">◇</span> Replies within the hour · réponse sous une heure</div>
      </div>

      <button class="concierge-bubble" aria-label="Open concierge">
        <span class="badge"></span>
        <svg viewBox="0 0 26 26" fill="none">
          <path d="M5 9 C 5 6, 7 4, 10 4 L 16 4 C 19 4, 21 6, 21 9 L 21 14 C 21 17, 19 19, 16 19 L 11 19 L 6 22 L 7 19 C 6 19, 5 18, 5 17 Z"
                stroke="currentColor" stroke-width="1.2" fill="none" stroke-linejoin="round"/>
          <circle cx="10" cy="11.5" r="0.9" fill="currentColor"/>
          <circle cx="13" cy="11.5" r="0.9" fill="currentColor"/>
          <circle cx="16" cy="11.5" r="0.9" fill="currentColor"/>
        </svg>
      </button>
    `;
    document.body.appendChild(wrap);
  }

  const concierge = document.querySelector('.concierge');
  const bubble = concierge.querySelector('.concierge-bubble');
  const closeBtn = concierge.querySelector('.concierge-close');
  bubble.addEventListener('click', () => concierge.classList.toggle('open'));
  closeBtn.addEventListener('click', () => concierge.classList.remove('open'));

  // Chips can pretend to send a message
  concierge.querySelectorAll('.concierge-chip').forEach(c => {
    c.addEventListener('click', () => {
      const body = concierge.querySelector('.concierge-body');
      const you = document.createElement('div');
      you.className = 'concierge-msg you';
      you.textContent = c.textContent.replace('◇ ', '');
      body.appendChild(you);
      body.scrollTop = body.scrollHeight;
      setTimeout(() => {
        const reply = document.createElement('div');
        reply.className = 'concierge-msg them';
        reply.innerHTML = "A pleasure. <em>Un instant</em> — I'll thread you to the right artist now.";
        body.appendChild(reply);
        body.scrollTop = body.scrollHeight;
      }, 700);
    });
  });

  // Language switch (shared across pages)
  document.querySelectorAll('.lang-switch').forEach(sw => {
    sw.querySelectorAll('button').forEach(b => {
      b.addEventListener('click', () => {
        sw.querySelectorAll('button').forEach(x => x.classList.remove('on'));
        b.classList.add('on');
        sw.classList.toggle('fr', b.dataset.lang === 'fr');
      });
    });
  });

  // Subtle reveal on intersection
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
})();
