import Top from "./Top";
import Bottom from "./Bottom";
import Left from "./Left";
import Right from "./Right";
import TopLeft from "./TopLeft";
import TopRight from "./TopRight";
import BottomLeft from "./BottomLeft";
import BottomRight from "./BottomRight";
import type IDirection from "./IDirection";

const TOP = new Top();
const TOP_LEFT = new TopLeft();
const TOP_RIGHT = new TopRight();
const BOTTOM = new Bottom();
const BOTTOM_LEFT = new BottomLeft();
const BOTTOM_RIGHT = new BottomRight();
const LEFT = new Left();
const RIGHT = new Right();

TOP.oppositeDirection = BOTTOM;
TOP_LEFT.oppositeDirection = BOTTOM_RIGHT;
TOP_RIGHT.oppositeDirection = BOTTOM_LEFT;
BOTTOM.oppositeDirection = TOP;
BOTTOM_LEFT.oppositeDirection = TOP_RIGHT;
BOTTOM_RIGHT.oppositeDirection = TOP_LEFT;
LEFT.oppositeDirection = RIGHT;
RIGHT.oppositeDirection = LEFT;

export const DIRECTIONS: Array<IDirection> = [
    TOP,
    TOP_RIGHT,
    RIGHT,
    BOTTOM_RIGHT,
    BOTTOM,
    BOTTOM_LEFT,
    LEFT,
    TOP_LEFT
];