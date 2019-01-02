const state = {
  username: '',
  user: [],
  machine: [],
  coords: {},
  history: [],
  result: {
    user: 0,
    machine: 0,
  },
  get() {
    return {
      user: this.user,
      machine: this.machine,
      coords: this.coords,
      history: this.history,
    };
  },
  set(prop, item) {
    this[prop].push(item);

    if (prop === 'history') {
      this.historyListener();
    }
  },
  update(prop, from, to) {
    const index = this[prop].findIndex(index => index === from);
    this[prop].splice(index, 1, to).sort();
  },
  delete(prop, item) {
    const index = this[prop].findIndex(index => index === item);
    this[prop].splice(index, 1);
  },
  reset() {
    this.machine = [];
    this.user = [];
    this.history = [];
    this.username = '';
    this.result.user = 0;
    this.result.machine = 0;
  },
  increase(obj) {
    this.result[obj.name]++;
    this.resultListener();
  },
  registerListener(name, listener) {
    this[`${name}Listener`] = listener;
  },
};

export default state;
