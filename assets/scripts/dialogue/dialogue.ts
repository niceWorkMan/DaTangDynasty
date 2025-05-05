import { _decorator, Component, Label, LabelComponent, Node } from "cc";
import { GameManager } from "../core/GameManager";
const { ccclass, property } = _decorator;

@ccclass("dialogue")
export class dialogue extends Component {
  start() {
    console.log("start----------");
    this.defaultFirst();

    this.node.getChildByName("Tips").on(Node.EventType.MOUSE_DOWN, (event) => {
      this.next();
    });
  }

  next() {
    if (this.oneLine.next != null) {
      this.updateInfo(this.oneLine.next);
    } else {
      console.log("下面没有对话了,需要剧情出发或者已到最后一条");
    }
  }

  update(deltaTime: number) {}

  private _currentData;
  public set currentData(v) {
    this._currentData = v;
  }

  public get currentData() {
    return this._currentData;
  }

  private oneLine = null;
  /***
   * 默认显示第1条
   */
  public defaultFirst() {
    this.node.getChildByName("LabelTitle").getComponent(Label).string =
      this._currentData.dialogues[0].speaker;
    this.node.getChildByName("LabelContent").getComponent(Label).string =
      this._currentData.dialogues[0].text;
    this.oneLine = this._currentData.dialogues[0];
  }

  private updateInfo(key) {
    var itemInfo = this.GetNextDataByKey(key);
    console.log("查询到的:", itemInfo);

    this.node.getChildByName("LabelTitle").getComponent(Label).string =
      itemInfo.speaker;
    this.node.getChildByName("LabelContent").getComponent(Label).string =
      itemInfo.text;
    this.oneLine = itemInfo;
  }

  //查询获取一条
  private GetNextDataByKey(nextkey) {
    for (const element of this._currentData.dialogues) {
      if (element.id == nextkey) {
        return element;
      }
    }
    return null;
  }
}
