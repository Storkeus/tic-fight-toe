import { Players } from "./Players";
import IUnitFactory from "./units/unitFactory/IUnitFactory";


export default class Player
{
    playerNumber: Players;
    availableUnits: Array<IUnitFactory>;

    constructor (playerNumber: Players, availableUnits: Array<IUnitFactory>) {
        this.playerNumber = playerNumber;
        this.availableUnits =  availableUnits;
    }
}