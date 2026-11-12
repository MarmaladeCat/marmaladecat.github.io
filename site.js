// Keep anchor targets and the article outline below the actual navigation height,
// including wrapped mobile links, resized windows, and enlarged text.
const siteHeader = document.querySelector('.site-header');
if (siteHeader) {
  const syncHeaderHeight = () => {
    document.documentElement.style.setProperty('--site-header-height', `${siteHeader.getBoundingClientRect().height}px`);
  };
  syncHeaderHeight();
  new ResizeObserver(syncHeaderHeight).observe(siteHeader);
}
