import { _decorator, Component, Node, Sprite } from "cc";
import { DxInTween } from "../util/DxInTween";
import { GameManager } from "../core/GameManager";
import { AtlasManager } from "../core/AtlasManager";
const { ccclass, property } = _decorator;

@ccclass("PopItem")
export class PopItem extends DxInTween {
  start() {
    super.start();

    this.node.getChildByName("SpriteBack").getChildByName("Button_Back").on(Node.EventType.TOUCH_START, this.onClose, this);
  }

  onClose(){
    super.dxOut()
  }

  initPopInfo(name: string) {
    var invetoryData = GameManager.Instance.inventoryRefCof[name];
    var spriteCom = this.node.getChildByName("SpriteBack").getComponent(Sprite);
    AtlasManager.Instance.loadTexture(
      spriteCom,
      invetoryData.PopBack.plistPath,
      invetoryData.PopBack.spriteName
    );
  }

  update(deltaTime: number) {}
}
