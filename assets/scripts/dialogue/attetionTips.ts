import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('attetionTips')
export class attetionTips extends Component {
    start() {
        //自动销毁
       setTimeout(() => {
        this.node.destroy()
       }, 3000);
    }

    update(deltaTime: number) {
        
    }


    setLable(str){
       this.node.getChildByName("Label").getComponent(Label).string=str
    }

}


