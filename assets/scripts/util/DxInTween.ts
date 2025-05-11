import { _decorator, Component, Node, tween, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("DxInTween")
export class DxInTween extends Component {
  start() {
    // 设置初始 scale 为 0（隐藏状态）
    this.node.getChildByName("SpriteBack").setScale(new Vec3(0, 0, 0));

    // 播放缩放动画到 1
    tween(this.node.getChildByName("SpriteBack"))
      .to(0.5, { scale: new Vec3(1, 1, 1) }, { easing: "backOut" }) // 'backOut' 给弹性效果
      .start();



    console.log("supper start");
    
  }

  dxOut() {
    tween(this.node.getChildByName("SpriteBack"))
      .to(0.5, { scale: new Vec3(0, 0, 0) }, { easing: "backOut" }).call(()=>{
        this.node.destroy()
      }) // 'backOut' 给弹性效果
      .start();
  }

  update(deltaTime: number) {}
}
