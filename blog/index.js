// Each category owns its sorting controls; article numbers remain fixed.
const expandCategory = hash => {
  let id;
  try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
  const category = document.getElementById(id);
  if (!category?.matches('.blog-category')) return;
  const disclosure = category.querySelector('.category-disclosure');
  if (disclosure) disclosure.open = true;
};

// Handle repeated clicks on the current hash as well as direct/back navigation.
document.querySelector('.category-links')?.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (link) expandCategory(link.hash);
});
addEventListener('hashchange', () => expandCategory(location.hash));
expandCategory(location.hash);

for (const category of document.querySelectorAll('.blog-category')) {
  const select = category.querySelector('[data-blog-sort]');
  const grid = category.querySelector('.blog-card-grid');
  if (!select || !grid) continue;

  const cards = [...grid.children].map(card => ({
    element: card,
    order: Number(card.dataset.order),
    published: card.querySelector('[data-published]').dateTime,
    updated: card.querySelector('[data-updated]').dateTime,
  }));
  const sort = () => {
    const [field, direction] = select.value.split('-');
    const sorted = [...cards].sort((a, b) => {
      // ISO dates compare chronologically; ties keep the editorial order.
      const dateOrder = field === 'order' ? 0 : a[field].localeCompare(b[field]);
      return dateOrder * (direction === 'desc' ? -1 : 1) || a.order - b.order;
    });
    grid.append(...sorted.map(card => card.element));
  };
  select.addEventListener('change', () => {
    sort();
    const status = category.querySelector('.sort-status');
    if (status) status.textContent = `已按${select.selectedOptions[0].textContent}排列 ${cards.length} 篇文章`;
  });
  sort();
  select.closest('.blog-sort').hidden = false;
}
