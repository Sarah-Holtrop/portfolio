import { makeAutoObservable, flow } from "mobx";
import axios from "axios";

class Store {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }
  user = {};
  programs = [];

  getUser = flow(function* () {
    let res = yield axios.get('/api/user/getUser');
    this.user = res.data.data;
  })

  getProgram = flow(function* () {
    let res = yield axios.get('/api/coach/getPrograms');
    return res.data.result;
  })
}

const State = new Store();
export default State;