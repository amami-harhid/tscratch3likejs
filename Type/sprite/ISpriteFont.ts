/**
 * Sprite Image(イメージ)
 */
export interface ISpriteFont {

    add(fontName: string) : Promise<void>;

    get names() : string [];
};