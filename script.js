document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('aaronjacob9820@gmail.com');
    status.textContent = 'Email copied!';
  } catch {
    status.textContent = 'Copy: aaronjacob9820@gmail.com';
  }
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const progress = document.createElement('div');
progress.className = 'reading-progress';
progress.setAttribute('aria-hidden', 'true');
document.body.append(progress);
function updateProgress() {
  const available = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${available > 0 ? window.scrollY / available * 100 : 0}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();
if (!reducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });
  document.querySelectorAll('.section-heading, .featured, .project-grid article, .dungeon, .about > div, .skill-row').forEach(element => {
    element.classList.add('reveal');
    observer.observe(element);
  });
  document.body.classList.add('motion-ready');
  const hero = document.querySelector('.hero');
  const background = document.querySelector('.hero-backdrop');
  hero.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    background.style.transform = `scale(1.04) translate(${x * 10}px, ${y * 8}px)`;
  });
  hero.addEventListener('pointerleave', () => { background.style.transform = ''; });
}
