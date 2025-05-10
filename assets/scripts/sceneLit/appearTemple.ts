import { _decorator, Component, Node } from "cc";
import { NodeSwitcher } from "../core/NodeSwitcher";
const { ccclass, property } = _decorator;

@ccclass("appearTemple")
export class appearTemple extends NodeSwitcher {
  start() {
    // 石头按钮点击后隐藏
    const buttonStone = this.node
      .getChildByName("TempleOut")
      .getChildByName("Button_Stone");

    if (buttonStone) {
      buttonStone.on(Node.EventType.TOUCH_START, (event) => {
        event.target.active = false;
      });
    } else {
      console.warn("未找到 Button_Stone 节点");
    }
  }

  update(deltaTime: number) {}
}
