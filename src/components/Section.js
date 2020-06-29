export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  addItem(element, initialCards) {
    if(initialCards) {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }

  }

  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item));
  }
}
