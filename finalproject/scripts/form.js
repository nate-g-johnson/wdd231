export function setupFormValidation() {
  const form = document.querySelector("#contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      e.preventDefault();
      alert("Please fill out all fields before submitting.");
    }
  });
}

export function displayFormData() {
  const params = new URLSearchParams(window.location.search);
  const formDataDiv = document.querySelector("#formData");

  if (!formDataDiv) return;

  if (params.has("name") && params.has("email") && params.has("message")) {
    formDataDiv.innerHTML = `
      <p><strong>Name:</strong> ${params.get("name")}</p>
      <p><strong>Email:</strong> ${params.get("email")}</p>
      <p><strong>Message:</strong> ${params.get("message")}</p>
    `;
  } else {
    formDataDiv.innerHTML = `<p>No form data found.</p>`;
  }
}
