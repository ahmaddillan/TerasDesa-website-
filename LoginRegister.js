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