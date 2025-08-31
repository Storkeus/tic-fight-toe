import type IUnitFactory from "../unitFactory/IUnitFactory";
import ArcherFactory from "../unitFactory/ArcherFactory";
import ASelectableUnit from "./ASelectableUnit";
import type ISelectableUnit from "./ISelectableUnit";
import { ARCHER_PLAYER_1, ARCHER_PLAYER_2 } from "../../helpers/Sprites";
import { Players } from "../../Players";

export default class ArcherSelectableUnit extends ASelectableUnit implements ISelectableUnit
{
    public get cost(){
        return 200;
    }
    
    getUnitFactory(): IUnitFactory {
        return new ArcherFactory(this.getPlayer(), this.getUnitCount());
    }

    getTextureName(): string {
        switch (this.getPlayer()) {
            case Players.Player_2:
                return ARCHER_PLAYER_2.textureName;
            case Players.Player_1:
            default:
                return ARCHER_PLAYER_1.textureName;
        }
    }
}