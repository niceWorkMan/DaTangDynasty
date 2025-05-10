import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NodeSwitcher')
export class NodeSwitcher extends Component {
    @property({ type: [Node] })
    public targets: Node[] = [];

    @property
    public defaultIndex: number = 0;

    private _currentIndex: number = -1;

    start() {
        this.switchTo(this.defaultIndex);
    }

    switchTo(index: number) {
        if (index < 0 || index >= this.targets.length) return;
        this._currentIndex = index;

        for (let i = 0; i < this.targets.length; i++) {
            this.targets[i].active = (i === index);
        }
    }

    next() {
        const nextIndex = (this._currentIndex + 1) % this.targets.length;
        this.switchTo(nextIndex);
    }

    previous() {
        const prevIndex = (this._currentIndex - 1 + this.targets.length) % this.targets.length;
        this.switchTo(prevIndex);
    }
}


