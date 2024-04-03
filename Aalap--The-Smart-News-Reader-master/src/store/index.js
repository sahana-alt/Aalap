import appStore from './appStore';
import SessionStore from './sessionStore';
import UserStore from './userStore';

const allStore = () => ({
  homeStore: {name: 'bob', age: '12'},
  appStore: new appStore(),
  userStore: new UserStore(),
  sessionStore: new SessionStore()
});

export default allStore();
