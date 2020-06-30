export default class FormValidator {
  constructor(formConfig, formElement) {
    this._formConfig = formConfig;
    this._formElement = formElement;
  }

  // Отобразить ошибку валидации
  _showInputError(formElement, inputElement, errorMessage, formConfig) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(formConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formConfig.errorClass);
  }

  // Скрыть ошибку валидации
  _hideInputError(formElement, inputElement, formConfig) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(formConfig.inputErrorClass);
    errorElement.classList.remove(formConfig.errorClass);
    errorElement.textContent = '';
  }

  // Очистить ошибки полей ввода
  resetErrors(formConfig) {
    const errors = this._formElement.querySelectorAll(formConfig.inputErrorClass);
    errors.forEach(error => error.classList.remove(formConfig.errorClass));
  }

  // Сброс состояния кнопки сабмита
  resetButton(formConfig) {
    this._formElement.querySelector(formConfig.buttonSelector).classList.add(formConfig.inactiveButtonClass);
    this._formElement.querySelector(formConfig.buttonSelector).disabled = true;
  }

  // Проверить валидность поля
  _checkInputValidity(formElement, inputElement, formConfig) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, formConfig);
    } else {
      this._hideInputError(formElement, inputElement, formConfig);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Переключение состояния кнопки
  _toggleButtonState(inputList, buttonElement, formConfig) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(formConfig.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(formConfig.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  // Проверять валидность полей на каждый ввод символа
  _setEventListeners(formElement, formConfig) {
    const inputList = Array.from(formElement.querySelectorAll(formConfig.inputSelector));
    const buttonElement = formElement.querySelector(formConfig.buttonSelector);
    this._toggleButtonState(inputList, buttonElement, formConfig);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, formConfig);
        this._toggleButtonState(inputList, buttonElement, formConfig);
      });
    });
  }

  // Активировать валидацию
  enableValidation() {
    this._setEventListeners(this._formElement, this._formConfig);
  }
}
