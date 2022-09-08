import { Scene } from "phaser";

const treeColor = Phaser.Display.Color.ValueToColor("#299434");

export class LoadingScene extends Scene {
  constructor() {
    super("loading-scene");
  }
  create(): void {
    console.log("Loading scene was created");
    this.scene.start("world-scene");
  }
}
