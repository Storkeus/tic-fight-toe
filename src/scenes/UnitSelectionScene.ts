import { BOARD_SCENE_KEY, UNIT_SELECTION_SCENE_KEY } from '../helpers/SceneKeys';
import SpriteLoader from '../helpers/SpriteLoader';
import { MINUS_BUTTON, PLUS_BUTTON } from '../helpers/Sprites';
import Player from '../Player';
import { Players } from '../Players';
import ISelectableUnit from '../units/selectableUnit/ISelectableUnit';
import getSelectableUnits from '../units/selectableUnit/SelectableUnits';
import IUnitFactory from '../units/unitFactory/IUnitFactory';
import PeasantFactory from '../units/unitFactory/PeasantFactory';
import BoardScene from './BoardScene';

export default class UnitSelectionScene extends Phaser.Scene {

    private spriteLoader: SpriteLoader;
    private playerMoney = 1000;
    private playerMoneyText: Phaser.GameObjects.Text | undefined;
    private units: Phaser.GameObjects.Container[] = [];
    private selectableUnits: ISelectableUnit[] = [];
    private configuredPlayers: Player[] = [];
    private continueButton: Phaser.GameObjects.Text | undefined;

    constructor() {
        super(UNIT_SELECTION_SCENE_KEY);
        this.spriteLoader = new SpriteLoader();
    }

    preload() {
        this.load.image('background-menu', 'images/background-menu.png');

        this.spriteLoader.loadAllUnitSpritesheets(this, false);
        this.spriteLoader.loadPlusButton(this);
        this.spriteLoader.loadMinusButton(this);
    }

    create() {
        this.add.image(400, 300, 'background-menu');

        this.spriteLoader.loadAllUnitAnimations(this, false);

        this.loadSelectionMenuForPlayer(Players.Player_1);

        const welcomeText = this.add.text(400, 50, `This brave men will fight for you (if you pay them enough).`, {fontSize: '20px'});
        welcomeText.setX(welcomeText.x - (welcomeText.displayWidth / 2));
        welcomeText.setY(welcomeText.y - welcomeText.displayHeight);


    }

    private addUnit(unit: ISelectableUnit) {
        const textureName = unit.getTextureName();
        const container = this.add.container(200 + this.units.length * 150, 200);
        const gameObject = this.add.sprite(0, 0, textureName);
        gameObject.anims.play(`${textureName}-idle`);
        container.add(gameObject);

        const costText = this.add.text(0, -75, `$${unit.cost}`, {fontSize: '20px'});
        container.add(costText);

        const countText = this.add.text(0, 75, `${unit.getUnitCount()}`, {fontSize: '20px'});
        container.add(countText);

        const plus = this.add.sprite(25, 115, PLUS_BUTTON.textureName);
        plus.setScale(2);
        container.add(plus);

        plus.setInteractive();
        plus.on('pointerdown', () => {
            this.buyUnit(unit, countText);
        });

        const minus = this.add.sprite(-25, 115, MINUS_BUTTON.textureName);
        minus.setScale(2);
        container.add(minus);

        minus.setInteractive();
        minus.on('pointerdown', () => {
            this.sellUnit(unit, countText);
        });

        this.units.push(container);
    }

    private refreshPlayerMoneyText() {

        if (!this.playerMoneyText) {
            this.playerMoneyText = this.add.text(50, 600, ``, {fontSize: '30px'});
            this.playerMoneyText.setX(this.playerMoneyText.x - this.playerMoneyText.displayWidth - 20);
            this.playerMoneyText.setY(this.playerMoneyText.y - this.playerMoneyText.displayHeight - 20);
        }

        this.playerMoneyText.setText(`$${this.playerMoney}`);
    }

    private buyUnit(unit: ISelectableUnit, countText: Phaser.GameObjects.Text)
    {
        if (this.playerMoney < unit.cost) {
            return;
        }

        unit.incrementUnitCount();
        countText.setText(`${unit.getUnitCount()}`);
        this.playerMoney -= unit.cost;
        this.refreshPlayerMoneyText();
    }

    private sellUnit(unit: ISelectableUnit, countText: Phaser.GameObjects.Text)
    {
        if (unit.getUnitCount() === 0) {
            return;
        }

        unit.decrementUnitCount();
        countText.setText(`${unit.getUnitCount()}`);
        this.playerMoney += unit.cost;
        this.refreshPlayerMoneyText();
    }

    private loadSelectionMenuForPlayer(player: Players) {

        for (const unit of this.units) {
            unit.destroy();
        }

        this.continueButton?.destroy();

        this.units = [];

        this.selectableUnits = getSelectableUnits(player);

        for (const selectableUnit of this.selectableUnits){
            this.addUnit(selectableUnit);
        }

        this.playerMoney = 1000;

        this.refreshPlayerMoneyText();

        this.continueButton = this.add.text(800, 600, 'Continue', {fontSize: '30px'});
        this.continueButton.setX(this.continueButton.x - this.continueButton.displayWidth - 20);
        this.continueButton.setY(this.continueButton.y - this.continueButton.displayHeight - 20);

        this.continueButton.setInteractive();

        this.continueButton.on('pointerdown', () => {
            const availableUnits: IUnitFactory[] = [new PeasantFactory(player)];

            for (const selectableUnit of this.selectableUnits) {
                if (selectableUnit.getUnitCount() > 0) {
                    availableUnits.push(selectableUnit.getUnitFactory());
                }
            }

            this.configuredPlayers.push(new Player(player, availableUnits));

            if (player === Players.Player_1) {
                this.loadSelectionMenuForPlayer(Players.Player_2);
            } else {
                this.scene.add(BOARD_SCENE_KEY, BoardScene, true, {players: this.configuredPlayers});
            }
        });
    }
}
