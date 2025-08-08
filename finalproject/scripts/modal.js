export function setupModal() {
  const modal = document.getElementById('trailModal');
  const closeBtn = document.getElementById('closeModal');

  if (!modal || !closeBtn) return;

  // Close modal on close button click
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    closeBtn.setAttribute('aria-expanded', 'false');
  });

  // Close modal when clicking outside modal content
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      closeBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Accessibility: close modal on Escape key press
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
      closeBtn.setAttribute('aria-expanded', 'false');
      closeBtn.focus();
    }
  });
}
export function showModal(trail) {
  const modal = document.getElementById('trailModal');
  const content = document.getElementById('modalDetails');

  if (!modal || !content) return;

  content.innerHTML = `
    <h2>${trail.name}</h2>
    <p><strong>Length:</strong> ${trail.length}</p>
    <p><strong>Difficulty:</strong> ${trail.difficulty}</p>
    <p><strong>Terrain:</strong> ${trail.terrain}</p>
    <p><strong>Features:</strong> ${trail.features.join(', ')}</p>
  `;

  modal.classList.remove('hidden');
}
