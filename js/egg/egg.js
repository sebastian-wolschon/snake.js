export default (class Egg {
  constructor(snake, settings) {
    this.position = getPosition();

    function getPosition() {
      function generateCoord() {
        function getRandomInt(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min)) + min;
        }
        return {
          posX: getRandomInt(0, settings.fieldsX),
          posY: getRandomInt(0, settings.fieldsY)
        };
      }

      function hasConflict(coord) {
        return [
          snake.head.position,
          ...snake.segments.map(segment => segment.position)
        ].filter(segment => {
          segment.position === coord;
        }).length;
      }

      const coord = generateCoord();
      if (!hasConflict(coord)) {
        return coord;
      } else {
        getPosition();
      }
    }
  }
});
