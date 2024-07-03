export function renderLoading(popup, isLoading) {
    const popupButton = popup.querySelector('.popup__button');
    if (isLoading) {
        popupButton.textContent = "Сохранение..."
    }
    else {
      popupButton.textContent = "Сохранить"
    }
  }