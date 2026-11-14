
const notFound = document.querySelector(".not-found");
const backBtn = document.querySelector(".not-found__back-btn");
const clearBtn = document.querySelector(".not-found__clear-btn");

// Показати повідомлення
export function showNotFound() {
  if (notFound) {
    notFound.hidden = false;
  }
}

// Приховати повідомлення
export function hideNotFound() {
  if (notFound) {
    notFound.hidden = true;
  }
}

// Налаштування кнопок
export function initNotFound(resetFilters) {
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "./index.html";
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      resetFilters();
      hideNotFound();
    });
  }
}
