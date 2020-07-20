export const renderLoading = (isLoading = false) => {
  const currentSubmitButton = document.querySelector('.popup_open .popup__submit-button');
  if (isLoading) {
    currentSubmitButton.textContent = 'Загрузка...';
    return;
  }
  currentSubmitButton.textContent = 'Сохранить';
};
