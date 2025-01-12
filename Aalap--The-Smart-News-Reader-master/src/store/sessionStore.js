import { observable, action } from 'mobx';

class SessionStore {
  @observable authUser = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setAuthUser = authUser => {
    if(!this.authUser)
      this.authUser = authUser;
  };
 
}

export default SessionStore;
