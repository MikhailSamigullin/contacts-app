import {makeAutoObservable} from 'mobx';

export default class UserStore {
  [x: string]: any;
  constructor() {
    this._isAuth = true;
    this._user = {};
    // Here is mobx look at this variables and rerender components
    makeAutoObservable(this);

  }

  setIsAuth(boolean: Boolean) {
    this._isAuth = boolean;
  }

  setUser(user: any) {
    this._user = user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }
}
