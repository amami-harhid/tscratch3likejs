import type {ISkin} from './ISkin';
export declare interface ISvgSkin extends ISkin {
    public _context: CanvasRenderingContext2D|null;
    public _svgImage: HTMLImageElement;
}