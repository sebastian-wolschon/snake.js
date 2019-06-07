import PlayArea from "./playArea/playArea.js";
import Snake from "./snake/snake.js";
import Egg from "./egg/egg.js";

class App {
  constructor() {
    this.settings = {
      turnsPerSecond: 4,
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
      if (this.running) {
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
      } else {
        console.log("start");
        this.running = true;
        console.log(this.running);
      }
    };
  }

  init() {
    this.currentPosition = this.snake.spawn();
    this.egg = new Egg(this.snake, this.settings);
    this.PlayArea.updateFields(this.snake, this.egg);

    this.addEventlisteners();
    this.main();
  }

  main() {
    setInterval(() => {
      this.currentPosition = this.snake.move();
      const collisionStatus = this.snake.checkCollision(this.egg);
      if (collisionStatus === "collision") {
        console.log("you dun fucked up");
      } else if (collisionStatus === "egg") {
        console.log("found");
        this.snake._addSegment(this.currentPosition);
        this.egg = new Egg(this.snake, this.settings);
      }
      this.PlayArea.updateFields(this.snake, this.egg);
    }, 1000 / this.settings.turnsPerSecond);
  }
}

const MyApp = new App();
MyApp.init();
