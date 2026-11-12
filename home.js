const pages = document.querySelector('.home-pages');
const home = document.getElementById('home');
const writing = document.getElementById('writing');

if (pages && home && writing) {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const listTop = () => writing.offsetTop - home.offsetTop;
  let animating = false;
  let wheelLocked = false;
  let lastDirection = 0;
  let release;
  const holdGesture = () => {
    wheelLocked = true;
    clearTimeout(release);
    release = setTimeout(() => { wheelLocked = false; }, 220);
  };
  const flip = toList => {
    const from = pages.scrollTop;
    const started = performance.now();
    const duration = reducedMotion.matches ? 0 : 180;
    animating = true;
    pages.classList.add('is-flipping');
    const frame = now => {
      const progress = duration ? Math.min(1, (now - started) / duration) : 1;
      const target = toList ? listTop() : 0;
      const eased = 1 - (1 - progress) ** 3;
      pages.scrollTo({ top: from + (target - from) * eased, behavior: 'instant' });
      if (progress < 1) requestAnimationFrame(frame);
      else {
        pages.classList.remove('is-flipping');
        animating = false;
      }
    };
    requestAnimationFrame(frame);
  };

  // Flip only at screen boundaries; retain native scrolling within a long list.
  document.addEventListener('wheel', event => {
    if (event.ctrlKey || !event.deltaY) return;
    if (event.target.closest('select, input, textarea, [contenteditable="true"]')) return;
    const direction = Math.sign(event.deltaY);
    if (animating || (wheelLocked && direction === lastDirection)) {
      event.preventDefault();
      holdGesture();
      return;
    }
    const top = pages.scrollTop;
    const boundary = listTop();
    const coverEnd = Math.max(0, home.offsetHeight - pages.clientHeight);
    const leavingCover = direction > 0 && top < boundary - 2 && top >= coverEnd - 2;
    const returningHome = direction < 0 && top > coverEnd + 2 && top <= boundary + 2;
    if (leavingCover || returningHome) {
      event.preventDefault();
      lastDirection = direction;
      holdGesture();
      flip(leavingCover);
    } else if (direction < 0 && top > boundary + 2) {
      // A large wheel delta must not strand the viewport between the two screens.
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? pages.clientHeight : 1);
      if (top + delta <= boundary) {
        event.preventDefault();
        pages.scrollTo({ top: boundary, behavior: 'instant' });
      }
    }
  }, { passive: false });
}
