const state = {
  user: [],
  machine: [],
  coords: {},
  get(prop) {
    if (prop) {
      return this[prop];
    }

    return { user: this.user, machine: this.machine };
  },
  set(prop, item) {
    this[prop].push(item);
  },
  update(prop, from, to) {
    const index = this[prop].findIndex(index => index === from);
    this[prop].splice(index, 1, to);
  },
};

export default state;
