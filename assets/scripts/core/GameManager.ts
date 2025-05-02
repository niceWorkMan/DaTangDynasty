import { _decorator, Component, director, Node } from "cc";
import { UIManager } from "./UIManager";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager {
  start() {}

  update(deltaTime: number) {}

  private static _instance: GameManager;
  public static get instance() {
    if (!this._instance) this._instance = new GameManager();
    return this._instance;
  }

  public currentLevel: number = 0;
  public inventory: Set<string> = new Set();

  public loadLevel(level: number) {
    this.currentLevel = level;
    director.loadScene(`Level${level}`);
  }

  public addItem(itemId: string) {
    this.inventory.add(itemId);
    UIManager.instance.updateInventory();
  }

  public hasItem(itemId: string): boolean {
    return this.inventory.has(itemId);
  }
}
