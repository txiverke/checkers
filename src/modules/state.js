const state = {
  user: [],
  machine: [],
  coords: {},
  history: [],
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
    console.log(this[prop], from, to)
    this[prop].splice(index, 1, to);
    console.log(this[prop])
  },
};

export default state;
