import { setupModal } from './modal.js';
import { setupHamburgerMenu } from './menu.js';
import { loadTrails, setupFiltersAndSorting } from './trails.js';
import { loadWeather } from './weather.js';
import { setupFormValidation, displayFormData } from './form.js';
import { displayFooterDates } from './menu.js';

document.addEventListener('DOMContentLoaded', () => {
  setupModal();
  setupHamburgerMenu();
  displayFooterDates();

  // Only load trails and filters if the #trailList exists (trails.html page)
  if (document.getElementById('trailList')) {
    loadTrails();
    setupFiltersAndSorting();
  }
  
  // Only load weather if element exists
  if (document.getElementById('weatherWidget')) {
    loadWeather();
  }

  // Only display form data if #formData exists (form action page)
  if (document.getElementById('formData')) {
    displayFormData();
  }

  // Only set up form validation if the form exists (contact.html)
  if (document.querySelector('#contactForm')) {
    setupFormValidation();
  }
});

