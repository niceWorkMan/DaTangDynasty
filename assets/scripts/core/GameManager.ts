import {
  _decorator,
  AssetManager,
  assetManager,
  Button,
  Component,
  director,
  instantiate,
  JsonAsset,
  Node,
  Prefab,
  resources,
  Size,
  size,
  Sprite,
  SpriteAtlas,
  SpriteFrame,
  UITransform,
  Vec2,
  Vec3,
} from "cc";
import { UIManager } from "./UIManager";
import { AtlasManager } from "./AtlasManager";
import { dialogue } from "../dialogue/dialogue";

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

  private _prefabMap = {};
  private set prefabMap(v) {
    this._prefabMap = v;
  }
  public get prefabMap() {
    return this._prefabMap;
  }

  start() {
    this.addListener();
    this.init();
  }

  async init() {
    await this.initGameConf(); // 等待资源加载完成
  }

  update(deltaTime: number) {}

  addListener() {
    this.node
      .getChildByName("TestLayer")
      .getChildByName("Button_Test")
      .on(Node.EventType.TOUCH_START, (event) => {
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

  private _gameData = {};
  public set gameData(v) {
    this._gameData = v;
  }

  public get gameData() {
    return this._gameData;
  }

  private _dialogContent;

  public set dialogContent(v) {
    this._dialogContent = v;
  }
  public get dialogContent() {
    return this._dialogContent;
  }

  private prifabPaths;

  private async initGameConf() {
    try {
      // 加载配置 JSON
      const jsonAsset = await this.loadJson("config/step");
      this._gameData = jsonAsset.json;

      // 加载对话 JSON
      const dialogKey = "config/dialog_" + this._gameData["level_01"][0].key;
      const dialogAsset = await this.loadJson(dialogKey);
      //加载Prefab JSON
      const prifabPathAsset = await this.loadJson("config/prefabsList");
      this.prifabPaths = prifabPathAsset.json;
      console.log("prifabKeys:", this.prifabPaths);

      // 加载资源 Bundle
      //const bundleUrl="http://127.0.0.1:80/netRes"
      const bundleUrl="netRes"
      const bundle = await this.loadBundle(bundleUrl);
      AtlasManager.Instance.netResBundle = bundle;

      this._dialogContent = dialogAsset.json;
      // 所有资源加载完成后，开始游戏
      this.GameStart();
    } catch (err) {
      console.error("初始化游戏配置失败:", err);
    }
  }

  private loadJson(path: string): Promise<JsonAsset> {
    return new Promise((resolve, reject) => {
      resources.load(path, JsonAsset, (err, jsonAsset) => {
        if (err || !jsonAsset) {
          reject(err);
        } else {
          resolve(jsonAsset);
        }
      });
    });
  }

  private async loadBundle(name: string): Promise<AssetManager.Bundle> {
    try {
      const bundle = await this.loadBundleAsync(name);  // 首先加载 bundle
      const loadPromises = this.prifabPaths.map((path) => this.loadPrefabAsync(bundle, path));  // 为每个 prefab 路径生成加载的 Promise
      await Promise.all(loadPromises);  // 等待所有的加载操作完成
      console.log("All prefabs loaded successfully");
      return bundle;
    } catch (err) {
      console.error("Error loading bundle:", err);
      throw err;  // 抛出错误，外部调用者可以捕获
    }
  }
  
  // 异步加载 bundle
  private loadBundleAsync(name: string): Promise<AssetManager.Bundle> {
    return new Promise((resolve, reject) => {
      assetManager.loadBundle(name, (err, bundle) => {
        if (err || !bundle) {
          reject(err);
        } else {
          resolve(bundle);
        }
      });
    });
  }
  
  // 异步加载单个 prefab
  private loadPrefabAsync(bundle: AssetManager.Bundle, path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      bundle.load(path, Prefab, (err, prefab) => {
        if (err) {
          reject(err);
        } else {
          const dicName = path.indexOf("/") === -1 ? path : path.split('/').pop() || "";
          this.prefabMap[dicName] = prefab;
          resolve();  // 加载成功
        }
      });
    });
  }

  private GameStart() {
    console.log("所有资源加载完毕，游戏开始");

    const dialogueLayer = this.node.getChildByName("DialogueLayer");
    const d = instantiate(this.prefabMap["Dialogue"]);
    dialogueLayer.addChild(d);
    d.position = new Vec3(0, -470, 0);
    d.getComponent(dialogue).currentData = this._dialogContent[0];
  }
}
