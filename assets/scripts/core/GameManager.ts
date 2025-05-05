import {
  _decorator,
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
    resources.load("config/step", JsonAsset, (err, jsonAsset) => {
      if (err) {
        console.error("加载 JSON 文件失败:", err);
        return;
      }

      //加载bundle
      assetManager.loadBundle("netRes", (err, bundle) => {
        if (err) {
          console.error("加载 Bundle 失败:", err);
          return;
        }

        console.log("Bundle 加载成功:", bundle);
        AtlasManager.Instance.netResBundle = bundle;

        // 访问 JSON 数据
        const data = jsonAsset.json;
        console.log("加载成功的 JSON 数据:", data);
        this._gameData = data;
        this.GameStart();
      });
    });
  }

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

  //添加BuildUI
  @property(Prefab) dialog: Prefab;

  private GameStart() {
    // var arr = this.gameData["level_01"];
    // arr.forEach((element) => {

    // });
    var dialogkey = "config/dialog_" + this.gameData["level_01"][0].key;

    console.log("dialogkey:",dialogkey)
    resources.load(dialogkey, JsonAsset, (err, jsonAsset) => {
      if (err) {
        console.error("加载 JSON dialog 文件失败:", err);
        return;
      }

      this._dialogContent = jsonAsset.json;
      console.log("加载 JSON dialog 文件成功:", this._dialogContent);

      var dialogueLayer = this.node.getChildByName("DialogueLayer");
      var d = instantiate(this.dialog);
      dialogueLayer.addChild(d);
      d.position = new Vec3(0, -470, 0);
      //设置所用对话  todo  当前设置的第一条
      d.getComponent(dialogue).currentData=this._dialogContent[0]
    });
  }
}
