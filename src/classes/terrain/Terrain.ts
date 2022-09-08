import { Scene, Tilemaps } from "phaser";

interface MapData {
  MAP_TILES_X: Number;
  MAP_TILES_y: Number;
  tiles: number[][];
}

class Terrain {
  constructor(scene: Scene, data: MapData) {
    const map = scene.make.tilemap({
      data: data.tiles,
      tileWidth: 16,
      tileHeight: 16,
    });
    const tiles = map.addTilesetImage("tileset");
    map.createLayer(0, tiles, 0, 0);
  }
}

export default Terrain;
