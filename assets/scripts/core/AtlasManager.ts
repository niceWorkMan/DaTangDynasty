import {
  _decorator,
  Component,
  Node,
  Size,
  Sprite,
  SpriteAtlas,
  UITransform,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("AtlasManager")
export class AtlasManager extends Component {
  constructor() {
    super();
    AtlasManager._instance = this;
  }
  private static _instance: AtlasManager = null;
  // 只能通过自身进行初始化
  public static get Instance() {
    if (this._instance == null) {
      //获取单例失败
      console.log("获取AtlasManagerr单例失败");
    }
    return this._instance;
  }

  start() {}

  update(deltaTime: number) {}

  private _netResBundle = null;

  public set netResBundle(v) {
    this._netResBundle = v;
  }
  public get netResBundle() {
    return this._netResBundle;
  }

  public loadBackGround(plistPath, spriteName) {
    this._netResBundle.load(plistPath, SpriteAtlas, (err, atlas) => {
      if (err) {
        console.error("图集加载失败:", err);
        return;
      }
      console.log("图集加载成功:", atlas);

      // 获取图集中的所有 SpriteFrame
      const spriteFrames = atlas.getSpriteFrames();
      // 遍历并打印所有 SpriteFrame 名称
      spriteFrames.forEach((spriteFrame) => {
        console.log("SpriteFrame 名称:", spriteFrame.name);
      });

      // 获取图集中的一帧（确保子图名字写对）
      const frame = atlas.getSpriteFrame(spriteName); // 子图名，无需扩展名
      if (frame) {
        // 设置到节点上的 Sprite 组件
        const node = this.node
          .getChildByName("BackGround")
          .getChildByName("SpriteImage");
        node.getComponent(UITransform).contentSize = new Size(750, 1334); //设置大图
        const sprite = node?.getComponent(Sprite);

        if (sprite) {
          sprite.spriteFrame = frame;
          console.log("SpriteFrame 设置成功");
        } else {
          console.warn("未找到 Sprite 组件");
        }
      } else {
        console.warn("图集中未找到指定的 SpriteFrame");
      }
    });
  }
}
