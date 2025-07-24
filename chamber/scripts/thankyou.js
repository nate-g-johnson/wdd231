// Display submitted form info from URL query params
function displayFormData() {
  const params = new URLSearchParams(window.location.search);
  const requiredFields = [
    { id: 'first-name', name: 'First Name' },
    { id: 'last-name', name: 'Last Name' },
    { id: 'email', name: 'Email' },
    { id: 'mobile', name: 'Mobile Phone' },
    { id: 'business-name', name: 'Business Name' },
    { id: 'timestamp', name: 'Timestamp' }
  ];

  const container = document.getElementById('submitted-info');
  if (!container) return;

  requiredFields.forEach(field => {
    const value = params.get(field.id) || '(Not provided)';
    const p = document.createElement('p');
    p.innerHTML = `<strong>${field.name}:</strong> ${value}`;
    container.appendChild(p);
  });
}

document.addEventListener('DOMContentLoaded', displayFormData);
