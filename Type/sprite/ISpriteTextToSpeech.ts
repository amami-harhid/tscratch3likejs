import { TSoundPlayerOption } from '../sound/IAudioEngine';

/** サイズ */
export interface ISpriteTextToSpeech {

    /**
     * スピーチする
     * @param words {string} - テキスト
     * @param propertyType {string} - スピーチプロパティのタイプ
     */
    speech(words: string, propertyType: string ): void;
    /**
     * スピーチして終わるまで待つ
     * @param words words {string} - テキスト
     * @param propertyType {string} - スピーチプロパティのタイプ
     */
    speechAndWait(words: string, propertyType: string ): Promise<void>;
    /**
     * 識別タイプをつけてプロパティを設定する
     * @param type {string} - プロパティ識別タイプ
     * @param properties {TSoundPlayerOption} - プロパティ
     * @param gender {string} - 性別 ( male/female )
     * @param locale {string} - ロケール ( ja-JP )
     */
    setSpeechProperties(type:string, properties?: TSoundPlayerOption, gender?:string, locale?:string): void;
}
