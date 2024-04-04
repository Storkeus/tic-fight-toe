import Archer from "./Archer";
import BoardScene from "~/scenes/BoardScene";
import IFighterFactory from "./IFighterFactory";
import Player from "~/Player";

export default class ArcherFactory implements IFighterFactory {

    player: Player;
    
    constructor(player: Player) {
        this.player = player;
    }


    createFighter(scene: BoardScene, x: number = -100, y: number = -100 ) {
        return new Archer(this.player.playerNumber, scene, x, y);
    }
}