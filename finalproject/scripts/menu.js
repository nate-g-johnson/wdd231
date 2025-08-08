export function setupHamburgerMenu() {
  const menuButton = document.getElementById('menu-button');
  const menu = document.getElementById('menu');

  if (!menuButton || !menu) return;

  menuButton.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && event.target !== menuButton) {
      menu.classList.remove('active');
    }
  });
}

export function displayLastModified() {
  const lastModifiedSpan = document.getElementById('lastModified');
  if (!lastModifiedSpan) return;

  const rawDate = document.lastModified;
  if (!rawDate) {
    lastModifiedSpan.textContent = "Unknown";
    return;
  }

  const dateObj = new Date(rawDate);
  if (isNaN(dateObj)) {
    lastModifiedSpan.textContent = "Unknown";
    return;
  }

  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: '2-digit' 
  };
  const formattedDate = dateObj.toLocaleString(undefined, options);

  lastModifiedSpan.textContent = formattedDate;
}

export function displayFooterDates() {
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  displayLastModified();
}
