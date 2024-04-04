import Knight from "./Knight";
import BoardScene from "~/scenes/BoardScene";
import Player from "~/Player";
import IFighterFactory from "./IFighterFactory";

export default class KnightFactory implements IFighterFactory {

    player: Player;
    
    constructor(player: Player) {
        this.player = player;
    }

    createFighter(scene: BoardScene, x: number = -100, y: number = -100 ) {
        return new Knight(this.player.playerNumber, scene, x, y);
    }
}