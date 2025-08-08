import { showModal } from './modal.js';

export let allTrails = [];

export async function loadTrails() {
  const trailList = document.getElementById('trailList');

  try {
    const response = await fetch('data/trails.json');
    if (!response.ok) throw new Error('Failed to load trail data.');

    allTrails = await response.json();
    displayTrails(allTrails);
  } catch (error) {
    trailList.innerHTML = `<p class="error">Error loading trails: ${error.message}</p>`;
  }
}

export function displayTrails(trails) {
  const trailList = document.getElementById('trailList');
  trailList.innerHTML = '';

  trails.forEach((trail, index) => {
    const card = document.createElement('div');
    card.classList.add('trail-card');
    card.setAttribute('data-index', index);

    card.innerHTML = `
      <h2>${trail.name}</h2>
      <p><strong>Length:</strong> ${trail.length}</p>
      <p><strong>Difficulty:</strong> ${trail.difficulty}</p>
      <p><strong>Terrain:</strong> ${trail.terrain}</p>
      <p><strong>Features:</strong> ${trail.features.join(', ')}</p>
    `;

    card.addEventListener('click', () => showModal(trail));
    trailList.appendChild(card);
  });
}

export function setupFiltersAndSorting() {
  const filter = document.getElementById('difficultyFilter');
  const sorter = document.getElementById('sortBy');

  // Restore filter and sort from localStorage
  if (localStorage.getItem('trailFilter')) {
    filter.value = localStorage.getItem('trailFilter');
  }
  if (localStorage.getItem('trailSort')) {
    sorter.value = localStorage.getItem('trailSort');
  }

  filter.addEventListener('change', () => {
    localStorage.setItem('trailFilter', filter.value);
    updateTrailList();
  });
  sorter.addEventListener('change', () => {
    localStorage.setItem('trailSort', sorter.value);
    updateTrailList();
  });
  updateTrailList();
}

export function updateTrailList() {
  const filterValue = document.getElementById('difficultyFilter').value;
  const sortValue = document.getElementById('sortBy').value;

  let filtered = [...allTrails];

  if (filterValue !== 'All') {
    filtered = filtered.filter(trail => trail.difficulty === filterValue);
  }

  if (sortValue === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortValue === 'length') {
    filtered.sort((a, b) => {
      const numA = parseFloat(a.length);
      const numB = parseFloat(b.length);
      return numA - numB;
    });
  }

  displayTrails(filtered);
}
