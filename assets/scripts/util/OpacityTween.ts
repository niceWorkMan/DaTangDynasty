import { _decorator, Component, Node, tween, UIOpacity } from "cc";
const { ccclass, property } = _decorator;

@ccclass("OpacityTween")
export class OpacityTween extends Component {
  start() {
    var opacity = this.node.getComponent(UIOpacity);
    tween(opacity)
      .to(1, { opacity: 80 }) // 变透明
      .to(1, { opacity: 255 }) // 恢复不透明
      .union() // 合并成一个循环单元
      .repeatForever()
      .start();
  }

  update(deltaTime: number) {}
}
