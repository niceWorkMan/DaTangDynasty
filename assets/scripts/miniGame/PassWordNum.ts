import {
  _decorator,
  Component,
  Game,
  Node,
  Sprite,
  tween,
  UIOpacity,
  Animation,
} from "cc";
import { AtlasManager } from "../core/AtlasManager";
import { PopManager } from "../core/PopManager";
const { ccclass, property } = _decorator;

@ccclass("PassWordNum")
export class PassWordNum extends Component {
  start() {



    this.node.on(Node.EventType.TOUCH_START, (event) => {
      //如果密码成功不再进点击事件
      if (this.isSuccess == true) {
        return;
      }

      this.changeNum();

      this.isSuccess = this.checkSuccess();
      if (this.isSuccess) {
        console.log("开锁成功");
        var anim = this.node.parent.getComponent(Animation);
        anim.once(Animation.EventType.FINISHED, () => {
          console.log("获得道具图纸");
          // 在这里写你的回调逻辑
          //打开弹窗
          this.node.parent.getChildByName("Button_TuZhi").active=true
        });
        anim.play();
        //其他几锁值状态更新
        for (var i = 0; i < 4; i++) {
          var getNum = (this.node.parent
            .getChildByName("PassWordNum_" + i)
            .getComponent(PassWordNum).isSuccess = true);
        }
      } else {
        var uiOpacity = this.node.parent
          .getChildByName("SpriteMistackAttention")
          .getComponent(UIOpacity);
        uiOpacity.opacity = 255;
        tween(uiOpacity)
          .to(1, { opacity: 0 }) // 变透明
          .start();
      }
    });

    this.setNum(this.num);
  }
  //默认设置配置数据
  @property
  num = 1;

  private isSuccess = false;

  update(deltaTime: number) {}

  /**
   * 点击自加
   */
  changeNum() {
    if (this.num < 9) {
      this.num++;
    } else {
      this.num = 1;
    }

    AtlasManager.Instance.loadTexture(
      this.node.getComponent(Sprite),
      "spriteRes/appears/appearsInTheTemple",
      "itc_itt_num_" + this.num
    );
  }
  /**
   * 直接设置
   * @param num 设置的值
   */
  setNum(num) {
    this.num = num;
    AtlasManager.Instance.loadTexture(
      this.node.getComponent(Sprite),
      "spriteRes/appears/appearsInTheTemple",
      "itc_itt_num_" + this.num
    );
  }

  getNum() {
    return this.num;
  }

  checkSuccess() {
    var passWord = [4, 3, 6, 5];
    for (var i = 0; i < 4; i++) {
      var getNum = this.node.parent
        .getChildByName("PassWordNum_" + i)
        .getComponent(PassWordNum)
        .getNum();
      if (getNum != passWord[i]) {
        return false;
      }
    }
    return true;
  }
}
