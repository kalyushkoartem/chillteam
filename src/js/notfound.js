
const notFound = document.querySelector(".notfound[hidden]");
const backBtn = document.querySelector(".notfound__backbtn");
const clearBtn = document.querySelector(".notfound__clearbtn");

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
