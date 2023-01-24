import {makeAutoObservable} from "mobx";

export default class ClientStore {
  _clients: any;
  _page: number;
  _totalCount: number;
  _limit: number;
  constructor() {
    this._clients = []
    this._page = 1
    this._totalCount = 0
    this._limit = 3
    makeAutoObservable(this)
  }

  setClients(clients: any) {
    this._clients = clients;
  }

  setPage(page: number) {
    this._page = page;
  }

  setLimit(limit: number) {
    this._limit = limit;
  }

  setTotalCount(count: number) {
    this._totalCount = count;
  }

  
  get clients() {
    return this._clients;
  }
  get totalCount() {
    return this._totalCount;
  }
  get page() {
    return this._page;
  }
  get limit() {
    return this._limit;
  }

}
