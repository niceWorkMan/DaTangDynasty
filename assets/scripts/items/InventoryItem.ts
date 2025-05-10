import { _decorator, Component, Node, Sprite, SpriteFrame } from "cc";
import { GameManager } from "../core/GameManager";
import { AtlasManager } from "../core/AtlasManager";
const { ccclass, property } = _decorator;

@ccclass("InventoryItem")
export class InventoryItem extends Component {
  private _selected = false;
  public itemName = "";

  onLoad() {}

  protected start(): void {
    const selectFrame = this.node.getChildByName("InventorySelcet");
    selectFrame.active = false;
    this.node.on(Node.EventType.TOUCH_START, this.onClick, this);
  }

  setIcon(name: string) {
    var invetoryData = GameManager.Instance.inventoryRefCof[name];
    var spriteCom = this.node
      .getChildByName("InventoryIcon")
      .getComponent(Sprite);
    AtlasManager.Instance.loadTexture(
      spriteCom,
      invetoryData.ListItem.plistPath,
      invetoryData.ListItem.spriteName
    );

    console.log("设置Item:", invetoryData);
    this.itemName = name;
  }

  onClick() {
    GameManager.Instance.selectItem(this, this.itemName);
  }

  setSelected(selected: boolean) {
    const selectFrame = this.node.getChildByName("InventorySelcet");
    this._selected = selected;
    if (selectFrame) {
      selectFrame.active = selected;
    }
  }

  getSelected(): boolean {
    return this._selected;
  }
}
