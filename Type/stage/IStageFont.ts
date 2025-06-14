/**
 * Stage Image(イメージ)
 */
export interface IStageFont {

    add(fontName: string) : Promise<void>;

    get names() : string [];
};