import FieldSection from "../field/field.js";

export default (class PlayArea {
  constructor(settings) {
    this.fields = this.createPlayfield(settings);
  }

  updateFields(snake, egg) {
    const snakeBody = [
      snake.head.position,
      ...snake.segments.map(segment => segment.position)
    ];

    this.fields.map(field => {
      field.updateHasSnake(false).updateHasEgg(false);
    });
    snakeBody.map(position => {
      this.getField(position).updateHasSnake(true);
    });
    this.getField(egg.position).updateHasEgg(true);
  }

  createPlayfield(settings) {
    const fields = [];
    const body = document.querySelector("body");
    const wrapper = document.createElement("table");
    body.appendChild(wrapper);
    wrapper.classList.add("playArea");
    for (let i = 0; i < settings.fieldsY; i++) {
      const row = document.createElement("tr");
      wrapper.appendChild(row);
      for (let j = 0; j < settings.fieldsX; j++) {
        const field = new FieldSection(i, j);
        fields.push(field);
        row.appendChild(field.node);
      }
    }
    return fields;
  }

  getField(position) {
    return this.fields.filter(
      field => field.posX === position.posX && field.posY === position.posY
    )[0];
  }
});
