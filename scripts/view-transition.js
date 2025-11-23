document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a').forEach(link => {
    if (!link.href.startsWith(location.origin)) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetUrl = link.href;

      const overlay = document.createElement('div');
      overlay.className = 'page-transition-overlay';
      document.body.appendChild(overlay);

      overlay.style.animation = 'overlaySlideIn 0.8s ease forwards';

      overlay.addEventListener('animationend', () => {
        window.location.href = targetUrl;
      });
    });
  });
});
