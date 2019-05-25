import SnakeHead from "./snakeHead.js";
import SnakeSegment from "./snakeSegment.js";

export default (class Snake {
  constructor() {
    this.position = { posX: 1, posY: 1 };
    this.head = {};
    this.segments = [];
  }
  spawn() {
    this.head = new SnakeHead(this.position, "right");
    for (let i = 0; i < 8; i++) {
      const test = { ...this.position };

      this._addSegment(test);
      this.move();
    }
    return this.position;
  }

  get lastSegment() {
    if (this.segments.length) {
      const lastSegmentIndex = this.segments.length - 1;
      return this.segments[lastSegmentIndex];
    }
  }

  setDirection(direction) {
    this.head.updateDirection(direction);
  }

  checkCollision(egg) {
    if (
      this.segments.filter(segment => {
        return (
          this.head.position.posX == segment.position.posX &&
          this.head.position.posY == segment.position.posY
        );
      }).length > 1
    ) {
      console.log("collision");
      return "collision";
    } else if (
      this.head.position.posX == egg.position.posX &&
      this.head.position.posY == egg.position.posY
    ) {
      console.log("egg");
      return "egg";
    } else return null;
  }

  _updatePositions(position) {
    this._addSegment({ ...position });
    this._removeSegment();
  }

  move(direction = this.head.direction) {
    this.head.direction = direction;

    switch (direction) {
      case "up":
        this.position.posX--;
        break;
      case "down":
        this.position.posX++;
        break;
      case "left":
        this.position.posY--;
        break;
      case "right":
        this.position.posY++;
        break;
    }
    const position = { ...this.position };
    this._updatePositions(position);
    return this.position;
  }

  _addSegment(position) {
    const segment = new SnakeSegment(position);
    this.segments.unshift(segment);
  }
  _removeSegment() {
    this.segments.pop();
  }
});
