// A three-level outline follows the same heading semantics as Markdown: H1–H3.
const article = document.querySelector('.article-main article');
const toc = document.querySelector('[data-article-toc]');
const disclosure = document.querySelector('.toc-disclosure');

if (article && toc && disclosure) {
  const headings = [...article.querySelectorAll('h1, h2, h3')];
  const root = document.createElement('ol');
  const stack = [{ level: 0, list: root }];
  let section = 'article';
  const links = new Map();

  for (const heading of headings) {
    const level = Number(heading.tagName.slice(1));
    if (!heading.id) {
      const slug = heading.textContent.trim().replace(/^\d+(?:\.\d+)*[.、]?\s*/, '')
        .replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').toLowerCase();
      const base = `${section}-${slug || 'section'}`;
      let id = base;
      let suffix = 2;
      while (document.getElementById(id)) id = `${base}-${suffix++}`;
      heading.id = id;
    }
    if (level === 2) section = heading.id;
    while (stack.length > 1 && stack.at(-1).level >= level) stack.pop();
    const parent = stack.at(-1);
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent.trim();
    link.dataset.level = String(level);
    item.append(link);
    parent.list.append(item);
    const children = document.createElement('ol');
    item.append(children);
    stack.push({ level, list: children });
    links.set(heading, link);
  }
  for (const list of root.querySelectorAll('ol')) if (!list.children.length) list.remove();
  toc.replaceChildren(root);

  const mobile = matchMedia('(max-width: 1100px)');
  const syncDisclosure = () => { disclosure.open = !mobile.matches; };
  syncDisclosure();
  mobile.addEventListener('change', syncDisclosure);
  toc.addEventListener('click', event => {
    if (event.target.closest('a') && mobile.matches) disclosure.open = false;
  });

  let current;
  let scheduled = false;
  const update = () => {
    scheduled = false;
    let active = headings[0];
    const threshold = (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0)
      + (parseFloat(getComputedStyle(headings[0]).scrollMarginTop) || 0) + 2;
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top <= threshold) active = heading;
      else break;
    }
    if (scrollY + innerHeight >= document.documentElement.scrollHeight - 2) active = headings.at(-1);
    if (current === active) return;
    if (current) links.get(current).removeAttribute('aria-current');
    current = active;
    const link = links.get(active);
    link.setAttribute('aria-current', 'location');
    if (!mobile.matches) {
      const box = toc.getBoundingClientRect();
      const rect = link.getBoundingClientRect();
      if (rect.top < box.top || rect.bottom > box.bottom) toc.scrollTop += rect.top - box.top - 32;
    }
  };
  addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  }, { passive: true });
  // Newly generated H3 anchors also work when opening a shared URL directly.
  if (location.hash) {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { id = ''; }
    if (headings.some(heading => heading.id === id)) document.getElementById(id).scrollIntoView();
  }
  update();
}
