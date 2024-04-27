import { Players } from "../Players";
import BoardScene from "../scenes/BoardScene";
import Tile from "../Tile";
import AUnit from "./AUnit";
import IUnit from "./IUnit";

export default class Peasant extends AUnit  implements IUnit {
    static readonly TEXTURE_NAME_PLAYER_1: string = 'peasant-player-1';
    static readonly TEXTURE_PATH_PLAYER_1: string = 'images/red/peasant/Combat Ready Idle.png';
    static readonly TEXTURE_NAME_PLAYER_2: string = 'peasant-player-2';
    static readonly TEXTURE_PATH_PLAYER_2: string = 'images/green/peasant/Combat Ready Idle.png';
    static readonly DESCRIPTION: string = `Defends his field even for a cost of life.\n\n"Someone stole my sweetroll"`;


    findTargets = (_grid: Array<Array<Tile>>, _startX: number, _startY: number): number => {
        return 0;
    }

    constructor(player: Players, scene: BoardScene, x: number, y: number) {
        super(player, scene, x, y);
    }

    getTextureNameForPlayer(playerNumber: number): string {
        switch (playerNumber + 1) {
            case 2:
                return Peasant.TEXTURE_NAME_PLAYER_2;
            case 1:
            default:
                return Peasant.TEXTURE_NAME_PLAYER_1;
        }
    }

    getDescription(): string {
        return Peasant.DESCRIPTION;
    }

    protected getActiveTexture(): string {
        return this.player === Players.Player_1 ? Peasant.TEXTURE_NAME_PLAYER_1 : Peasant.TEXTURE_NAME_PLAYER_2;
    }
}