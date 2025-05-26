import { Sprite } from './sprite';
import { BubbleProperties } from './bubble';
import { ImageEffective } from './entityConstant';
/**
 * Sprite Looks(見た目)
 */
export class SpriteLooks {
    private entity: Sprite;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        this.entity = entity;
    }
    /**
     * コスチューム番号、コスチューム名を取り出すためのオブジェクト
     */
    get Costume() {
        return this.entity.Costume;
    }
    /**
     * 背景番号、背景名を取り出すためのオブジェクト
     */
    get Backdrop(){
        return this.entity.Backdrop;
    }
    /**
     * 次のコスチュームにする
     */
    nextCostume() {
        this.entity.$nextCostume();
    }
    /**
     * コスチュームを切り替える
     * @param costume {number|string} - コスチューム
     */
    switchCostume(costume:number|string) :void {
        this.entity.$switchCostume(costume);
    }
    /**
     * 次の背景にする
     */
    nextBackdrop(): void {
        this.entity.$nextBackdrop();
    }
    switchBackdrop(backdrop: number|string ): void {
        this.entity.$switchBackdrop(backdrop);
    }
    /**
     * 言う
     * @param text {string} - テキスト
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
    /**
     * 縦横のサイズを変える
     * @param w {number} - 横変更サイズ(%)
     * @param h {number} - 縦変更サイズ(%)
     */
    changeSizeBy(w: number, h:number): void {
        this.entity.$changeSizeBy(w, h);
    }
    /**
     * サイズオブジェクト
     */
    get Size() :{w:number, h:number, scale:{w:number, h:number}} {
        return this.entity.Size;
    }
    /**
     * イメージ効果を指定量だけ変える。
     * @param effective {ImageEffective} - イメージ効果
     * @param value {number} - 変更量
     */
    changeEffectBy(effective:ImageEffective, value:number): void {
        this.entity.$changeEffectBy(effective, value);
    }
    /**
     * イメージ効果を指定量にする。
     * @param effective {ImageEffective} - イメージ効果
     * @param value {number} - 指定量
     */
    setEffect(effective:ImageEffective, value:number): void {
        this.entity.$setEffectTo(effective, value);
    }
    /**
     * イメージ効果をクリアする（初期値に戻す）
     */
    clearEffects() : void {
        this.entity.$clearEffect();
    }
    /**
     * 表示する
     */
    show() : void {
        this.entity.$show();
    }
    /**
     * 隠す
     */
    hide() : void {
        this.entity.$hide();
    }
    /**
     * 最前面にする
     */
    goToFront() : void {
        this.entity.$goToFront();
    }
    /**
     * 最背面にする
     */
    goToBack() : void {
        this.entity.$goToBack();
    }
    /**
     * 手前に出す
     * @param nLayer　{number} - 階層数 
     */
    goForwardLayers(nLayer: number) : void {
        this.entity.$goForwardLayers(nLayer);
    }
    /**
     * 奥に下げる
     * @param nLayer {number} - 階層数
     */
    goBackwardLayers(nLayer: number) : void {
        this.entity.$goBackwardLayers(nLayer);
    }
    /**
     * 自分自身の縦横表示サイズを得る
     * @returns dimensions {w: number, h: number}
     */
    drawingDimensions() : {w: number, h: number}{
        return this.entity.$drawingDimensions();
    }
};