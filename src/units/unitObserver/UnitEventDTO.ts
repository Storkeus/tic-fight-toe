export default class UnitEventDTO {
    public static readonly EVENT_NAME_UNIT_IS_PLACED_ON_BOARD = 'unit_is_placed_on_board';    
    eventName: string | undefined;

    constructor (eventName: string) {
        this.eventName = eventName
    }
}