export default (class SnakeHead {
  constructor(position, direction) {
    this.position = position;
    this.direction = direction;
  }
  updateDirection(direction = this.direction) {
    this.direction = direction;
    console.log("moving ", this.direction);
  }
});
