(function () {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Simple lead capture (no backend). Stores in localStorage and logs for now.
  // Replace with your form handler (HubSpot, GoHighLevel, Zapier Webhook, Netlify Forms, etc.)
  const form = document.getElementById("leadForm");
  const msg = document.getElementById("formMsg");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());

    // Basic validation (browser already does required fields)
    if (!data.name || !data.email || !data.profile) {
      if (msg) msg.textContent = "Please complete the required fields.";
      return;
    }

    // Save locally (demo)
    const key = "bms_leads";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push({ ...data, createdAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(existing));

    // Show success
    form.reset();
    if (msg) msg.textContent = "Thanks! We received your info and will follow up shortly.";

    // Also log for debugging
    console.log("Lead captured:", data);
  });
})();
