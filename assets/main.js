// ===== Loader & Page Fade-In =====
window.addEventListener("load", () => {
  setTimeout(() => {
    // Hide loader
    document.querySelector(".loader-wrapper").style.display = "none";

    // Show navbar
    const navbar = document.querySelector(".navbar");
    navbar.classList.add("loaded");

    // Fade in page content
    const content = document.querySelector(".page-content");
    content.classList.add("loaded");

    // Show footer (original frosted glass style)
    const footer = document.querySelector(".footer-container");
    footer.classList.add("loaded");

    // Start code typing
    cycleCodes();
  }, 3800); // loader duration in ms
});

// ===== Theme Toggle =====
const themeInput = document.getElementById('themeToggle');
const navbar = document.querySelector('.navbar');
const greeting = document.querySelector('.greeting');
const footer = document.querySelector('.footer-container');

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.style.background = '#000';
    navbar.style.background = 'rgba(255,255,255,0.4)';
    navbar.style.color = '#fff';
    greeting.style.color = '#fff';
    footer.style.background = 'rgba(255,255,255,0.15)'; // light footer on dark
    footer.style.color = '#fff';
    themeInput.checked = true;
  } else {
    document.body.style.background = 'url("assets/main-bg.jpg") no-repeat center center fixed';
    document.body.style.backgroundSize = 'cover';
    navbar.style.background = 'rgba(0,0,0,0.4)';
    navbar.style.color = '#fff';
    greeting.style.color = '#fff';
    footer.style.background = 'rgba(0,0,0,0.15)'; // dark footer on light
    footer.style.color = '#fff';
    themeInput.checked = false;
  }
  localStorage.setItem('theme', theme);
}

// Initialize saved theme
applyTheme(localStorage.getItem('theme') || 'light');

// Toggle theme on checkbox change
themeInput.addEventListener('change', () => {
  applyTheme(themeInput.checked ? 'dark' : 'light');
});

// ===== Code Typing =====
const codeDisplay = document.getElementById('code-display');

const codes = [
  `<body>\n    <h1>Welcome to DhairyaCode</h1>\n</body>`,
  `console.log("Welcome to DhairyaCode");`,
  `import React from 'react';\nconst App = () => <h1>Welcome to DhairyaCode</h1>;\nexport default App;`
];

let codeIndex = 0;

// Syntax highlighting
function highlightSyntax(code) {
  code = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  code = code.replace(/(["'`].*?["'`])/g, '<span class="string">$1</span>');
  code = code.replace(/(&lt;\/?[a-zA-Z0-9]+.*?&gt;)/g, '<span class="tag">$1</span>');
  code = code.replace(/\b(import|from|const|export|default|console|log)\b/g, '<span class="keyword">$1</span>');
  return code;
}

// Type code letter by letter
function typeCode(text, callback) {
  let i = 0;
  codeDisplay.textContent = ''; // clear previous code
  const interval = setInterval(() => {
    codeDisplay.textContent = text.slice(0, i);
    i++;
    if (i > text.length) {
      clearInterval(interval);
      codeDisplay.innerHTML = highlightSyntax(text);
      setTimeout(callback, 2500); // pause before next code
    }
  }, 15); // typing speed
}

// Cycle through all codes continuously
function cycleCodes() {
  typeCode(codes[codeIndex], () => {
    codeIndex = (codeIndex + 1) % codes.length;
    cycleCodes();
  });
}

// ===== Card Redirect Function =====
function redirectCard(url) {
  window.open(url, '_blank');
}
