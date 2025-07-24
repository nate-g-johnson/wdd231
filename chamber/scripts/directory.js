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
  if (!container) return;
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

  if (!gridButton || !listButton || !container) return;

  gridButton.addEventListener('click', () => {
    container.classList.add('grid-view');
    container.classList.remove('list-view');
  });

  listButton.addEventListener('click', () => {
    container.classList.add('list-view');
    container.classList.remove('grid-view');
  });
}

// Initialize directory page features
document.addEventListener('DOMContentLoaded', () => {
  getMembers();
  setupViewToggle();
});
