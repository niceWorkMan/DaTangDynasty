import { _decorator, Component, Node } from "cc";
import { NodeSwitcher } from "../core/NodeSwitcher";
import { PopManager } from "../core/PopManager";
import { GameManager } from "../core/GameManager";
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
        //打开弹窗
        PopManager.Instance.OnOpenPopPannel("stone");
      });
    } else {
      console.warn("未找到 Button_Stone 节点");
    }

    const buttonDoor = this.node
      .getChildByName("TempleOut")
      .getChildByName("Button_Door");

    if (buttonStone) {
      buttonDoor.on(Node.EventType.TOUCH_START, (event) => {
        //event.target.active = false;
        //切换
        this.switchTo(1);
      });
    } else {
      console.warn("未找到 Button_Stone 节点");
    }

    //案牍阁返回室外
    const button_Back0 = this.node
      .getChildByName("TempleDoor")
      .getChildByName("Button_Back0");
    if (button_Back0) {
      button_Back0.on(Node.EventType.TOUCH_START, (event) => {
        //event.target.active = false;
        //切换
        this.switchTo(0);
      });
    } else {
      console.warn("未找到 Button_Back0 节点");
    }

    //案牍阁开锁
    const button_Lock = this.node
      .getChildByName("TempleDoor")
      .getChildByName("SpriteDoor")
      .getChildByName("Button_Lock");
    if (button_Lock) {
      button_Lock.on(Node.EventType.TOUCH_START, (event) => {
        console.log("点击:",GameManager.Instance.selectItemName);
        
        if (GameManager.Instance.selectItemName == "stone") {
          //开门
          this.node
            .getChildByName("TempleDoor")
            .getChildByName("SpriteDoor").active = false;
        }
      });
    } else {
      console.warn("未找到 Button_Back0 节点");
    }
  }

  update(deltaTime: number) {}
}
