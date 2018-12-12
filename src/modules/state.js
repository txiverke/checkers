const state = {
  user: [],
  machine: [],
  coords: {},
  history: [],
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
  },
  update(prop, from, to) {
    const index = this[prop].findIndex(index => index === from);
    this[prop].splice(index, 1, to);
  },
  delete(prop, item) {
    const index = this[prop].findIndex(index => index === from);
    this[prop].splice(index, 1);
  },
};

export default state;
