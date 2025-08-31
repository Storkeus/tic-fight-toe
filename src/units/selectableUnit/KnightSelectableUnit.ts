import { KNIGHT_PLAYER_1, KNIGHT_PLAYER_2 } from "../../helpers/Sprites";
import { Players } from "../../Players";
import type IUnitFactory from "../unitFactory/IUnitFactory";
import KnightFactory from "../unitFactory/KnightFactory";
import ASelectableUnit from "./ASelectableUnit";
import ISelectableUnit from "./ISelectableUnit";

export default class KnightSelectableUnit extends ASelectableUnit implements ISelectableUnit
{
    public get cost(){
        return 100;
    }

    getUnitFactory(): IUnitFactory {
        return new KnightFactory(this.getPlayer(), this.getUnitCount());
    }

    getTextureName(): string {
        switch (this.getPlayer()) {
            case Players.Player_2:
                return KNIGHT_PLAYER_2.textureName;
            case Players.Player_1:
            default:
                return KNIGHT_PLAYER_1.textureName;
        }
    }
}