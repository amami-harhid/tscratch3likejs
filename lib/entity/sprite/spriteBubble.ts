import { Sprite } from '../sprite';
import { ISprite } from '@Type/sprite/ISprite';
import type { BubbleProperties } from '@Type/sprite/TBubble';
import type { ISpriteBubble } from '@Type/sprite/ISpriteBubble';
/** 吹き出し */
export class SpriteBubble implements ISpriteBubble{

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
     * @param text  - テキスト
     * @param properties - プロパティ 
     * @returns 
     * 
     * ```ts
     *  this.Looks.Bubble.say('こんにちは');
     * ```
     */
    say(text: string, properties?: BubbleProperties) :void {
        this.entity.$say(text, properties);
    }
    /**
     * 指定した秒数分、言う。
     * @param text - テキスト
     * @param sec - 秒数
     * @param properties - プロパティ
     * @returns 
     */
    async sayForSecs(text: string, sec:number, properties?: BubbleProperties): Promise<void>{
        await this.entity.$sayForSecs(text, sec, properties);
    }
    /**
     * 考える
     * @param text - テキスト 
     * @param properties - プロパティ
     * @returns
     */
    think(text: string, properties?: BubbleProperties) : void {
        this.entity.$think(text, properties);
    }
    /**
     * 指定した秒数分、考える。
     * @param text - テキスト 
     * @param sec - 秒数
     * @param properties - プロパティ
     * @returns
     */
    async thinkForSecs(text: string, sec: number, properties?: BubbleProperties): Promise<void>{
        await this.entity.$thinkForSecs(text, sec, properties);
    }

}
