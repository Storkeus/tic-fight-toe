import type { Players } from "../../Players";
import ArcherSelectableUnit from "./ArcherSelectableUnit";
import KnightSelectableUnit from "./KnightSelectableUnit";

export default function getSelectableUnits(player: Players) {
    return [
        new KnightSelectableUnit(player),
        new ArcherSelectableUnit(player)
    ];
}