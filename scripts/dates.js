// Date functionality
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = document.getElementById('currentyear');
    const lastModified = document.getElementById('lastModified');

    // Set current year
    currentYear.textContent = new Date().getFullYear();
    
    // Set last modified date
    lastModified.textContent = `Last modified: ${document.lastModified}`;
});