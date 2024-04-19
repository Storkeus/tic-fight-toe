import Knight from "./Knight";
import BoardScene from "../scenes/BoardScene";
import Player from "../Player";
import IUnitFactory from "./IUnitFactory";

export default class KnightFactory implements IUnitFactory {

    player: Player;
    
    constructor(player: Player) {
        this.player = player;
    }

    createUnit(scene: BoardScene, x: number = -100, y: number = -100 ) {
        return new Knight(this.player.playerNumber, scene, x, y);
    }
}