import { _decorator, Component, Node } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('interCractableObject')
export class interCractableObject extends Component {
    start() {

    }

    update(deltaTime: number) {
    }

    @property({ type: String })
    requiredItem: string = "";

    @property({ type: String })
    onSuccessEvent: string = ""; // 自定义事件名，比如打开门，启动对话

    onClick() {
        if (this.requiredItem === "" || GameManager.instance.hasItem(this.requiredItem)) {
            this.node.emit(this.onSuccessEvent);
        } else {
            console.log("需要道具：" + this.requiredItem);
        }
    }
}


