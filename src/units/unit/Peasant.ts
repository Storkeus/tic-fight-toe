import { PEASANT_PLAYER_1, PEASANT_PLAYER_2 } from "../../helpers/Sprites";
import { Players } from "../../Players";
import type IBoardScene from "../../scenes/IBoardScene";
import type Tile from "../../Tile";
import AUnit from "./AUnit";
import type IUnit from "./IUnit";

export default class Peasant extends AUnit  implements IUnit {
    static readonly TEXTURE_NAME_PLAYER_1: string = 'peasant-player-1';
    static readonly TEXTURE_PATH_PLAYER_1: string = 'images/red/peasant/Combat Ready Idle.png';
    static readonly TEXTURE_NAME_PLAYER_2: string = 'peasant-player-2';
    static readonly TEXTURE_PATH_PLAYER_2: string = 'images/green/peasant/Combat Ready Idle.png';
    static readonly DESCRIPTION: string = `Defends his field even for a cost of life.\n\n"Someone stole my sweetroll"`;
    protected numberOfSpecialAbilityUses: number = 0;

    findTargets = (_grid: Array<Array<Tile>>, _startX: number, _startY: number): number => {
        return 0;
    }

    constructor(player: Players, scene: IBoardScene, x: number, y: number) {
        super(player, scene, x, y);
    }

    getTextureNameForPlayer(playerNumber: number): string {
        switch (playerNumber + 1) {
            case 2:
                return PEASANT_PLAYER_2.textureName;
            case 1:
            default:
                return PEASANT_PLAYER_1.textureName;
        }
    }

    getDescription(): string {
        return Peasant.DESCRIPTION;
    }

    protected getActiveTexture(): string {
        return this.player === Players.Player_1 ? PEASANT_PLAYER_1.textureName : PEASANT_PLAYER_2.textureName;
    }
}