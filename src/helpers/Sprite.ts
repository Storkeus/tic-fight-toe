export default class Sprite {
    public textureName: string;
    public texturePath: string;
    public frameWidth: number;
    public frameHeight: number;
    public numberOfFrames: number;
    public frameRate: number;
    public repeat: number;
    public startFrame: number;
    public endFrame: number;

    constructor(
        textureName: string,
        texturePath: string,
        frameWidth: number,
        frameHeight: number,
        numberOfFrames: number,
        frameRate: number,
        repeat: number,
        startFrame: number,
        endFrame: number
    ) {
        this.textureName = textureName;
        this.texturePath = texturePath;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.numberOfFrames = numberOfFrames;
        this.frameRate = frameRate;
        this.repeat = repeat;
        this.startFrame = startFrame;
        this.endFrame = endFrame;
    }
}