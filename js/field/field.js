export default (class FieldSection {
  constructor(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.hasSnake = false;
    this.element = this._createField();
  }

  get node() {
    return this.element;
  }

  _setAttributes(element, attributes) {
    attributes.map(attribute => {
      const key = Object.keys(attribute);
      const value = Object.values(attribute);
      element.setAttribute(key, value);
    });
    return element;
  }

  _createField() {
    const td = document.createElement("td");
    td.classList.add("field");
    const field = this._setAttributes(td, [
      { posX: this.posX },
      { posY: this.posY },
      { hasSnake: this.hasSnake }
    ]);
    return field;
  }

  updateHasSnake(hasSnake) {
    this._setAttributes(this.element, [{ hasSnake: hasSnake }]);
    return this;
  }
  updateHasEgg(hasEgg) {
    this._setAttributes(this.element, [{ hasEgg: hasEgg }]);
    return this;
  }
});
