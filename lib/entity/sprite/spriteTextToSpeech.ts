import { Sprite } from '../sprite';
import { TSoundPlayerOption } from '@Type/sound/IAudioEngine';
import type { ISpriteTextToSpeech } from '@Type/sprite/ISpriteTextToSpeech';
/** サイズ */
export class SpriteTextToSpeech implements ISpriteTextToSpeech {

    private entity: Sprite;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        this.entity = entity;
    }
    /**
     * スピーチする
     * @param words {string} - テキスト
     * @param propertyType {string} - スピーチプロパティのタイプ
     */
    speech(words: string, propertyType: string ): void {
        this.entity.$speech(words, propertyType);
    }
    /**
     * スピーチして終わるまで待つ
     * @param words words {string} - テキスト
     * @param propertyType {string} - スピーチプロパティのタイプ
     */
    async speechAndWait(words: string, propertyType: string ): Promise<void> {
        await this.entity.$speechAndWait(words, propertyType);
    }
    /**
     * 識別タイプをつけてプロパティを設定する
     * @param type {string} - プロパティ識別タイプ
     * @param properties {TSoundPlayerOption} - プロパティ
     * @param gender {string} - 性別 ( male/female )
     * @param locale {string} - ロケール ( ja-JP )
     */
    setSpeechProperties(type:string, properties: TSoundPlayerOption, gender:string='male', locale:string='ja-JP'): void {
        this.entity.$setSpeechProperties(type,properties,gender,locale);
    }
}
