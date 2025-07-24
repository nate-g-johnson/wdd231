// Set timestamp when page loads
function setTimestamp() {
  const timestampField = document.getElementById('timestamp');
  if (!timestampField) return;
  timestampField.value = new Date().toISOString();
}

document.addEventListener("DOMContentLoaded", () => {
  const viewButtons = document.querySelectorAll(".view-benefits");
  const closeButtons = document.querySelectorAll(".close-modal");

  viewButtons.forEach(button => {
    button.addEventListener("click", () => {
      const modalId = button.dataset.modal;
      const modal = document.getElementById(modalId);
      if (modal) modal.showModal();
    });
  });

  closeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const modal = button.closest("dialog");
      if (modal) modal.close();
    });
  });

  document.querySelectorAll("dialog").forEach(dialog => {
    dialog.addEventListener("click", (e) => {
      const rect = dialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        dialog.close();
      }
    });
  });
});

