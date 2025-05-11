import { _decorator, Component, Node, tween, Vec3 } from "cc";
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

    //点击佛珠
    const Button_fozhu = this.node
      .getChildByName("TempleIn")
      .getChildByName("Button_fozhu");
    if (Button_fozhu) {
      Button_fozhu.on(Node.EventType.TOUCH_START, (event) => {
        Button_fozhu.active = false;
        GameManager.Instance.collectItem("fozhu");
        PopManager.Instance.OnOpenPopPannel("fozhu");
      });
    } else {
      console.warn("未找到 Button_Back1 节点");
    }

    //点击佛像手
    const Button_Handle = this.node
      .getChildByName("TempleIn")
      .getChildByName("Sprite_FoXiang")
      .getChildByName("Button_Handle");

    const foxiang = this.node
      .getChildByName("TempleIn")
      .getChildByName("Sprite_FoXiang");
    if (Button_Handle) {
      Button_Handle.on(Node.EventType.TOUCH_START, (event) => {
        if (GameManager.Instance.selectItemName == "fozhu") {
          const targetPos = new Vec3(
            foxiang.position.x + 250,
            foxiang.position.y,
            foxiang.position.z
          );
          tween(foxiang)
            .to(0.5, { position: targetPos }, { easing: "quadOut" }) // 动画时长0.5秒
            .start();
        }
      });
    } else {
      console.warn("未找到 Button_Handle 节点");
    }

    //点击宝箱
    const Button_Box = this.node
      .getChildByName("TempleIn")
      .getChildByName("Button_Box");
    if (Button_Box) {
      Button_Box.on(Node.EventType.TOUCH_START, (event) => {
        //Button_Box.active = false;
        //打开宝箱游戏
        this.node.getChildByName("TempleIn").getChildByName("BoxGame").active =
          true;
      });
    } else {
      console.warn("未找到 Button_Back1 节点");
    }

    //关闭放大宝箱

    const BoxGame = this.node
      .getChildByName("TempleIn")
      .getChildByName("BoxGame");
    if (BoxGame) {
      BoxGame.on(Node.EventType.TOUCH_START, (event) => {
        //Button_Box.active = false;
        //打开宝箱游戏
        this.node.getChildByName("TempleIn").getChildByName("BoxGame").active =
          false;
      });
    } else {
      console.warn("未找到 BoxGame 节点");
    }

    //点击宝箱内图纸
    const Button_TuZhi = this.node
      .getChildByName("TempleIn")
      .getChildByName("BoxGame")
      .getChildByName("Sprite")
      .getChildByName("Button_TuZhi");
    Button_TuZhi.on(Node.EventType.TOUCH_START, (event) => {
      //打开图纸弹窗
      PopManager.Instance.OnOpenPopPannel("tuzhi");
      //更新到道具栏
      GameManager.Instance.collectItem("tuzhi");
    });
  }

  update(deltaTime: number) {}
}
