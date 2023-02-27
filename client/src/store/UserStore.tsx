import {makeAutoObservable} from 'mobx';

export default class UserStore {
  [x: string]: any;
  constructor() {
    this._users = []
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

  setUsers(users: any) {
    this._users = users;
  }

  get isAuth() {
    return this._isAuth;
  }

  get users() {
    return this._users;
  }

  get user() {
    return this._user;
  }
}
