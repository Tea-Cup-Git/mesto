import {
  inputProfileName,
  inputProfileAbout
} from '../utils/constants.js';

export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector }) {
    this._userNameSelector = userNameSelector;
    this._userAboutSelector = userAboutSelector;
  }

  getUserInfo() {
    inputProfileName.value = this._userNameSelector.textContent;
    inputProfileAbout.value = this._userAboutSelector.textContent;
  }

  setUserInfo() {
    this._userNameSelector.textContent = inputProfileName.value;
    this._userAboutSelector.textContent = inputProfileAbout.value;
  }
}
