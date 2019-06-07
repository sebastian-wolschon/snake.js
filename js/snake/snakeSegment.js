export default (class SnakeSegment {
  constructor(position) {
    this.position = { ...position };
  }

  setPosition(position) {
    const oldPosition = this.position;
    this.position = position;
    return oldPosition;
  }
});
