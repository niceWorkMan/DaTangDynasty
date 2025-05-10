import {
  _decorator,
  Component,
  instantiate,
  Label,
  LabelComponent,
  Node,
  tween,
} from "cc";
import { GameManager } from "../core/GameManager";
import { AtlasManager } from "../core/AtlasManager";
import { UIManager } from "../core/UIManager";
const { ccclass, property } = _decorator;

@ccclass("dialogue")
export class dialogue extends Component {
  start() {
    console.log("start----------");
    this.defaultFirst();

    this.node.getChildByName("Tips").on(Node.EventType.TOUCH_START, (event) => {
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
    // this.node.getChildByName("LabelContent").getComponent(Label).string =
    //   this._currentData.dialogues[0].text;
    this.oneLine = this._currentData.dialogues[0];
    //默认显示第一条
    this.show(this._currentData.dialogues[0]);
  }

  private updateInfo(key) {
    var itemInfo = this.GetNextDataByKey(key);
    console.log("查询到的:", itemInfo);

    this.node.getChildByName("LabelTitle").getComponent(Label).string =
      itemInfo.speaker;
    // this.node.getChildByName("LabelContent").getComponent(Label).string =
    //   itemInfo.text;
    this.oneLine = itemInfo;

    //逐字显示
    this.show(itemInfo);
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

  //执行
  show(itemInfo) {
    this.currentIndex = 0;
    this.node.getChildByName("LabelContent").getComponent(Label).string = "";
    this.showTextWithTween(itemInfo.text);

    //检查触发
    this.checkTrigger(itemInfo);

    //背景人物展示
    this.showNpc(itemInfo);
  }

  private currentIndex = 0;
  showTextWithTween(content: string) {
    let interval = 0.1; // 每个字显示间隔时间（秒）

    // 使用递归 tween 来逐字显示
    const showNextChar = () => {
      if (this.currentIndex >= content.length) return;

      this.node.getChildByName("LabelContent").getComponent(Label).string +=
        content[this.currentIndex];
      this.currentIndex++;

      // 使用 tween 延时执行下一个字符显示
      tween(this.node).delay(interval).call(showNextChar).start();
    };

    showNextChar();
  }

  //执行触发
  checkTrigger(itemInfo) {
    console.log("检查了");

    //背景
    var background = itemInfo.background;
    if (background) {
      AtlasManager.Instance.loadBackGround(
        background.plistPath,
        background.spriteName
      );
    }

    var trigger = itemInfo.trigger;
    //触发事件
    if (trigger) {
      //触发类型是交互
      if (trigger.Interactive) {
        trigger.Interactive.forEach((element) => {
          var info = GameManager.Instance.interactiveInfo;
          var data = info[element];
          console.log("触发:", data);
        });
      }

      //触发方法
      if (trigger.callBackfuncs) {
        trigger.callBackfuncs.forEach((Data) => {
          GameManager.Instance.CallFunctionByName(Data.funcName, Data.param);
        });
      }
    }
  }

  //展示Npc信息
  showNpc(itemInfo) {
    var gameManager = GameManager.Instance;
    var npcLayer = gameManager.node.getChildByName("NpcLayer");
    if (itemInfo.speaker == "玩家") {
      //npcLayer.removeAllChildren();
    } else {
      var speaker = itemInfo.speaker;
      var prefabName = gameManager.npcCof[speaker].stylePrefab;
      var obj = instantiate(gameManager.prefabMap[prefabName]);
      npcLayer.removeAllChildren();
      npcLayer.addChild(obj);
    }
  }
}
