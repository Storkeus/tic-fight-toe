import Archer from "./Archer";
import BoardScene from "../scenes/BoardScene";
import IUnitFactory from "./IUnitFactory";
import Player from "../Player";

export default class ArcherFactory implements IUnitFactory {

    player: Player;
    
    constructor(player: Player) {
        this.player = player;
    }


    createUnit(scene: BoardScene, x: number = -100, y: number = -100 ) {
        return new Archer(this.player.playerNumber, scene, x, y);
    }
}