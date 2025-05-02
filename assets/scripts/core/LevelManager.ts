import { director } from 'cc';
import { GameManager } from './GameManager';

export class LevelManager {
    public currentSceneIndex: number = 0;

    public goToNextScene() {
        this.currentSceneIndex += 1;
        director.loadScene(`Level${GameManager.instance.currentLevel}_Scene${this.currentSceneIndex}`);
    }
}
