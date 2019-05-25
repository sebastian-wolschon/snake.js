import PlayArea from "./playArea/playArea.js";
import Snake from "./snake/snake.js";
import Egg from "./egg/egg.js";

class App {
  constructor() {
    this.settings = {
      turnsPerSecond: 1,
      fieldsX: 16,
      fieldsY: 16
    };
    this.PlayArea = new PlayArea(this.settings);
    this.snake = new Snake();
    this.egg = null;
    this.running = true;
    this.currentPosition = null;
  }

  addEventlisteners() {
    window.onkeydown = event => {
      switch (event.keyCode) {
        case 37:
          this.snake.setDirection("left");
          break;
        case 38:
          this.snake.setDirection("up");
          break;
        case 39:
          this.snake.setDirection("right");
          break;
        case 40:
          this.snake.setDirection("down");
          break;
      }
    };
  }

  init() {
    this.currentPosition = this.snake.spawn();
    this.egg = new Egg(this.snake, this.settings);
    this.PlayArea.updateFields(this.snake, this.egg);

    this.addEventlisteners();
    if (this.running) this.main();
  }

  main() {
    const start = () =>
      setInterval(() => {
        this.currentPosition = this.snake.move();
        const collisionStatus = this.snake.checkCollision(this.egg);
        if (collisionStatus === "collision") {
          console.log("you dun fucked up");
        } else if (collisionStatus === "egg") {
          console.log("found");
          this.snake._addSegment(this.position);
          this.egg = new Egg(this.snake, this.settings);
        }
        console.log(this.snake.segments.map(segment => segment.position));
        this.PlayArea.updateFields(this.snake, this.egg);
      }, 1000 / this.settings.turnsPerSecond);
    start();
  }
}

const MyApp = new App();
MyApp.init();
