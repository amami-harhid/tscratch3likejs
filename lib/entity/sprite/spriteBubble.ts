import { Sprite } from '../sprite';
import { BubbleProperties } from '../bubble';

/** 吹き出し */
export class SpriteBubble {

    private entity: Sprite;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        this.entity = entity;
    }
    /**
     * 言う
     * @param text {string} - テキスト
     * ```ts
     *  this.Looks.Bubble.say('こんにちは');
     * ```
     */
    say(text: string) :void {
        this.entity.$say(text);
    }
    /**
     * 指定した秒数分、言う。
     * @param text {string} - テキスト
     * @param sec {number} - 秒数
     * @param properties {BubbleProperties}
     */
    async sayForSecs(text: string, sec:number, properties: BubbleProperties={}): Promise<void>{
        await this.entity.$sayForSecs(text, sec, properties);
    }
    /**
     * 考える
     * @param text {string} - テキスト 
     */
    think(text: string, properties: BubbleProperties={}) : void {
        this.entity.$think(text, properties);
    }
    /**
     * 指定した秒数分、考える。
     * @param text {string} - テキスト
     * @param sec {number} - 秒数
     * @param properties {BubbleProperties}
     */
    async thinkForSecs(text: string, sec: number, properties: BubbleProperties={}): Promise<void>{
        await this.entity.$thinkForSecs(text, sec, properties);
    }

}
