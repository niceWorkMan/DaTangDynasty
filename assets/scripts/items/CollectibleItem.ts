import { _decorator, Component, error, Node, SpriteFrame } from "cc";
import { GameManager } from "../core/GameManager";
const { ccclass, property } = _decorator;

@ccclass("CollectibleItem")
export class CollectibleItem extends Component {
  @property
  inventoryName = "";

  onLoad() {
    this.node.on(Node.EventType.TOUCH_START, this.onClick, this);
  }

  onClick() {
    if (this.inventoryName.trim().length > 0) {
      GameManager.Instance.collectItem(this.inventoryName);
     // this.node.active = false; // 或 this.node.destroy();
    } else {
      console.log("没有设置 CollectibleItem 预制的item类型 不操作");
    }
  }
}
