import { Players } from "~/Players";
import BoardScene from "~/scenes/BoardScene";
import Tile from "~/Tile";
import AFighter from "./AFighter";
import IFighter from "./IFighter";

export default class Knight extends AFighter  implements IFighter {
    static readonly textureNamePlayer_1: string = 'knight-player-1';
    static readonly texturePathPlayer_1: string = 'images/red/knight/Combat Ready Idle.png';
    static readonly textureNamePlayer_2: string = 'knight-player-2';
    static readonly texturePathPlayer_2: string = 'images/green/knight/Combat Ready Idle.png';

    constructor(player: Players, scene: BoardScene, x: number, y: number) {
        super(player, scene, x, y);
    }

    protected getActiveTexture(): string {
        return this.player === Players.Player_1 ? Knight.textureNamePlayer_1 : Knight.textureNamePlayer_2;
    }
}