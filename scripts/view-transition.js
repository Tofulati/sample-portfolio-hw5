document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a').forEach(link => {
    if (!link.href.startsWith(location.origin)) return; 

    link.addEventListener('click', (e) => {
      e.preventDefault();

      const currentPage = document.body; 
      const targetUrl = link.href;

      currentPage.style.animation = 'swipeLeftOut 0.5s ease forwards';

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 500);
    });
  });
});
