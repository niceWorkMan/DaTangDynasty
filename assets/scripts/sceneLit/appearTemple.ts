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
        console.log("点击:", GameManager.Instance.selectItemName);

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

    //点击进入佛堂
    const Button_In = this.node
      .getChildByName("TempleDoor")
      .getChildByName("Button_In");
    if (Button_In) {
      Button_In.on(Node.EventType.TOUCH_START, (event) => {
        this.switchTo(2);
      });
    } else {
      console.warn("未找到 Button_In 节点");
    }

    //返回大门
    const Button_Back1 = this.node
      .getChildByName("TempleIn")
      .getChildByName("Button_Back1");
    if (Button_Back1) {
      Button_Back1.on(Node.EventType.TOUCH_START, (event) => {
        this.switchTo(1);
      });
    } else {
      console.warn("未找到 Button_Back1 节点");
    }

    //点击经书
    const Button_JingShuPop = this.node
      .getChildByName("TempleIn")
      .getChildByName("Button_JingShuPop");
    Button_JingShuPop.active = false;
    const Button_JingShu = this.node
      .getChildByName("TempleIn")
      .getChildByName("Button_JingShu");
    if (Button_JingShu) {
      Button_JingShu.on(Node.EventType.TOUCH_START, (event) => {
        //展示经书
        Button_JingShuPop.active = true;
      });
    } else {
      console.warn("未找到 Button_Back1 节点");
    }

    //经书关闭
    if (Button_JingShuPop) {
      Button_JingShuPop.on(Node.EventType.TOUCH_START, (event) => {
        Button_JingShuPop.active = false;
      });
    } else {
      console.warn("未找到 Button_Back1 节点");
    }
  }

  update(deltaTime: number) {}
}
