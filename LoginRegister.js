function togglePassword(inputId, icon) {
  const passwordInput = document.getElementById(inputId);
  const isHidden = passwordInput.type === "password";

  if (isHidden) {
    passwordInput.type = "text";
    icon.src = "assets/show.png";
    icon.alt = "Hide Password";
  } else {
    passwordInput.type = "password";
    icon.src = "assets/hide.png";
    icon.alt = "Show Password";
  }

  icon.classList.remove("smmooth-change");
  void icon.offsetWidth;
  icon.classList.add("smooth-change");
}

function showPopup(message) {
  const popup = document.createElement('div');
  popup.classList.add('popup-success');
  popup.textContent = message;

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add('show');
  }, 100);

  setTimeout(() => {
    popup.classList.remove('show');
    setTimeout(() => popup.remove(), 500);
  }, 2500);
}

function login() {
  showPopup("✅ Login Berhasil!");
  setTimeout(() => {
    window.location.href = "homepage.html";
  }, 2000);
}