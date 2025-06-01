import { BubbleProperties } from '@Type/sprite/TBubble';

/** 吹き出し */
export interface ISpriteBubble {

    /**
     * 言う
     * 
     * @param text - テキスト
     * @param properties - プロパティ
     */
    say(text?: string, properties?: BubbleProperties) :void;
    /**
     * 指定した秒数分、言う。
     * @param text -テキスト
     * @param sec -秒数
     * @param properties -プロパティ
     */
    sayForSecs(text: string, sec:number, properties?: BubbleProperties): Promise<void>;
    /**
     * 考える
     * @param text {string} - テキスト 
     * @param properties {BubbleProperties}
     */
    think(text?: string, properties?: BubbleProperties) : void;
    /**
     * 指定した秒数分、考える。
     * @param text {string} - テキスト
     * @param sec {number} - 秒数
     * @param properties {BubbleProperties}
     */
    thinkForSecs(text: string, sec: number, properties?: BubbleProperties): Promise<void>;

}
