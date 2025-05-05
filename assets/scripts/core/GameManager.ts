import {
  _decorator,
  assetManager,
  Button,
  Component,
  director,
  JsonAsset,
  Node,
  resources,
  Size,
  size,
  Sprite,
  SpriteAtlas,
  SpriteFrame,
  UITransform,
} from "cc";
import { UIManager } from "./UIManager";
import { AtlasManager } from "./AtlasManager";

const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
  constructor() {
    super();
    GameManager._instance = this;
  }
  private static _instance: GameManager = null;
  // 只能通过自身进行初始化
  public static get Instance() {
    if (this._instance == null) {
      //获取单例失败
      console.log("获取GameManager单例失败");
    }
    return this._instance;
  }

  start() {
    this.addListener();
    this.initGameConf();
  }

  update(deltaTime: number) {}

  addListener() {
    this.node
      .getChildByName("TestLayer")
      .getChildByName("Button_Test")
      .on(Node.EventType.MOUSE_DOWN, (event) => {
        this.click();
      });
  }

  click() {
    AtlasManager.Instance.loadBackGround("appears", "AnDuGeOutSide");
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

  public changeBg(imageName: string) {}

  /**
   * 初始化游戏配置
   */
  private initGameConf() {
    //图集通过配置文件加载
    resources.load("config/altlasCof", JsonAsset, (err, jsonAsset) => {
      if (err) {
        console.error("加载 JSON 文件失败:", err);
        return;
      }

      // 访问 JSON 数据
      const data = jsonAsset.json;
      console.log("加载成功的 JSON 数据:", data);
    });

    assetManager.loadBundle("netRes", (err, bundle) => {
      if (err) {
        console.error("加载 Bundle 失败:", err);
        return;
      }

      console.log("Bundle 加载成功:", bundle);
      AtlasManager.Instance.netResBundle = bundle;
    });
  }
}
