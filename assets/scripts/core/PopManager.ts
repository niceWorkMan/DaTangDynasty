import { _decorator, Component, instantiate, Node, Prefab, Sprite } from "cc";
import { GameManager } from "./GameManager";
import { AtlasManager } from "./AtlasManager";
import { PopItem } from "../ui/PopItem";
const { ccclass, property } = _decorator;

@ccclass("PopManager")
export class PopManager extends Component {
  constructor() {
    super();
    PopManager._instance = this;
  }
  private static _instance: PopManager = null;
  // 只能通过自身进行初始化
  public static get Instance() {
    if (this._instance == null) {
      //获取单例失败
      console.log("获取PopManager单例失败");
    }
    return this._instance;
  }

  start() {}

  update(deltaTime: number) {}

  public OnOpenPopPannel(name:string){
    const d = instantiate(GameManager.Instance.prefabMap[GameManager.Instance.inventoryRefCof.popPrefab]);
    this.node.addChild(d)
    d.getComponent(PopItem).initPopInfo(name)

    //todo  记录获取道具
  }
}
