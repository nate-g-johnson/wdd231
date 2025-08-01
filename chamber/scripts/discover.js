document.addEventListener('DOMContentLoaded', () => {
  const spotlightContainer = document.getElementById('discover-container');
  const lastVisitMsg = document.getElementById('last-visit-message');
  const placesJsonUrl = 'data/discover-places.json';

  // Load and render places from JSON
  fetch(placesJsonUrl)
    .then(response => response.json())
    .then(data => {
      renderPlaces(data);
    })
    .catch(err => {
      spotlightContainer.innerHTML = '<p>Failed to load places data.</p>';
      console.error(err);
    });

  // Render place cards
  function renderPlaces(places) {
    spotlightContainer.innerHTML = ''; // clear

    places.forEach(place => {
      const card = document.createElement('article');
      card.className = 'discover-card';

      card.innerHTML = 
      `<h2>${place.name}</h2>
        <figure>
            <img src="images/${place.image}" alt="${place.name} photo" loading="lazy" width="300" height="200">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button class="learn-more-btn" aria-label="Learn more about ${place.name}">Learn More</button>`;


      spotlightContainer.appendChild(card);

      // Add click event to open the URL in a new tab
      const learnMoreBtn = card.querySelector('.learn-more-btn');
      if (learnMoreBtn && place.url) {
        learnMoreBtn.addEventListener('click', () => {
          window.open(place.url, '_blank', 'noopener');
        });
      }
    });

    setupImageHoverEffect();
  }

  // Last visit logic using localStorage and Date.now()
  function displayLastVisitMessage() {
    const lastVisitKey = 'discoverPageLastVisit';
    const now = Date.now();
    const lastVisit = localStorage.getItem(lastVisitKey);

    if (!lastVisit) {
      lastVisitMsg.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const diffMs = now - parseInt(lastVisit, 10);
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays < 1) {
        lastVisitMsg.textContent = "Back so soon! Awesome!";
      } else if (diffDays === 1) {
        lastVisitMsg.textContent = "You last visited 1 day ago.";
      } else {
        lastVisitMsg.textContent = `You last visited ${diffDays} days ago.`;
      }
    }

    localStorage.setItem(lastVisitKey, now.toString());
  }

  // Setup hover effect for images
  function setupImageHoverEffect() {
    if (window.matchMedia('(min-width: 641px)').matches) {
      const images = document.querySelectorAll('.place-card img');
      images.forEach(img => {
        img.addEventListener('mouseenter', () => {
          img.style.filter = 'brightness(85%) contrast(110%)';
          img.style.transition = 'filter 0.3s ease';
        });
        img.addEventListener('mouseleave', () => {
          img.style.filter = 'none';
        });
      });
    }
  }

  // Initialize
  displayLastVisitMessage();
});
