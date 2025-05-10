import {
  _decorator,
  Component,
  instantiate,
  Label,
  LabelComponent,
  Node,
  tween,
  UIOpacity,
} from "cc";
import { GameManager } from "../core/GameManager";
import { AtlasManager } from "../core/AtlasManager";
import { UIManager } from "../core/UIManager";
import { appearTemple } from "../sceneLit/appearTemple";
const { ccclass, property } = _decorator;

@ccclass("dialogue")
export class dialogue extends Component {
  //限频点击
  private isFree = true;

  start() {
    console.log("start---");
    this.defaultFirst();

    this.node.getChildByName("Tips").on(Node.EventType.TOUCH_START, (event) => {
      if (this.isFree == true) {
        this.next();
        this.isFree = false;
      }
    });

    //shine
    var SpriteNext = this.node.getChildByName("SpriteNext");
    let opacity = SpriteNext.getComponent(UIOpacity);
    tween(opacity)
      .to(1, { opacity: 80 }) // 变透明
      .to(1, { opacity: 255 }) // 恢复不透明
      .union() // 合并成一个循环单元
      .repeatForever()
      .start();

    this.node.getChildByName("SpriteNext").active = false;
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
    this.showTextWithTween(itemInfo.text, () => {
      console.log("文字全部显示完毕");
      // 👉 在这里做后续操作，比如激活按钮、播放动画等
      this.isFree = true;
      //检查触发
      this.checkTrigger(itemInfo);
      //闪烁开始
      this.node.getChildByName("SpriteNext").active = true;
    });
    //闪烁关闭
    this.node.getChildByName("SpriteNext").active = false;
    //背景人物展示
    this.showNpc(itemInfo);
    //显示场景
    this.showScene(itemInfo);
  }

  private currentIndex = 0;
  showTextWithTween(content: string, onComplete?: () => void) {
    let interval = 0.001; // 每个字显示间隔时间（秒）

    // 使用递归 tween 来逐字显示
    const showNextChar = () => {
      if (this.currentIndex >= content.length) {
        if (onComplete) onComplete();
        return;
      }

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

      //是否需要隐藏对话框
      if (trigger.DialogHidden) {
        //隐藏对话框
        GameManager.Instance.node
          .getChildByName("DialogueLayer")
          .getChildByName("Dialogue").active = false;
        //清空Npc
        GameManager.Instance.node
          .getChildByName("NpcLayer")
          .removeAllChildren();
      }
    }
  }

  showScene(itemInfo) {
    var gameManager = GameManager.Instance;
    var sceneLayer = gameManager.node.getChildByName("SceneLayer");

    const sceneSwicherPrefab = itemInfo.sceneSwicherPrefab;
    if (!sceneSwicherPrefab) return;
    const prefabName = itemInfo.sceneSwicherPrefab.name;
    if (!prefabName) return;

    // 检查是否已经存在该 prefab 的实例
    const existing = sceneLayer.children.find(
      (child) => child.name === prefabName
    );

    if (existing) {
      // ✅ 已经存在该 prefab，复用它，调用状态切换
      const switcher = existing.getComponent(appearTemple);
      if (switcher && switcher.switchTo) {
        switcher.switchTo(sceneSwicherPrefab.switchIndex); //配置
      }
      return;
    }

    // 不存在，则清空并创建新场景
    sceneLayer.removeAllChildren();

    const obj = instantiate(gameManager.prefabMap[prefabName]);
    obj.name = prefabName; // 关键：设置名字，方便下次识别复用
    sceneLayer.addChild(obj);

    const switcher = obj.getComponent(appearTemple);
    if (switcher && switcher.switchTo) {
      switcher.switchTo(sceneSwicherPrefab.switchIndex);
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
