const url = 'data/members.json';

// Fetch and display members
async function getMembers() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

function displayMembers(members) {
  const container = document.getElementById('members-container');
  container.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');

    const img = document.createElement("img");
    img.src = `images/${member.image}`;
    img.alt = `${member.name} logo`;
    img.loading = "lazy";

    const info = document.createElement("div");
    info.classList.add("member-info");
    info.innerHTML = `
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
    `;

    card.appendChild(img);
    card.appendChild(info);
    container.appendChild(card);
  });
}

// Toggle between grid and list views
function setupViewToggle() {
  const gridButton = document.getElementById('grid-view');
  const listButton = document.getElementById('list-view');
  const container = document.getElementById('members-container');

  gridButton.addEventListener('click', () => {
    container.classList.add('grid-view');
    container.classList.remove('list-view');
  });

  listButton.addEventListener('click', () => {
    container.classList.add('list-view');
    container.classList.remove('grid-view');
  });
}

// Hamburger menu toggle for small screens
function setupHamburgerMenu() {
  const menuButton = document.getElementById('menu-button');
  const menu = document.getElementById('menu');

  menuButton.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  // Optional: Close menu when clicking outside or on a menu link
  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && event.target !== menuButton) {
      menu.classList.remove('active');
    }
  });
}

function displayFooterDates() {
  // Display current year
  const yearSpan = document.getElementById('year');
  yearSpan.textContent = new Date().getFullYear();

  // Display last modified date
  const lastModifiedSpan = document.getElementById('lastModified');
  lastModifiedSpan.textContent = document.lastModified;
}

// Initialize all functionality on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  getMembers();
  setupViewToggle();
  setupHamburgerMenu();
  displayFooterDates();
});
