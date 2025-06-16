import { Sprite } from '../sprite';
import type { ISpriteFont } from '@Type/sprite/ISpriteFont';
export class SpriteFont implements ISpriteFont {
    private entity: Sprite;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        this.entity = entity;
    }

    add(fontName: string) : void{
        this.entity.$addFont(fontName);
    }

    get names() : string[] {
        return this.entity.$getImageNames();
    }
};