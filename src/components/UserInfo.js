export default class UserInfo {
  constructor({ userName, userAbout, userAvatar }) {
    this._userName = userName;
    this._userAbout = userAbout;
    this._userAvatar = userAvatar;
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userAbout: this._userAbout.textContent,
      userAvatar: this._userAvatar.src
    }
  }

  setUserInfo({userName, userAbout, userAvatar}) {
    if (userName) this._userName.textContent = userName;
    if (userAbout) this._userAbout.textContent = userAbout;
    if (userAvatar) this._userAvatar.src = userAvatar;
  }
}
