const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const form = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const planButtons = document.querySelectorAll("[data-plan-view]");
const prices = document.querySelectorAll(".price");
const priceLabels = document.querySelectorAll(".price-label");

function setHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 10);
}

function closeNav() {
  document.body.classList.remove("nav-open");
  nav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

function scrollToTarget(selector) {
  const target = document.querySelector(selector);
  if (!target) return;
  const headerOffset = header.getBoundingClientRect().height + 10;
  const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top, behavior: "smooth" });
}

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const selector = link.getAttribute("href");
    if (selector.length <= 1) return;
    event.preventDefault();
    closeNav();
    scrollToTarget(selector);
  });
});

document.querySelectorAll("[data-scroll-target]").forEach((button) => {
  button.addEventListener("click", () => {
    scrollToTarget(button.dataset.scrollTarget);
  });
});

planButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const view = button.dataset.planView;
    planButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    prices.forEach((price) => {
      price.textContent = view === "monthly" ? price.dataset.monthly : price.dataset.single;
    });

    priceLabels.forEach((label) => {
      label.textContent = view === "monthly" ? label.dataset.monthlyLabel : label.dataset.singleLabel;
    });
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = new FormData(form);
  const firstName = data.get("firstName").toString().trim();
  const interest = data.get("interest").toString().trim();

  formStatus.textContent = `Thanks, ${firstName}. Your ${interest.toLowerCase()} request is ready to send to Speedie D's.`;
  form.reset();
});
