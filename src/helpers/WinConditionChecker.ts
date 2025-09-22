import type { Players } from "../Players";
import type Tile from "../Tile";
import { DIRECTIONS } from "./gridTraveling/Directions";
import type IDirection from "./gridTraveling/IDirection";

export default class WinConditionChecker
{
    readonly winingRowLength = 3;

    public checkWinConditionAfterTileChange(tiles: Array<Array<Tile>>, tile: Tile, player: Players) {
        const startPositionX: number = tile.positionXInGrid;
        const startPositionY: number = tile.positionYInGrid;

        const directions = DIRECTIONS

        for(const direction of directions) {
            let positionX = startPositionX;
            let positionY = startPositionY;

            for(let step: number = 0; step < this.winingRowLength - 1; step ++) {
                const {x, y}: {x: number, y: number} = direction.getCoordinatesForGoingOneStep(positionX, positionY);
                const stepTile = tiles[x] ? tiles[x][y] : undefined;
                
                if(stepTile && stepTile.belongsToPlayer(player)) {
                    positionX = x;
                    positionY = y;
                } else {
                    break;
                }
            }

            const oppositeDirection: IDirection = direction.oppositeDirection;
            let isWinInDirection = true;
            for(let step: number = 0; step < this.winingRowLength - 1; step ++) {
                const {x, y}: {x: number, y: number} = oppositeDirection.getCoordinatesForGoingOneStep(positionX, positionY);
                const stepTile = tiles[x] ? tiles[x][y] : undefined;
                
                if(stepTile && stepTile.belongsToPlayer(player)) {
                    positionX = x;
                    positionY = y; 
                } else {
                    isWinInDirection = false;
                    break;
                }
            }

            if(isWinInDirection) {
                return true;
            }

        }

        return false;
    }
    
}