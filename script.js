/* ============================================================
   $JOEL — The African Bull · front-end behavior
   ============================================================ */

// The Dexscreener pair the user shared (Solana)
const PAIR_ADDRESS = 'F4RpL9YWn66LEqQAqR69okWtA36To1qKCpe7kdZUyT9J';
const CHAIN = 'solana';
const DEX_URL = `https://dexscreener.com/${CHAIN}/${PAIR_ADDRESS}`;

/* ---- year ---- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---- wire external links ---- */
['buyDexscreener', 'socialDex'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.href = DEX_URL;
});

/* ---- Dexscreener chart embed ---- */
(function embedChart () {
  const host = document.getElementById('dexEmbed');
  if (!host) return;
  const iframe = document.createElement('iframe');
  iframe.src = `https://dexscreener.com/${CHAIN}/${PAIR_ADDRESS}?embed=1&loadChartSettings=0&theme=dark&chartTheme=dark&info=0`;
  iframe.title = '$JOEL live chart';
  iframe.loading = 'lazy';
  iframe.allow = 'clipboard-write';
  host.appendChild(iframe);

  // fallback link in case the embed is blocked
  const fb = document.createElement('div');
  fb.className = 'chart-fallback';
  fb.innerHTML = `Chart not loading? <a href="${DEX_URL}" target="_blank" rel="noopener">Open on Dexscreener →</a>`;
  host.appendChild(fb);
})();

/* ---- fetch real contract (base token mint) from Dexscreener API ---- */
(async function loadContract () {
  const caValue = document.getElementById('caValue');
  const caCopy = document.getElementById('caCopy');
  const caBox = document.getElementById('caBox');
  let contract = PAIR_ADDRESS; // sensible fallback

  try {
    const res = await fetch(`https://api.dexscreener.com/latest/dex/pairs/${CHAIN}/${PAIR_ADDRESS}`);
    if (res.ok) {
      const data = await res.json();
      const pair = data?.pair || (data?.pairs && data.pairs[0]);
      if (pair?.baseToken?.address) contract = pair.baseToken.address;
    }
  } catch (_) { /* offline / blocked — keep fallback */ }

  caValue.textContent = contract;
  caValue.dataset.full = contract;

  const doCopy = () => {
    navigator.clipboard?.writeText(contract).then(() => {
      caCopy.textContent = 'Copied!';
      caCopy.classList.add('copied');
      setTimeout(() => { caCopy.textContent = 'Copy'; caCopy.classList.remove('copied'); }, 1600);
    });
  };
  caBox.addEventListener('click', doCopy);
  caCopy.addEventListener('click', e => { e.stopPropagation(); doCopy(); });
})();

/* ---- count-up stats ---- */
(function counters () {
  const nums = document.querySelectorAll('.stat-num[data-count]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.count;
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const tick = () => {
        cur = Math.min(target, cur + step);
        el.textContent = cur;
        if (cur < target) requestAnimationFrame(tick);
      };
      tick();
      io.unobserve(el);
    });
  }, { threshold: 0.6 });
  nums.forEach(n => io.observe(n));
})();

/* ---- floating coin field ---- */
(function coinField () {
  const field = document.getElementById('coinsField');
  if (!field || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const glyphs = ['$JOEL', '🐂', '◎', 'J', '💚', '$'];
  const count = window.innerWidth < 600 ? 8 : 16;
  for (let i = 0; i < count; i++) {
    const c = document.createElement('span');
    c.className = 'c';
    c.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    c.style.left = Math.random() * 100 + 'vw';
    c.style.fontSize = (Math.random() * 2.2 + 1.2) + 'rem';
    c.style.animationDuration = (Math.random() * 14 + 12) + 's';
    c.style.animationDelay = (-Math.random() * 20) + 's';
    field.appendChild(c);
  }
})();

/* ---- subtle nav shadow on scroll ---- */
(function navShadow () {
  const nav = document.getElementById('nav');
  const onScroll = () => nav.style.boxShadow = window.scrollY > 20 ? '0 8px 30px rgba(0,0,0,.5)' : 'none';
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
