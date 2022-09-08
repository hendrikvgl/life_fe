import { Scene, Cameras } from "phaser";
import { Network } from "../../Network";
import Terrain from "../../classes/terrain/Terrain";
import { dirxml } from "console";
import { getSystemErrorMap } from "util";

const black = Phaser.Display.Color.ValueToColor("#0e120e");

export class WorldScene extends Scene {
  cameraX = 0;
  cameraY = 0;
  lifes = [];

  constructor() {
    super("world-scene");
  }

  preload(): void {
    this.load.image("tileset", "../../assets/TileMap.jpg");
    this.load.image("life", "../../assets/player.png");
  }

  create(): void {
    console.log("World scene was created");
    const onMessage = (m: string) => {
      const data = JSON.parse(m);
      console.log(data);

      if (data.e === 0) {
        const terrain = new Terrain(this, data);
      } else if (data.e === 1) {
        this.lifes = data.lifes;
      }
    };
    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
    // this.cameras.main.setZoom(2);
    const server = new Network({ onMessage });
  }

  update(time: number, delta: number): void {
    this.camera();
    this.drawLife();
  }

  drawLife() {
    let allSprites = this.children.list.filter(
      (x) => x instanceof Phaser.GameObjects.Sprite
    );
    allSprites.forEach((x) => x.destroy());

    this.lifes.forEach((life: any) => {
      const { x, y } = life;
      const lspr = this.add.sprite(x * 16 - 8, y * 16 - 8, "life");
    });
  }

  camera = () => {
    this.input.on(
      "wheel",
      (_pointer: any, _gameObjects: any, _deltaX: any, deltaY: any) => {
        if (deltaY > 0 && this.cameras.main.zoom > 0.3) {
          var newZoom = this.cameras.main.zoom - 0.0002;
          this.cameras.main.zoom = newZoom;
        }

        if (deltaY < 0 && this.cameras.main.zoom < 10) {
          var newZoom = this.cameras.main.zoom + 0.0002;
          this.cameras.main.zoom = newZoom;
        }
      }
    );

    if (this.game.input.mousePointer.leftButtonReleased()) {
      this.cameraX = this.cameras.main.scrollX;
      this.cameraY = this.cameras.main.scrollY;
    }

    if (this.game.input.mousePointer.isDown) {
      //  400 is the speed it will move towards the mouse
      const xDown = this.game.input.mousePointer.downX;
      const yDown = this.game.input.mousePointer.downY;

      const x = this.game.input.mousePointer.x;
      const y = this.game.input.mousePointer.y;
      const dX = xDown - x;
      const dY = yDown - y;

      this.cameras.main.scrollX = this.cameraX + dX;
      this.cameras.main.scrollY = this.cameraY + dY;
    }
  };
}
