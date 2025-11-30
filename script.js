//your JS code here. If required.
// Get references to form elements
const form = document.querySelector('form');
const fontsizeInput = document.getElementById('fontsize');
const fontcolorInput = document.getElementById('fontcolor');

// Function to set a cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie by name
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Function to apply font settings to the page
function applyFontSettings(fontSize, fontColor) {
  // Set CSS variables
  document.documentElement.style.setProperty('--fontsize', fontSize + 'px');
  document.documentElement.style.setProperty('--fontcolor', fontColor);
}

// Load saved preferences from cookies on page load
function loadPreferences() {
  const savedFontSize = getCookie('fontsize');
  const savedFontColor = getCookie('fontcolor');
  
  if (savedFontSize) {
    // Apply saved font size
    fontsizeInput.value = savedFontSize;
    applyFontSettings(savedFontSize, savedFontColor || '#000000');
  }
  
  if (savedFontColor) {
    // Apply saved font color
    fontcolorInput.value = savedFontColor;
    applyFontSettings(savedFontSize || 16, savedFontColor);
  }
}

// Handle form submission
form.addEventListener('submit', function(event) {
  // Prevent default form submission
  event.preventDefault();
  
  // Get the values from inputs
  const fontSize = fontsizeInput.value;
  const fontColor = fontcolorInput.value;
  
  // Save preferences to cookies (expires in 365 days)
  setCookie('fontsize', fontSize, 365);
  setCookie('fontcolor', fontColor, 365);
  
  // Apply the settings immediately
  applyFontSettings(fontSize, fontColor);
});

// Load preferences when page loads
loadPreferences();