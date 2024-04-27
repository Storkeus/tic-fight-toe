import BoardScene from "../scenes/BoardScene";
import Player from "../Player";
import IUnitFactory from "./IUnitFactory";
import Peasant from "./Peasant";

export default class PeasantFactory implements IUnitFactory {

    player: Player;
    
    constructor(player: Player) {
        this.player = player;
    }

    createUnit(scene: BoardScene, x: number = -100, y: number = -100 ) {
        return new Peasant(this.player.playerNumber, scene, x, y);
    }
}