class EventBus {
  constructor() {
    this._eventMap = new Map();
  }

  /**
   *
   * @param {string} eventType
   * @param {Function} handle
   * @param {boolean} once
   */
  $on(eventType, handle, once = false) {
    let eventSet = this._eventMap.get(eventType);
    if (!eventSet) {
      eventSet = new Set();
      this._eventMap.set(eventType, eventSet);
    }
    if (once) {
      handle.__once = true;
    }
    eventSet.add(handle);
  }

  /**
   *
   * @param {string} eventType
   * @param {Function} handle
   */
  $once(eventType, handle) {
    this.$on(eventType, handle, true);
  }

  /**
   *
   * @param {string} eventType
   * @param {Function} handle
   * @returns
   */
  $off(eventType, handle) {
    let eventSet = this._eventMap.get(eventType);
    if (!eventSet) return;
    if (!handle) {
      eventSet.clear();
      return;
    }
    eventSet.delete(handle);
  }

  /**
   *
   * @param {string} eventType
   * @param  {...any} args
   * @returns
   */
  $emit(eventType, ...args) {
    let eventSet = this._eventMap.get(eventType);
    if (!eventSet) return;
    for (const handle of eventSet) {
      handle.call(undefined, ...args);
      if (handle.__once) {
        eventSet.delete(handle);
      }
    }
  }
}
