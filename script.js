// Helper to get cookie value
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Apply saved preferences on load
window.onload = () => {
  const savedSize = getCookie("fontsize");
  const savedColor = getCookie("fontcolor");

  if (savedSize) {
    document.documentElement.style.setProperty("--fontsize", savedSize + "px");
    document.getElementById("fontsize").value = savedSize;
  }

  if (savedColor) {
    document.documentElement.style.setProperty("--fontcolor", savedColor);
    document.getElementById("fontcolor").value = savedColor;
  }
};

// Handle form submit & save to cookies
document.getElementById("settingsForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const size = document.getElementById("fontsize").value;
  const color = document.getElementById("fontcolor").value;

  document.cookie = `fontsize=${size}; path=/`;
  document.cookie = `fontcolor=${color}; path=/`;

  document.documentElement.style.setProperty("--fontsize", size + "px");
  document.documentElement.style.setProperty("--fontcolor", color);
});
