import { Players } from "./Players";
import IFighterFactory from "./fighters/IFighterFactory";


export default class Player
{
    playerNumber: Players;
    availableFighters: Array<IFighterFactory>;

    constructor (playerNumber: Players, availableFighters: Array<IFighterFactory>) {
        this.playerNumber = playerNumber;
        this.availableFighters =  availableFighters;
    }
}