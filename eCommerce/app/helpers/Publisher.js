export class Publisher {
  constructor() {
    this.subscribers = {};
  }

  get methods() {
    return {
      subscribe: this.subscribe,
      unsubscribe: this.unsubscribe,
      notify: this.notify,
    };
  }

  subscribe = (event, callbackFunc) => {
    !this.subscribers[event] ? this.subscribers[event] = [] : this.subscribers[event];
    this.subscribers[event].push(callbackFunc);
  }

  unsubscribe = (event, callbackFunc) => {
    !this.subscribers[event] ? this.subscribers[event] = [] : this.subscribers[event];
    this.subscribers[event] = this.subscribers[event].filter(func => func != callbackFunc);
  }
  
  notify = (event, data) => {
    !this.subscribers[event] ? this.subscribers[event] = [] : this.subscribers[event];
    this.subscribers[event].forEach(func => func(data));
  }
}