export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderer = renderer;
    this._items = items;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this.addItems(this._renderer(item));
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
