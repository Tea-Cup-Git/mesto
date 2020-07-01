export default class UserInfo {
  constructor({ user, input }) {
    this._userName = user.name;
    this._userAbout = user.about;
    this._inputName = input.name;
    this._inputAbout = input.about;
  }

  getUserInfo() {
    this._inputName.value = this._userName.textContent;
    this._inputAbout.value = this._userAbout.textContent;
    const userData = {
      name: this._userName.textContent,
      about: this._userAbout.textContent
    }
    return userData;
  }

  setUserInfo(userData) {
    userData.name = this._inputName.value;
    userData.about = this._inputAbout.value;
    this._userName.textContent = userData.name;
    this._userAbout.textContent = userData.about;
  }
}
