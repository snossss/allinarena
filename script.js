const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const dropdownButtons = document.querySelectorAll(".dropdown > .nav-link");
dropdownButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const parent = button.parentElement;
    if (!parent) {
      return;
    }

    const isOpen = parent.classList.contains("open");
    document.querySelectorAll(".dropdown.open, .dropdown.click-closed").forEach((dropdown) => {
      if (dropdown !== parent) {
        dropdown.classList.remove("open");
        dropdown.classList.remove("click-closed");
        const dropdownButton = dropdown.querySelector(".nav-link");
        if (dropdownButton) {
          dropdownButton.setAttribute("aria-expanded", "false");
        }
      }
    });

    parent.classList.toggle("open", !isOpen);
    parent.classList.toggle("click-closed", isOpen);
    button.setAttribute("aria-expanded", String(!isOpen));
  });

  button.parentElement?.addEventListener("mouseleave", () => {
    button.parentElement.classList.remove("click-closed");
  });
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".dropdown")) {
    return;
  }

  document.querySelectorAll(".dropdown.open").forEach((dropdown) => {
    dropdown.classList.remove("open");
    dropdown.classList.remove("click-closed");
    const button = dropdown.querySelector(".nav-link");
    if (button) {
      button.setAttribute("aria-expanded", "false");
    }
  });
});

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
