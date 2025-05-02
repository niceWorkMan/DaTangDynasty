// Scripts/Managers/UIManager.ts
export class UIManager {
    static instance: UIManager;
    private inventoryUI: Node;

    constructor() {
        UIManager.instance = this;
    }

    public setInventoryUI(node: Node) {
        this.inventoryUI = node;
    }

    public updateInventory() {
        // 重新渲染道具栏
    }
}