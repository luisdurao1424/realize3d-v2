const Store = (() => {
  let state = window.state || {};
  const subscribers = new Set();

  function get() {
    return state;
  }

  function set(nextState) {
    state = nextState;
    notify();
    return state;
  }

  function update(mutator) {
    const nextState = mutator(state);
    if (nextState !== undefined) {
      state = nextState;
    }
    notify();
    return state;
  }

  function subscribe(callback) {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  }

  function notify() {
    subscribers.forEach(callback => callback(state));
  }

  return { get, set, update, subscribe, notify };
})();

window.Store = Store;

export { Store };
