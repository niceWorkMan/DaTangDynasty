import { _decorator, Component, Label, Node } from "cc";
import { OpacityTween } from "../util/OpacityTween";
const { ccclass, property } = _decorator;

@ccclass("GuildClick")
export class GuildClick extends OpacityTween {
  start() {
    //调用父类start
    super.start();

    this.node.getChildByName("Label").getComponent(Label).string =
      this.defualtText;
  }

  @property
  public defualtText: string = "";

  update(deltaTime: number) {}
}
