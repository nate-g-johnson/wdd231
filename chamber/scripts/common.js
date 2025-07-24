// Hamburger menu toggle for small screens
function setupHamburgerMenu() {
  const menuButton = document.getElementById('menu-button');
  const menu = document.getElementById('menu');

  if (!menuButton || !menu) return;

  menuButton.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  // Close menu when clicking outside or on a menu link
  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && event.target !== menuButton) {
      menu.classList.remove('active');
    }
  });
}

// Display current year and last modified date in footer
function displayFooterDates() {
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  const lastModifiedSpan = document.getElementById('lastModified');
  if (lastModifiedSpan) lastModifiedSpan.textContent = document.lastModified;
}

// Initialize shared features
document.addEventListener('DOMContentLoaded', () => {
  setupHamburgerMenu();
  displayFooterDates();
});
