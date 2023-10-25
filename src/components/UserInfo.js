import {
  profileName,
  profileTitle,
  profileModalName,
  profileModalTitle,
} from "../utils/constants.js";

export default class UserInfo {
  constructor(userNameSelector, aboutSelector) {
    this._name = document.querySelector(userNameSelector);
    this._about = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
    };
    return userInfo;
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
}
